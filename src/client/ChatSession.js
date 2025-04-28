const { API_ENDPOINTS } = require('../config/constants');
const { HeadersBuilder } = require('../config/headers');

class ChatSession {
    constructor(sessionId = null, parentMessageId = null) {
        this.sessionId = sessionId;
        this.currentMessageId = 0;
        this.parentMessageId = parentMessageId;
    }

    static async create(token, parentMessageId = null) {
        const headers = HeadersBuilder.getAuthHeaders(token);
        const payload = { character_id: null };

        try {
            const response = await fetch(API_ENDPOINTS.CREATE_SESSION, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Session creation error:", errorData);
                throw new Error(`Session creation failed: ${response.status}`);
            }

            const data = await response.json();
            const sessionId = data.data.biz_data.id;
            return new ChatSession(sessionId, parentMessageId);
        } catch (error) {
            console.error("Error in createSession:", error);
            throw error;
        }
    }

    getCurrentMessageId() {
        return this.currentMessageId;
    }

    incrementMessageId() {
        this.currentMessageId += 1;
        return this.currentMessageId;
    }

    getParentMessageId() {
        // For first message, return null
        // For subsequent messages, return the last even number
        return this.parentMessageId === null ? null : this.parentMessageId;
    }

    getId() {
        return this.sessionId;
    }
}

module.exports = ChatSession; 