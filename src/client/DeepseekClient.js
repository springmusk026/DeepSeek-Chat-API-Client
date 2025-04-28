const { API_ENDPOINTS, CHAT_CONFIG } = require('../config/constants');
const { HeadersBuilder } = require('../config/headers');
const PowService = require('../services/PowService');
const ChatSession = require('./ChatSession');

class DeepseekClient {
    constructor(token, parentMessageId = null) {
        this.token = token;
        this.powService = new PowService();
        this.currentSession = null;
        this.parentMessageId = parentMessageId;
    }

    async initialize() {
        await this.powService.initialize();
    }

    async createSession() {
        this.currentSession = await ChatSession.create(this.token, this.parentMessageId);
        return this.currentSession;
    }

    async sendMessage(message, session = null, { thinking_enabled = false, search_enabled = false } = {}) {
        if (!session && !this.currentSession) {
            session = await this.createSession();
        }
        const chatSession = session || this.currentSession;

        // Increment message ID for human message
        chatSession.incrementMessageId();

        const powDataB64 = await this.powService.getPowResponse(
            this.token,
            API_ENDPOINTS.TARGET_PATH
        );

        const headers = HeadersBuilder.getChatHeaders(this.token, powDataB64);

        const payload = {
            prompt: message,
            model: CHAT_CONFIG.DEFAULT_MODEL,
            stream: true,
            temperature: CHAT_CONFIG.DEFAULT_TEMPERATURE,
            max_tokens: CHAT_CONFIG.DEFAULT_MAX_TOKENS,
            ref_file_ids: [],
            thinking_enabled,
            search_enabled,
            chat_session_id: chatSession.getId(),
            parent_message_id: chatSession.getParentMessageId()
        };

        try {
            const response = await fetch(API_ENDPOINTS.COMPLETION, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Chat completion error:", errorData);
                throw new Error(`Chat completion failed: ${response.status}`);
            }

            // Increment message ID for AI response
            chatSession.incrementMessageId();
            
            return response;
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
        }
    }

    async *streamResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                yield chunk;
            }
        } finally {
            reader.releaseLock();
        }
    }
}

module.exports = DeepseekClient; 