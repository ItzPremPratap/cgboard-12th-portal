/**
 * Main Application Logic for CGBSE Class 12 Biology Portal
 */

document.addEventListener("DOMContentLoaded", () => {
    const app = new BiologyExamApp();
    app.init();
});

class BiologyExamApp {
    constructor() {
        this.examData = PREDICTED_PAPER_2027;
        this.pastAnalysis = PAST_3_YEARS_ANALYSIS;
        this.predictions = PREDICTIONS_2027;
        this.evaluator = new ExamEvaluator(this.examData);

        // State
        this.activeTab = "exam";
        this.responses = {};
        this.flagged = new Set();
        this.timerSeconds = 180 * 60; // 3 Hours
        this.timerInterval = null;
        this.isTimerPaused = false;
        this.timeSpentSeconds = 0;
        this.currentEvaluation = null;
        this.saveTimeout = null;
    }

    init() {
        this.loadInitialState();
        this.setupNavigation();
        this.renderPaper();
        this.renderPalette();
        this.render3YearAnalysis();
        this.renderPredictions();
        this.renderHistory();
        this.startTimer();
        this.bindGlobalEvents();
    }

    loadInitialState() {
        const savedDraft = ExamStorage.loadDraft();
        if (savedDraft) {
            this.responses = savedDraft;
        } else {
            // Initialize default responses for choice questions
            this.examData.sections.forEach(sec => {
                sec.questions.forEach(q => {
                    if (q.hasChoice) {
                        this.responses[q.id] = { choice: "A", text: "" };
                    } else {
                        this.responses[q.id] = "";
                    }
                });
            });
        }

        const savedTimer = ExamStorage.loadDraftTimer(180 * 60);
        this.timerSeconds = savedTimer;
        this.timeSpentSeconds = (180 * 60) - this.timerSeconds;
    }

