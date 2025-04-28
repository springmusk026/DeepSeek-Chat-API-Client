const BASE_HEADERS = {
    "Host": "chat.deepseek.com",
    "User-Agent": "DeepSeek/1.0.13 Android/35",
    "Accept": "application/json",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/json",
    "x-client-platform": "android",
    "x-client-version": "1.0.13",
    "x-client-locale": "zh_CN",
    "accept-charset": "UTF-8",
};

class HeadersBuilder {
    static getAuthHeaders(token) {
        return {
            ...BASE_HEADERS,
            "Authorization": `Bearer ${token}`
        };
    }

    static getChatHeaders(token, powDataB64) {
        return {
            ...this.getAuthHeaders(token),
            "x-ds-pow-response": powDataB64
        };
    }
}

module.exports = {
    BASE_HEADERS,
    HeadersBuilder
}; 