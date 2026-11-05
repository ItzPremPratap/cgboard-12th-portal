/**
 * Persistent Storage & History Management for CGBSE Biology Exam
 */

const STORAGE_KEYS = {
    DRAFT_RESPONSES: "cgbse_bio_draft_responses",
    DRAFT_TIMER: "cgbse_bio_draft_timer",
    EXAM_HISTORY: "cgbse_bio_exam_history_v1",
    USER_SETTINGS: "cgbse_bio_user_settings"
};

class ExamStorage {
    // --- Current Draft Management ---
    static saveDraft(responses, timeRemaining) {
        try {
            localStorage.setItem(STORAGE_KEYS.DRAFT_RESPONSES, JSON.stringify(responses));
            if (timeRemaining !== undefined) {
                localStorage.setItem(STORAGE_KEYS.DRAFT_TIMER, timeRemaining.toString());
            }
        } catch (e) {
            console.warn("Error saving draft to localStorage:", e);
        }
    }

    static loadDraft() {
        try {
            const draft = localStorage.getItem(STORAGE_KEYS.DRAFT_RESPONSES);
            return draft ? JSON.parse(draft) : null;
        } catch (e) {
            console.warn("Error loading draft:", e);
            return null;
        }
    }

    static loadDraftTimer(defaultSeconds = 180 * 60) {
        try {
            const time = localStorage.getItem(STORAGE_KEYS.DRAFT_TIMER);
            return time ? parseInt(time, 10) : defaultSeconds;
        } catch (e) {
            return defaultSeconds;
        }
    }

    static clearDraft() {
        try {
            localStorage.removeItem(STORAGE_KEYS.DRAFT_RESPONSES);
            localStorage.removeItem(STORAGE_KEYS.DRAFT_TIMER);
        } catch (e) {
            console.warn("Error clearing draft:", e);
        }
    }

    // --- Exam Attempts History Management ---
    static saveAttempt(evaluationResult, timeSpentSeconds, attemptName = null) {
        try {
            const history = this.getHistory();
            const attemptId = "att_" + Date.now();
            const newAttempt = {
                id: attemptId,
                name: attemptName || `Attempt #${history.length + 1}`,
                timestamp: new Date().toISOString(),
                formattedDate: new Date().toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }),
                timeSpentSeconds: timeSpentSeconds,
                formattedTimeSpent: this.formatDuration(timeSpentSeconds),
                evaluation: evaluationResult
            };

            history.unshift(newAttempt); // newest first
            localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(history));
            return newAttempt;
        } catch (e) {
            console.error("Error saving attempt to history:", e);
            return null;
        }
    }

    static getHistory() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error reading exam history:", e);
            return [];
        }
    }

    static getAttemptById(attemptId) {
        const history = this.getHistory();
        return history.find(a => a.id === attemptId) || null;
    }

    static deleteAttempt(attemptId) {
        try {
            let history = this.getHistory();
            history = history.filter(a => a.id !== attemptId);
            localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(history));
            return history;
        } catch (e) {
            console.error("Error deleting attempt:", e);
            return [];
        }
    }

    static clearAllHistory() {
        try {
            localStorage.removeItem(STORAGE_KEYS.EXAM_HISTORY);
            return true;
        } catch (e) {
            return false;
        }
    }

    static formatDuration(seconds) {
        if (!seconds || seconds <= 0) return "0m 0s";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }

    static getOverallStats() {
        const history = this.getHistory();
        if (history.length === 0) {
            return {
                totalAttempts: 0,
                highestScore: 0,
                averageScore: 0,
                latestScore: 0,
                passRate: 0
            };
        }

        const scores = history.map(h => h.evaluation.totalMarksAwarded);
        const highest = Math.max(...scores);
        const latest = scores[0];
        const sum = scores.reduce((a, b) => a + b, 0);
        const avg = Math.round((sum / scores.length) * 10) / 10;
        const passCount = history.filter(h => h.evaluation.isPassed).length;
        const passRate = Math.round((passCount / history.length) * 100);

        return {
            totalAttempts: history.length,
            highestScore: highest,
            averageScore: avg,
            latestScore: latest,
            passRate: passRate
        };
    }
}
