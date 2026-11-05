/**
 * Intelligent Evaluation & Marks Assessment Engine for CGBSE Class 12 Biology
 */

class ExamEvaluator {
    constructor(examData) {
        this.examData = examData;
    }

    /**
     * Normalize text for fuzzy keyword matching
     */
    normalizeText(text) {
        if (!text) return "";
        return text
            .toLowerCase()
            .replace(/[^\w\s\d]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    /**
     * Count words in a string
     */
    getWordCount(text) {
        if (!text) return 0;
        return text.trim().split(/\s+/).filter(w => w.length > 0).length;
    }

    /**
     * Check if a keyword or phrase appears in user response
     */
    checkKeywordMatch(normalizedResponse, keyword) {
        const normKey = this.normalizeText(keyword);
        if (!normKey) return false;
        
        // Exact substring
        if (normalizedResponse.includes(normKey)) return true;

        // Multi-word phrase partial match (if 75% words match)
        const keyWords = normKey.split(" ");
        if (keyWords.length > 1) {
            let matched = 0;
            for (let kw of keyWords) {
                if (kw.length > 2 && normalizedResponse.includes(kw)) {
                    matched++;
                }
            }
            if (matched / keyWords.length >= 0.75) return true;
        }

        return false;
    }

    /**
     * Evaluate single question
     */
    evaluateQuestion(q, userResponse) {
        let result = {
            id: q.id,
            qNum: q.qNum,
            type: q.type,
            maxMarks: q.marks,
            userResponse: userResponse,
            marksAwarded: 0,
            feedback: "",
            matchedKeywords: [],
            missingKeywords: [],
            status: "unanswered", // "correct", "partial", "incorrect", "unanswered"
            modelAnswer: q.modelAnswer || "",
            chosenOption: null
        };

        // For choice questions in Section E
        if (q.hasChoice) {
            const chosenOptionKey = (userResponse && userResponse.choice) ? userResponse.choice : "A";
            result.chosenOption = chosenOptionKey;
            const optionData = chosenOptionKey === "A" ? q.optionA : q.optionB;
            const textResponse = (userResponse && userResponse.text) ? userResponse.text : "";
            result.userResponse = textResponse;
            result.modelAnswer = optionData.modelAnswer;

            if (!textResponse || textResponse.trim() === "") {
                result.feedback = "No answer provided for this question.";
                result.missingKeywords = optionData.keywords;
                return result;
            }

            const norm = this.normalizeText(textResponse);
            const wordCount = this.getWordCount(textResponse);

            let matchedCount = 0;
            optionData.keywords.forEach(kw => {
                if (this.checkKeywordMatch(norm, kw)) {
                    result.matchedKeywords.push(kw);
                    matchedCount++;
                } else {
                    result.missingKeywords.push(kw);
                }
            });

            // Calculate score for 5-mark question
            let keywordRatio = matchedCount / Math.max(optionData.keywords.length, 1);
            let lengthFactor = Math.min(wordCount / 70, 1.0); // expects ~70-150 words for full length factor

            let calculatedScore = (keywordRatio * 0.7 + lengthFactor * 0.3) * q.marks;
            // Round to nearest 0.5
            result.marksAwarded = Math.min(q.marks, Math.max(0, Math.round(calculatedScore * 2) / 2));

            if (result.marksAwarded >= 4.0) {
                result.status = "correct";
                result.feedback = `Strong descriptive response covering ${matchedCount} critical concepts. Well structured.`;
            } else if (result.marksAwarded >= 2.0) {
                result.status = "partial";
                result.feedback = `Good attempt covering ${matchedCount} concepts. Elaborate more on physiological details and diagrams for full marks.`;
            } else {
                result.status = "partial";
                result.feedback = `Preliminary answer. Missing crucial key points: ${result.missingKeywords.slice(0, 3).join(", ")}.`;
            }
            return result;
        }

        // Standard questions
        if (!userResponse || (typeof userResponse === "string" && userResponse.trim() === "")) {
            result.feedback = "Question not attempted.";
            result.missingKeywords = q.keywords || [];
            return result;
        }

        // 1. MCQ Evaluation
        if (q.type === "mcq") {
            const userChoice = typeof userResponse === "string" ? userResponse.trim().toUpperCase() : userResponse;
            if (userChoice === q.correctAnswer) {
                result.marksAwarded = 1;
                result.status = "correct";
                result.feedback = `Correct! Option [${q.correctAnswer}] is the right choice.`;
            } else {
                result.marksAwarded = 0;
                result.status = "incorrect";
                result.feedback = `Incorrect. You chose [${userChoice}], but correct answer is Option [${q.correctAnswer}].`;
            }
            return result;
        }

        // 2. VSA (Very Short Answer - 1 Mark)
        if (q.type === "vsa") {
            const norm = this.normalizeText(userResponse);
            let matched = false;
            let matchedKey = "";

            for (let kw of q.keywords) {
                if (this.checkKeywordMatch(norm, kw)) {
                    matched = true;
                    matchedKey = kw;
                    result.matchedKeywords.push(kw);
                    break;
                }
            }

            if (matched) {
                result.marksAwarded = 1;
                result.status = "correct";
                result.feedback = `Accurate answer. Key term '${matchedKey}' identified correctly.`;
            } else {
                // If user wrote something reasonable
                if (norm.length > 5) {
                    result.marksAwarded = 0.5;
                    result.status = "partial";
                    result.feedback = `Partially acceptable, but expected exact technical term like '${q.keywords[0]}'.`;
                    result.missingKeywords = q.keywords;
                } else {
                    result.marksAwarded = 0;
                    result.status = "incorrect";
                    result.feedback = `Incorrect technical term. Expected '${q.keywords[0]}'.`;
                    result.missingKeywords = q.keywords;
                }
            }
            return result;
        }

        // 3. Subjective (SA-I 2M, SA-II 3M, LA-I 4M)
        const norm = this.normalizeText(userResponse);
        const wordCount = this.getWordCount(userResponse);
        const keywords = q.keywords || [];

        let matchedCount = 0;
        keywords.forEach(kw => {
            if (this.checkKeywordMatch(norm, kw)) {
                result.matchedKeywords.push(kw);
                matchedCount++;
            } else {
                result.missingKeywords.push(kw);
            }
        });

        const keywordRatio = matchedCount / Math.max(keywords.length, 1);
        const targetWords = q.marks === 2 ? 25 : (q.marks === 3 ? 45 : 70);
        const lengthFactor = Math.min(wordCount / targetWords, 1.0);

        let score = (keywordRatio * 0.75 + lengthFactor * 0.25) * q.marks;
        let roundedScore = Math.min(q.marks, Math.max(0, Math.round(score * 2) / 2));
        result.marksAwarded = roundedScore;

        if (roundedScore === q.marks) {
            result.status = "correct";
            result.feedback = `Comprehensive answer. Included ${matchedCount} relevant biological keywords and accurate concepts.`;
        } else if (roundedScore >= q.marks * 0.5) {
            result.status = "partial";
            result.feedback = `Fair answer. Key concepts addressed, but missing terms like: ${result.missingKeywords.slice(0, 3).join(", ")}.`;
        } else {
            result.status = "partial";
            result.feedback = `Needs more conceptual depth and relevant terminology. Missing: ${result.missingKeywords.slice(0, 3).join(", ")}.`;
        }

        return result;
    }

    /**
     * Evaluate complete paper responses
     */
    evaluatePaper(userResponses) {
        let totalMarksAwarded = 0;
        let sectionScores = {};
        let questionResults = [];
        let questionsAttempted = 0;
        let questionsCorrect = 0;
        let questionsPartial = 0;

        this.examData.sections.forEach(section => {
            let sectionAwarded = 0;
            let sectionMax = section.marksTotal;

            section.questions.forEach(q => {
                const userResp = userResponses[q.id];
                const evaluated = this.evaluateQuestion(q, userResp);
                
                questionResults.push(evaluated);
                sectionAwarded += evaluated.marksAwarded;

                if (evaluated.userResponse && 
                    (typeof evaluated.userResponse === "string" ? evaluated.userResponse.trim() !== "" : true)) {
                    questionsAttempted++;
                }

                if (evaluated.status === "correct") questionsCorrect++;
                else if (evaluated.status === "partial") questionsPartial++;
            });

            sectionScores[section.id] = {
                title: section.title,
                marksAwarded: Math.round(sectionAwarded * 10) / 10,
                maxMarks: sectionMax,
                percentage: Math.round((sectionAwarded / sectionMax) * 100)
            };

            totalMarksAwarded += sectionAwarded;
        });

        totalMarksAwarded = Math.round(totalMarksAwarded * 10) / 10;
        const maxMarks = this.examData.header.maximumMarks;
        const percentage = Math.round((totalMarksAwarded / maxMarks) * 100);

        // Grade calculation based on CGBSE standard scale
        let grade = "E";
        let gradeDescription = "Needs Improvement / Compartment";
        if (percentage >= 90) { grade = "A1"; gradeDescription = "Outstanding Performance"; }
        else if (percentage >= 80) { grade = "A2"; gradeDescription = "Excellent Performance"; }
        else if (percentage >= 70) { grade = "B1"; gradeDescription = "Very Good"; }
        else if (percentage >= 60) { grade = "B2"; gradeDescription = "Good"; }
        else if (percentage >= 50) { grade = "C1"; gradeDescription = "Average"; }
        else if (percentage >= 33) { grade = "D"; gradeDescription = "Passed"; }

        const isPassed = totalMarksAwarded >= 23; // 33% of 70 is 23.1, pass mark is 23

        return {
            totalMarksAwarded,
            maxMarks,
            percentage,
            grade,
            gradeDescription,
            isPassed,
            passThreshold: 23,
            questionsAttempted,
            totalQuestions: questionResults.length,
            questionsCorrect,
            questionsPartial,
            sectionScores,
            questionResults,
            evaluatedAt: new Date().toISOString()
        };
    }
}