    setupNavigation() {
        const navBtns = document.querySelectorAll(".nav-btn");
        navBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetTab = btn.getAttribute("data-tab");
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabId) {
        this.activeTab = tabId;

        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
        });

        document.querySelectorAll(".tab-pane").forEach(pane => {
            pane.classList.toggle("active", pane.id === `tab-${tabId}`);
        });

        if (tabId === "history") {
            this.renderHistory();
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // --- Timer Management ---
    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            if (!this.isTimerPaused && this.timerSeconds > 0) {
                this.timerSeconds--;
                this.timeSpentSeconds++;
                this.updateTimerDisplay();

                // Auto save draft state every 10 seconds
                if (this.timerSeconds % 10 === 0) {
                    ExamStorage.saveDraft(this.responses, this.timerSeconds);
                }

                if (this.timerSeconds === 0) {
                    clearInterval(this.timerInterval);
                    alert("Time is up! Submitting your examination paper now...");
                    this.submitExam(true);
                }
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const timerElem = document.getElementById("timerDisplay");
        if (!timerElem) return;

        const hours = Math.floor(this.timerSeconds / 3600);
        const mins = Math.floor((this.timerSeconds % 3600) / 60);
        const secs = this.timerSeconds % 60;

        const formatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        timerElem.textContent = formatted;

        if (this.timerSeconds <= 900) { // 15 mins left
            timerElem.classList.add("warning");
        } else {
            timerElem.classList.remove("warning");
        }
    }

    // --- Render Predicted Paper ---
    renderPaper() {
        const container = document.getElementById("paperSectionsContainer");
        if (!container) return;

        let html = "";

        this.examData.sections.forEach(section => {
            html += `
            <div class="section-wrapper" id="${section.id}">
                <div class="section-header-banner">
                    <h3 class="section-title">${section.title}</h3>
                    <p class="section-desc">${section.description}</p>
                </div>
            `;

            section.questions.forEach(q => {
                html += this.renderQuestionCard(q);
            });

            html += `</div>`;
        });

        container.innerHTML = html;
        this.bindQuestionInputs();
    }

    renderQuestionCard(q) {
        const isFlagged = this.flagged.has(q.id);
        const resp = this.responses[q.id];

        let bodyHtml = "";

        // 1. MCQ
        if (q.type === "mcq") {
            const currentSelected = typeof resp === "string" ? resp : "";
            bodyHtml = `
                <div class="mcq-options-grid">
                    ${q.options.map(opt => `
                        <label class="mcq-option-label ${currentSelected === opt.key ? 'selected' : ''}" data-qid="${q.id}" data-key="${opt.key}">
                            <input type="radio" name="resp_${q.id}" value="${opt.key}" ${currentSelected === opt.key ? 'checked' : ''}>
                            <span class="opt-key">[${opt.key}]</span>
                            <span class="opt-text">${opt.text}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        } 
        // 2. VSA (1 Mark)
        else if (q.type === "vsa") {
            const val = typeof resp === "string" ? resp : "";
            bodyHtml = `
                <div class="answer-box-wrapper">
                    <div class="answer-label">
                        <span>Write One-Word or One-Sentence Answer:</span>
                        <span class="word-counter" id="wc_${q.id}">${this.getWordCount(val)} words</span>
                    </div>
                    <input type="text" class="vsa-input" id="input_${q.id}" data-qid="${q.id}" 
                           placeholder="Type your answer here..." value="${this.escapeHtml(val)}">
                </div>
            `;
        }
        // 3. Section E with Internal Choice ("OR")
        else if (q.hasChoice) {
            const choiceObj = (resp && typeof resp === "object") ? resp : { choice: "A", text: "" };
            const activeChoice = choiceObj.choice || "A";
            const textVal = choiceObj.text || "";
            const wordCount = this.getWordCount(textVal);

            bodyHtml = `
                <div class="choice-selector-box">
                    <div class="answer-label">
                        <span>Select which internal choice you are attempting:</span>
                    </div>
                    <div class="choice-tabs">
                        <button type="button" class="choice-tab-btn ${activeChoice === 'A' ? 'active' : ''}" 
                                data-qid="${q.id}" data-choice="A">
                            Attempt ${q.optionA.label}
                        </button>
                        <button type="button" class="choice-tab-btn ${activeChoice === 'B' ? 'active' : ''}" 
                                data-qid="${q.id}" data-choice="B">
                            Attempt ${q.optionB.label}
                        </button>
                    </div>
                </div>

                <div class="q-choice-content" id="choiceContent_${q.id}">
                    <div class="q-body" style="font-weight: 600; color: #1e3a8a;">
                        ${activeChoice === 'A' ? this.formatPrompt(q.optionA.question) : this.formatPrompt(q.optionB.question)}
                    </div>
                </div>

                <div class="answer-box-wrapper">
                    <div class="answer-label">
                        <span>Your Answer (Ruled Sheet - Approx. 100 to 150 words):</span>
                        <span class="word-counter" id="wc_${q.id}">${wordCount} words (Target: 100-150)</span>
                    </div>
                    <textarea class="subjective-textarea large" id="input_${q.id}" data-qid="${q.id}" 
                              placeholder="Write your detailed explanation with headings, points, or diagram descriptions...">${this.escapeHtml(textVal)}</textarea>
                </div>
            `;
        }
        // 4. Subjective (SA-I 2M, SA-II 3M, LA-I 4M)
        else {
            const val = typeof resp === "string" ? resp : "";
            const targetWords = q.marks === 2 ? "approx. 30 words" : (q.marks === 3 ? "approx. 50 words" : "approx. 75-100 words");
            const wordCount = this.getWordCount(val);

            bodyHtml = `
                <div class="answer-box-wrapper">
                    <div class="answer-label">
                        <span>Your Answer (Ruled Sheet - ${targetWords}):</span>
                        <span class="word-counter" id="wc_${q.id}">${wordCount} words</span>
                    </div>
                    <textarea class="subjective-textarea ${q.marks >= 4 ? 'large' : ''}" id="input_${q.id}" data-qid="${q.id}" 
                              placeholder="Write your answer here in neat points...">${this.escapeHtml(val)}</textarea>
                </div>
            `;
        }

        return `
            <div class="question-card ${isFlagged ? 'flagged' : ''}" id="card_${q.id}">
                <div class="q-meta-row">
                    <div class="q-badge-group">
                        <span class="q-number-tag">${q.qNum}</span>
                        <span class="q-marks-pill">[${q.marks} ${q.marks === 1 ? 'Mark' : 'Marks'}]</span>
                        <span class="q-unit-tag">• ${q.unit}</span>
                    </div>
                    <div class="q-tools">
                        <button type="button" class="btn-icon-tool ${isFlagged ? 'active-flag' : ''}" 
                                onclick="window.appInstance.toggleFlag('${q.id}')" title="Flag for review">
                            ${isFlagged ? '★ Flagged' : '☆ Flag'}
                        </button>
                        <button type="button" class="btn-icon-tool" 
                                onclick="window.appInstance.clearQuestionAnswer('${q.id}')" title="Clear response">
                            Clear
                        </button>
                    </div>
                </div>
                ${!q.hasChoice ? `<div class="q-body">${this.formatPrompt(q.question)}</div>` : ''}
                ${bodyHtml}
            </div>
        `;
    }

    formatPrompt(text) {
        if (!text) return "";
        return text.replace(/\n/g, "<br>");
    }

    escapeHtml(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    getWordCount(text) {
        if (!text) return 0;
        return text.trim().split(/\s+/).filter(w => w.length > 0).length;
    }

    // --- Input Binding & Real-time Auto Save ---
    bindQuestionInputs() {
        // 1. Radio Options for MCQs
        document.querySelectorAll(".mcq-options-grid input[type='radio']").forEach(radio => {
            radio.addEventListener("change", (e) => {
                const qid = e.target.name.replace("resp_", "");
                const val = e.target.value;
                this.responses[qid] = val;

                // Update visual styles
                document.querySelectorAll(`.mcq-option-label[data-qid="${qid}"]`).forEach(lbl => {
                    lbl.classList.toggle("selected", lbl.getAttribute("data-key") === val);
                });

                this.onResponseUpdated(qid);
            });
        });

        // 2. VSA text inputs
        document.querySelectorAll(".vsa-input").forEach(input => {
            input.addEventListener("input", (e) => {
                const qid = e.target.getAttribute("data-qid");
                const val = e.target.value;
                this.responses[qid] = val;

                const wcElem = document.getElementById(`wc_${qid}`);
                if (wcElem) wcElem.textContent = `${this.getWordCount(val)} words`;

                this.onResponseUpdated(qid);
            });
        });

        // 3. Subjective Textareas
        document.querySelectorAll(".subjective-textarea").forEach(textarea => {
            textarea.addEventListener("input", (e) => {
                const qid = e.target.getAttribute("data-qid");
                const val = e.target.value;

                if (this.responses[qid] && typeof this.responses[qid] === "object") {
                    this.responses[qid].text = val;
                } else {
                    this.responses[qid] = val;
                }

                const wcElem = document.getElementById(`wc_${qid}`);
                if (wcElem) {
                    const q = this.findQuestion(qid);
                    const target = q && q.hasChoice ? "Target: 100-150 words" : "";
                    wcElem.textContent = `${this.getWordCount(val)} words ${target ? '(' + target + ')' : ''}`;
                }

                this.onResponseUpdated(qid);
            });
        });

        // 4. Choice Tab Buttons
        document.querySelectorAll(".choice-tab-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const qid = btn.getAttribute("data-qid");
                const choice = btn.getAttribute("data-choice");
                const q = this.findQuestion(qid);

                if (!this.responses[qid] || typeof this.responses[qid] !== "object") {
                    this.responses[qid] = { choice: choice, text: "" };
                } else {
                    this.responses[qid].choice = choice;
                }

                // Update tab styles
                document.querySelectorAll(`.choice-tab-btn[data-qid="${qid}"]`).forEach(b => {
                    b.classList.toggle("active", b.getAttribute("data-choice") === choice);
                });

                // Update displayed question body
                const contentElem = document.getElementById(`choiceContent_${qid}`);
                if (contentElem && q) {
                    const optData = choice === "A" ? q.optionA : q.optionB;
                    contentElem.innerHTML = `
                        <div class="q-body" style="font-weight: 600; color: #1e3a8a;">
                            ${this.formatPrompt(optData.question)}
                        </div>
                    `;
                }

                this.onResponseUpdated(qid);
            });
        });
    }

    onResponseUpdated(qid) {
        this.updatePaletteButton(qid);

        // Debounce auto-save to storage
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            ExamStorage.saveDraft(this.responses, this.timerSeconds);
        }, 500);
    }

    findQuestion(qid) {
        for (let sec of this.examData.sections) {
            for (let q of sec.questions) {
                if (q.id === qid) return q;
            }
        }
        return null;
    }

    toggleFlag(qid) {
        if (this.flagged.has(qid)) {
            this.flagged.delete(qid);
        } else {
            this.flagged.add(qid);
        }

        const card = document.getElementById(`card_${qid}`);
        if (card) card.classList.toggle("flagged", this.flagged.has(qid));

        const flagBtn = card ? card.querySelector(".btn-icon-tool") : null;
        if (flagBtn) {
            flagBtn.classList.toggle("active-flag", this.flagged.has(qid));
            flagBtn.innerHTML = this.flagged.has(qid) ? "★ Flagged" : "☆ Flag";
        }

        this.updatePaletteButton(qid);
    }

    clearQuestionAnswer(qid) {
        const q = this.findQuestion(qid);
        if (!q) return;

        if (q.type === "mcq") {
            this.responses[qid] = "";
            document.querySelectorAll(`input[name="resp_${qid}"]`).forEach(r => r.checked = false);
            document.querySelectorAll(`.mcq-option-label[data-qid="${qid}"]`).forEach(l => l.classList.remove("selected"));
        } else if (q.hasChoice) {
            this.responses[qid].text = "";
            const ta = document.getElementById(`input_${qid}`);
            if (ta) ta.value = "";
        } else {
            this.responses[qid] = "";
            const input = document.getElementById(`input_${qid}`);
            if (input) input.value = "";
        }

        const wc = document.getElementById(`wc_${qid}`);
        if (wc) wc.textContent = "0 words";

        this.onResponseUpdated(qid);
    }

    // --- Question Palette (Sidebar) ---
    renderPalette() {
        const container = document.getElementById("paletteButtonsGrid");
        if (!container) return;

        let html = "";
        this.examData.sections.forEach(sec => {
            sec.questions.forEach(q => {
                const isAnswered = this.isQuestionAnswered(q.id);
                const isFlagged = this.flagged.has(q.id);
                const cleanLabel = q.qNum.replace("Q.", "").replace(/\s+/g, "");

                html += `
                    <button type="button" class="palette-btn ${isAnswered ? 'answered' : ''} ${isFlagged ? 'flagged' : ''}" 
                            id="pal_${q.id}" onclick="window.appInstance.scrollToQuestion('${q.id}')" title="${q.qNum} (${q.marks}M)">
                        ${cleanLabel}
                    </button>
                `;
            });
        });

        container.innerHTML = html;
        this.updatePaletteCounters();
    }

    updatePaletteButton(qid) {
        const btn = document.getElementById(`pal_${qid}`);
        if (!btn) return;

        const isAnswered = this.isQuestionAnswered(qid);
        const isFlagged = this.flagged.has(qid);

        btn.classList.toggle("answered", isAnswered);
        btn.classList.toggle("flagged", isFlagged);

        this.updatePaletteCounters();
    }

    updatePaletteCounters() {
        let total = 0;
        let answered = 0;

        this.examData.sections.forEach(sec => {
            sec.questions.forEach(q => {
                total++;
                if (this.isQuestionAnswered(q.id)) answered++;
            });
        });

        const answeredCountElem = document.getElementById("answeredCount");
        if (answeredCountElem) answeredCountElem.textContent = `${answered} / ${total} Answered`;
    }

    isQuestionAnswered(qid) {
        const resp = this.responses[qid];
        if (!resp) return false;
        if (typeof resp === "string") return resp.trim().length > 0;
        if (typeof resp === "object") return resp.text && resp.text.trim().length > 0;
        return false;
    }

    scrollToQuestion(qid) {
        const card = document.getElementById(`card_${qid}`);
        if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.style.transition = "box-shadow 0.3s ease";
            card.style.boxShadow = "0 0 0 3px #1e3a8a";
            setTimeout(() => {
                card.style.boxShadow = "";
            }, 1200);
        }
    }

    // --- Submit Exam & Score Evaluation ---
    confirmSubmit() {
        let unansweredCount = 0;
        this.examData.sections.forEach(sec => {
            sec.questions.forEach(q => {
                if (!this.isQuestionAnswered(q.id)) unansweredCount++;
            });
        });

        const modal = document.getElementById("submitConfirmModal");
        const msg = document.getElementById("submitConfirmMsg");
        if (msg) {
            if (unansweredCount > 0) {
                msg.innerHTML = `You have <strong style="color: #dc2626;">${unansweredCount} unanswered questions</strong> remaining out of 26 questions.<br><br>Are you sure you want to finalize and evaluate your paper?`;
            } else {
                msg.innerHTML = `Awesome! You have attempted all questions.<br><br>Ready to evaluate your answers and generate your official CGBSE scorecard?`;
            }
        }
        if (modal) modal.classList.add("active");
    }

    closeSubmitModal() {
        const modal = document.getElementById("submitConfirmModal");
        if (modal) modal.classList.remove("active");
    }

    submitExam(force = false) {
        this.closeSubmitModal();

        // Stop timer
        if (this.timerInterval) clearInterval(this.timerInterval);

        // Run evaluation
        const evaluation = this.evaluator.evaluatePaper(this.responses);
        this.currentEvaluation = evaluation;

        // Save to Persistent History
        ExamStorage.saveAttempt(evaluation, this.timeSpentSeconds);

        // Clear active draft
        ExamStorage.clearDraft();

        // Render result scorecard and switch tab
        this.renderScorecard(evaluation);
        this.switchTab("result");
    }

    // --- Render Result Scorecard ---
    renderScorecard(evalResult) {
        const container = document.getElementById("scorecardContainer");
        if (!container) return;

        const passBadgeClass = evalResult.isPassed ? "badge-green" : "badge-red";
        const passText = evalResult.isPassed ? "PASSED (उत्तीर्ण)" : "COMPARTMENT / FAILED";

        let html = `
            <div class="score-summary-banner">
                <div class="score-circle-box">
                    <div class="score-big">${evalResult.totalMarksAwarded}</div>
                    <div class="score-max">out of ${evalResult.maxMarks}</div>
                    <div class="percentage-badge">${evalResult.percentage}% Marks</div>
                </div>
                <div class="score-meta-details">
                    <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                        <span class="badge ${passBadgeClass}" style="font-size: 0.9rem; padding: 0.4rem 0.8rem;">${passText}</span>
                        <span class="badge badge-blue">Time Spent: ${ExamStorage.formatDuration(this.timeSpentSeconds)}</span>
                    </div>
                    <h2>Class 12 Higher Secondary Biology Result</h2>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Subject Code: 203 • Chhattisgarh Board of Secondary Education Raipur</p>
                    
                    <div class="grade-box grade-${evalResult.grade}">
                        <span>Grade Awarded: ${evalResult.grade}</span>
                        <span style="font-weight: 500; font-size: 0.85rem;">(${evalResult.gradeDescription})</span>
                    </div>

                    <div class="section-score-bars">
                        ${Object.keys(evalResult.sectionScores).map(secId => {
                            const sec = evalResult.sectionScores[secId];
                            return `
                                <div class="sec-bar-card">
                                    <div class="sec-bar-title">
                                        <span>${sec.title.split('-')[0]}</span>
                                        <strong>${sec.marksAwarded} / ${sec.maxMarks}</strong>
                                    </div>
                                    <div class="sec-bar-progress">
                                        <div class="sec-bar-fill" style="width: ${sec.percentage}%"></div>
                                    </div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted); text-align: right;">${sec.percentage}%</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h3 style="font-size: 1.2rem; font-weight: 700;">Question-by-Question Evaluation & Model Marking Scheme</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Compare your answers with official CGBSE model answer keys and adjust scores if needed.</p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button type="button" class="btn btn-outline btn-sm" onclick="window.print()">🖨️ Print Scorecard</button>
                    <button type="button" class="btn btn-primary btn-sm" onclick="window.appInstance.retakeExam()">🔄 Retake Test</button>
                </div>
            </div>

            <div class="reviews-list">
                ${evalResult.questionResults.map(qRes => this.renderReviewCard(qRes)).join('')}
            </div>
        `;

        container.innerHTML = html;
    }

    renderReviewCard(qRes) {
        const q = this.findQuestion(qRes.id);
        const userAns = qRes.userResponse || "<em>[No answer written]</em>";
        const modelAns = qRes.modelAnswer || "";
        
        let diagramHtml = "";
        if (q && q.diagramSvg) {
            diagramHtml = `<div style="margin-top: 0.75rem;"><strong>Scientific Diagram Reference:</strong><br>${q.diagramSvg}</div>`;
        } else if (q && q.hasChoice) {
            const opt = qRes.chosenOption === "B" ? q.optionB : q.optionA;
            if (opt && opt.diagramSvg) {
                diagramHtml = `<div style="margin-top: 0.75rem;"><strong>Scientific Diagram Reference:</strong><br>${opt.diagramSvg}</div>`;
            }
        }

        return `
            <div class="review-card ${qRes.status}" id="rev_${qRes.id}">
                <div class="review-header">
                    <div>
                        <strong style="color: var(--primary-color); font-size: 1rem;">${qRes.qNum}</strong>
                        <span style="font-size: 0.82rem; color: var(--text-muted); margin-left: 0.5rem;">[Max: ${qRes.maxMarks} Marks]</span>
                        ${qRes.chosenOption ? `<span class="badge badge-gold" style="margin-left: 0.5rem;">Attempted Option ${qRes.chosenOption}</span>` : ''}
                    </div>
                    <div class="review-marks">
                        <span>Marks Awarded:</span>
                        <div class="score-adjustment-controls">
                            <button type="button" class="btn-adj" onclick="window.appInstance.adjustQuestionScore('${qRes.id}', -0.5)" title="Decrease 0.5 mark">-</button>
                            <span id="scoreVal_${qRes.id}" style="min-width: 38px; text-align: center; color: var(--primary-color);">${qRes.marksAwarded}</span>
                            <button type="button" class="btn-adj" onclick="window.appInstance.adjustQuestionScore('${qRes.id}', 0.5)" title="Increase 0.5 mark">+</button>
                        </div>
                        <span>/ ${qRes.maxMarks}</span>
                    </div>
                </div>

                <div style="font-size: 0.92rem; font-weight: 600; margin-bottom: 0.75rem;">
                    ${q && !q.hasChoice ? q.question : (qRes.chosenOption === 'B' ? q.optionB.question : (q ? q.optionA.question : ''))}
                </div>

                <div class="response-comparison-box">
                    <div class="ans-col user-ans-col">
                        <div class="col-heading user">📝 Your Submitted Response:</div>
                        <div>${typeof userAns === 'string' ? this.formatPrompt(userAns) : JSON.stringify(userAns)}</div>
                    </div>
                    <div class="ans-col model-ans-col">
                        <div class="col-heading model">✅ CGBSE Model Answer & Marking Criteria:</div>
                        <div>${this.formatPrompt(modelAns)}</div>
                        ${diagramHtml}
                    </div>
                </div>

                <div style="background: #f8fafc; padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid #e2e8f0; margin-top: 0.75rem;">
                    <div style="font-size: 0.85rem; font-weight: 600; color: #334155;">Examiner Feedback:</div>
                    <p style="font-size: 0.85rem; color: #475569; margin: 0.2rem 0;">${qRes.feedback}</p>
                    
                    ${qRes.matchedKeywords && qRes.matchedKeywords.length > 0 ? `
                        <div class="keyword-chips-row">
                            <span style="font-size: 0.75rem; font-weight: 600; color: #166534; margin-right: 0.25rem;">Matched Concepts:</span>
                            ${qRes.matchedKeywords.map(kw => `<span class="chip chip-matched">✓ ${kw}</span>`).join('')}
                        </div>
                    ` : ''}

                    ${qRes.missingKeywords && qRes.missingKeywords.length > 0 ? `
                        <div class="keyword-chips-row" style="margin-top: 0.35rem;">
                            <span style="font-size: 0.75rem; font-weight: 600; color: #991b1b; margin-right: 0.25rem;">Key Terms Expected:</span>
                            ${qRes.missingKeywords.slice(0, 4).map(kw => `<span class="chip chip-missing">✗ ${kw}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    adjustQuestionScore(qid, delta) {
        if (!this.currentEvaluation) return;

        const qRes = this.currentEvaluation.questionResults.find(r => r.id === qid);
        if (!qRes) return;

        let newScore = qRes.marksAwarded + delta;
        newScore = Math.max(0, Math.min(qRes.maxMarks, Math.round(newScore * 10) / 10));

        const diff = newScore - qRes.marksAwarded;
        qRes.marksAwarded = newScore;

        // Update overall total
        this.currentEvaluation.totalMarksAwarded = Math.round((this.currentEvaluation.totalMarksAwarded + diff) * 10) / 10;
        this.currentEvaluation.percentage = Math.round((this.currentEvaluation.totalMarksAwarded / this.currentEvaluation.maxMarks) * 100);
        this.currentEvaluation.isPassed = this.currentEvaluation.totalMarksAwarded >= 23;

        // Recalculate Grade
        const pct = this.currentEvaluation.percentage;
        if (pct >= 90) this.currentEvaluation.grade = "A1";
        else if (pct >= 80) this.currentEvaluation.grade = "A2";
        else if (pct >= 70) this.currentEvaluation.grade = "B1";
        else if (pct >= 60) this.currentEvaluation.grade = "B2";
        else if (pct >= 50) this.currentEvaluation.grade = "C1";
        else if (pct >= 33) this.currentEvaluation.grade = "D";
        else this.currentEvaluation.grade = "E";

        // Update UI value directly
        const scoreElem = document.getElementById(`scoreVal_${qid}`);
        if (scoreElem) scoreElem.textContent = newScore;

        // Re-render score header without losing position
        this.renderScorecard(this.currentEvaluation);
    }

    retakeExam() {
        if (confirm("Do you want to reset your answers and start a fresh 3-hour test attempt?")) {
            ExamStorage.clearDraft();
            this.responses = {};
            this.flagged.clear();
            this.timerSeconds = 180 * 60;
            this.timeSpentSeconds = 0;
            this.currentEvaluation = null;

            this.loadInitialState();
            this.renderPaper();
            this.renderPalette();
            this.startTimer();
            this.switchTab("exam");
        }
    }

    fillSampleAnswers() {
        if (!confirm("Load sample answers for all questions? This allows you to immediately test the auto-evaluation, model answers, keywords, and scorecard.")) return;

        const sample = {
            q1_i: 'B', q1_ii: 'C', q1_iii: 'C', q1_iv: 'B', q1_v: 'B',
            q1_vi: 'C', q1_vii: 'B', q1_viii: 'B', q1_ix: 'B', q1_x: 'C',
            q1_xi: 'Tapetum layer nourishes developing microspores',
            q1_xii: '47, XXY (Extra X chromosome in male)',
            q1_xiii: 'Aedes aegypti mosquito',
            q1_xiv: 'EcoRI',
            q1_xv: 'Commensalism is an interaction where one species benefits while the other is neither harmed nor benefited (+/0), e.g. orchid on mango tree.',
            q2: 'Double fertilization in angiosperms involves two key fertilizations: Syngamy where one male gamete fuses with the egg cell to form diploid zygote (2n), and Triple Fusion where second male gamete fuses with two polar nuclei to form triploid Primary Endosperm Nucleus (PEN, 3n).',
            q3: 'Spermatogenesis occurs inside seminiferous tubules of testes producing 4 functional sperms. Oogenesis occurs inside ovaries producing 1 functional ovum along with degenerating polar bodies.',
            q4: 'Mendels Law of Segregation states that two alleles of a gene do not blend; during meiosis and gametogenesis alleles segregate so each gamete carries one pure allele. It is universally applicable without exceptions.',
            q5: 'DNA is more stable than RNA because RNA possesses a reactive 2-OH group on ribose sugar making it chemically labile, whereas DNA lacks it. Also DNA contains thymine instead of uracil, providing greater photochemical stability.',
            q6: 'Active immunity is generated by the host own immune system upon exposure to antigens (e.g. Polio vaccination). Passive immunity involves direct administration of preformed antibodies (e.g. Colostrum IgA or ATS injection).',
            q7: 'Palindromic nucleotide sequences read identical in 5 to 3 direction on both complementary DNA strands. EcoRI recognition sequence is 5-GAATTC-3 and 3-CTTAAG-5, leaving sticky overhangs.',
            q8: 'Gauses Competitive Exclusion Principle states that two closely related species competing for the same limiting resources cannot coexist indefinitely, and the competitively inferior species is eliminated under limiting resources.',
            q9: 'Anatropous ovule is completely inverted so the micropyle lies near funicle. Micropyle facilitates pollen tube entry. Chalaza is the basal region anchoring integuments. Integuments protect nucellus and develop into the seed coat.',
            q10: 'Sex determination in honeybees follows haplodiploidy. Females develop from fertilized diploid eggs (2n = 32 chromosomes). Drones or males develop from unfertilized haploid eggs by parthenogenesis (n = 16 chromosomes) and produce sperm via mitosis.',
            q11: 'PCR operates in three steps: (1) Denaturation at 94C to break hydrogen bonds between DNA strands, (2) Annealing at 50-60C where oligonucleotide primers bind complementary strands, and (3) Extension at 72C using thermostable Taq polymerase.',
            q12: '(a) LAB coagulates milk protein casein into curd, producing lactic acid and enriching vitamin B12. (b) Saccharomyces cerevisiae ferments dough releasing CO2 gas making bread soft and porous. (c) Trichoderma polysporum fungus produces Cyclosporin A, an immunosuppressive drug used in organ transplantation.',
            q13: '(a) Cry proteins are crystal endotoxins produced by Bacillus thuringiensis. (b) In the bacterium, Cry exists as inactive harmless protoxin. When ingested by insects, the alkaline pH of insect midgut solubilizes it, creates pores in epithelial cells, causing lysis and insect death.',
            q14: 'Lindemans 10% law states that only 10% of stored energy is transferred to the next higher trophic level while 90% is lost as metabolic heat in respiration. Due to steep decline, energy is insufficient to sustain beyond 3 to 4 trophic levels.',
            q15: '(a) Cross: Father XHY x Mother XHXh gives XHXH (normal female), XHXh (carrier female), XHY (normal male), and XhY (hemophilic male). (b) 50% of sons will have hemophilia. (c) Daughter cannot be hemophilic because she receives normal dominant XH from father. (d) Hemophilia is rare in females because mother must be carrier and father must be hemophilic.',
            q16: '(a) The Evil Quartet causes of biodiversity loss: (1) Habitat loss and fragmentation, (2) Over-exploitation, (3) Alien species invasion (e.g. Nile perch, Eichhornia), (4) Co-extinctions. (b) In-situ protects within natural ecosystems (National Parks, Biosphere reserves). Ex-situ protects in managed settings (Botanical gardens, Cryopreservation).',
            q17: { choice: 'A', text: 'Menstrual cycle is hormonally controlled:\n1. Menstrual phase (Days 1-5): Caused by sudden drop in progesterone and estrogen, leading to breakdown of uterine endometrium.\n2. Follicular phase (Days 6-13): Pituitary FSH stimulates follicle growth and ovarian estrogen proliferates the endometrium. Around Day 14, LH surge triggers ovulation.\n3. Luteal phase (Days 15-28): Ruptured follicle becomes corpus luteum, which secretes high progesterone to vascularize and maintain endometrium for implantation.' },
            q18: { choice: 'A', text: 'Lac Operon in E. coli (Jacob and Monod):\n(a) Components: Regulator gene i, promoter p, operator o, and structural genes z, y, a.\n(b) In absence of inducer: Active repressor protein from i gene binds operator, physically blocking RNA polymerase (operon switch OFF).\n(c) In presence of lactose inducer: Lactose binds and inactivates repressor. RNA polymerase transcribes polycistronic mRNA (operon switch ON).\n(d) Enzymes: Gene z codes for beta-galactosidase (breaks lactose into glucose and galactose), y codes for permease (increases lactose entry), and a codes for transacetylase.' },
            q19: { choice: 'A', text: 'Life cycle of Plasmodium vivax:\n1. Human host: Female Anopheles mosquito injects sporozoites. Sporozoites reach liver cells and multiply by schizogony to release merozoites. Merozoites invade RBCs. Rupture of RBCs releases toxic hemozoin causing recurring chills and fever every 3-4 days. Gametocytes develop in blood.\n2. Mosquito host: Mosquito ingests gametocytes during blood meal. In mosquito gut, gametes fertilize to form motile ookinete and oocyst. Oocyst undergoes sporogony producing sporozoites which migrate to mosquito salivary glands.' }
        };

        this.responses = sample;
        ExamStorage.saveDraft(this.responses, this.timerSeconds);
        this.renderPaper();
        this.renderPalette();
        alert("Sample answers successfully loaded! You can now click 'Submit & Check Marks' to view grading and performance tracking.");
    }

    // --- Render History & Analytics Tab ---
    renderHistory() {
        const stats = ExamStorage.getOverallStats();
        const history = ExamStorage.getHistory();

        // Render stats cards
        const statsContainer = document.getElementById("historyStatsGrid");
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-card">
                    <span class="stat-lbl">Total Attempts</span>
                    <span class="stat-val">${stats.totalAttempts}</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">Recorded tests</span>
                </div>
                <div class="stat-card">
                    <span class="stat-lbl">Highest Score</span>
                    <span class="stat-val" style="color: var(--success-color);">${stats.highestScore} / 70</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">${Math.round((stats.highestScore / 70) * 100)}% Peak</span>
                </div>
                <div class="stat-card">
                    <span class="stat-lbl">Average Score</span>
                    <span class="stat-val">${stats.averageScore} / 70</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">Mean score</span>
                </div>
                <div class="stat-card">
                    <span class="stat-lbl">Pass Rate</span>
                    <span class="stat-val" style="color: ${stats.passRate >= 70 ? 'var(--success-color)' : 'var(--warning-color)'};">${stats.passRate}%</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">Threshold: 23/70</span>
                </div>
            `;
        }

        // Render history table
        const tableBody = document.getElementById("historyTableBody");
        if (tableBody) {
            if (history.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                            No exam attempts recorded yet. Take the predicted test and submit to view your progress history!
                        </td>
                    </tr>
                `;
            } else {
                tableBody.innerHTML = history.map((att, index) => `
                    <tr>
                        <td><strong>${att.name}</strong></td>
                        <td>${att.formattedDate}</td>
                        <td>${att.formattedTimeSpent}</td>
                        <td>
                            <strong style="color: var(--primary-color); font-size: 1rem;">${att.evaluation.totalMarksAwarded}</strong>
                            <span style="color: var(--text-muted); font-size: 0.8rem;">/ 70 (${att.evaluation.percentage}%)</span>
                        </td>
                        <td>
                            <span class="badge ${att.evaluation.isPassed ? 'badge-green' : 'badge-red'}">
                                ${att.evaluation.grade} • ${att.evaluation.isPassed ? 'Pass' : 'Fail'}
                            </span>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline btn-sm" onclick="window.appInstance.viewPastAttempt('${att.id}')">
                                🔍 Review
                            </button>
                            <button type="button" class="btn btn-outline btn-sm" style="color: var(--danger-color);" onclick="window.appInstance.deleteAttempt('${att.id}')">
                                🗑️
                            </button>
                        </td>
                    </tr>
                `).join('');
            }
        }
    }

    viewPastAttempt(attemptId) {
        const att = ExamStorage.getAttemptById(attemptId);
        if (!att) return;

        this.currentEvaluation = att.evaluation;
        this.timeSpentSeconds = att.timeSpentSeconds;
        this.renderScorecard(att.evaluation);
        this.switchTab("result");
    }

    deleteAttempt(attemptId) {
        if (confirm("Delete this test attempt from history?")) {
            ExamStorage.deleteAttempt(attemptId);
            this.renderHistory();
        }
    }

    clearAllHistory() {
        if (confirm("Clear all recorded exam attempts? This cannot be undone.")) {
            ExamStorage.clearAllHistory();
            this.renderHistory();
        }
    }

    // --- Render 3-Year Analysis ---
    render3YearAnalysis() {
        const tableBody = document.getElementById("trendTableBody");
        if (tableBody) {
            tableBody.innerHTML = this.pastAnalysis.unitWiseTrend.map(row => `
                <tr>
                    <td style="font-weight: 700; color: #1e3a8a; width: 180px;">
                        ${row.unit}<br>
                        <span class="badge badge-blue" style="margin-top: 0.35rem;">${row.weightage}</span>
                    </td>
                    <td>${row.y2024}</td>
                    <td>${row.y2025}</td>
                    <td>${row.y2026}</td>
                    <td style="font-size: 0.82rem; color: #475569; background: #f8fafc;">${row.trendComment}</td>
                </tr>
            `).join('');
        }

        const diagramList = document.getElementById("diagramFrequencyList");
        if (diagramList) {
            diagramList.innerHTML = this.pastAnalysis.diagramFrequencyRank.map(diag => `
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #0f172a; font-size: 0.95rem;">${diag.rank}. ${diag.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${diag.unit} • Asked: ${diag.timesAsked}</div>
                    </div>
                    <span class="badge ${diag.importance === 'Critical' ? 'badge-red' : (diag.importance === 'Very High' ? 'badge-gold' : 'badge-blue')}">
                        ${diag.importance}
                    </span>
                </div>
            `).join('');
        }
    }

    // --- Render 2027 Predictions ---
    renderPredictions() {
        const grid = document.getElementById("predictionsGrid");
        if (grid) {
            grid.innerHTML = this.predictions.hotTopics.map(item => `
                <div class="hot-topic-card">
                    <div>
                        <div class="hot-topic-header">
                            <span class="prob-badge">🎯 ${item.probability} Probability</span>
                            <span class="badge badge-blue">${item.type}</span>
                        </div>
                        <h4 class="hot-topic-title">${item.topic}</h4>
                        <div class="hot-topic-meta">${item.chapter}</div>
                        <p class="hot-topic-desc">${item.reason}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    bindGlobalEvents() {
        window.appInstance = this;

        // Submit button
        const submitBtn = document.getElementById("btnSubmitPaper");
        if (submitBtn) {
            submitBtn.addEventListener("click", () => this.confirmSubmit());
        }

        // Pause/Resume button
        const pauseBtn = document.getElementById("btnPauseTimer");
        if (pauseBtn) {
            pauseBtn.addEventListener("click", () => {
                this.isTimerPaused = !this.isTimerPaused;
                pauseBtn.textContent = this.isTimerPaused ? "▶ Resume" : "⏸ Pause";
                pauseBtn.classList.toggle("btn-accent", this.isTimerPaused);
            });
        }
    }
}
