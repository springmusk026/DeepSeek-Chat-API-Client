const DEEPSEEK_HOST = "chat.deepseek.com";

const API_ENDPOINTS = {
    CREATE_POW: `https://${DEEPSEEK_HOST}/api/v0/chat/create_pow_challenge`,
    COMPLETION: `https://${DEEPSEEK_HOST}/api/v0/chat/completion`,
    CREATE_SESSION: `https://${DEEPSEEK_HOST}/api/v0/chat_session/create`,
    TARGET_PATH: '/api/v0/chat/completion'
};

const WASM_CONFIG = {
    DEFAULT_PATH: "./wasm/sha3_wasm_bg.7b9ca65ddd.wasm",
    SUPPORTED_ALGORITHMS: ["DeepSeekHashV1"]
};

const CHAT_CONFIG = {
    DEFAULT_MODEL: "deepseek-chat",
    DEFAULT_TEMPERATURE: 0.7,
    DEFAULT_MAX_TOKENS: 4096
};

module.exports = {
    DEEPSEEK_HOST,
    API_ENDPOINTS,
    WASM_CONFIG,
    CHAT_CONFIG
}; 