# DeepSeek Chat API Client

A Node.js client library that demonstrates API interaction with chat.deepseek.com. This project is created for **educational purposes only** to understand API interactions, WebAssembly usage, and streaming responses in Node.js.

⚠️ **Disclaimer**: This project is meant for educational purposes only. It is designed to help developers understand:
- How to work with streaming APIs
- WebAssembly integration in Node.js
- Session management and authentication
- Real-time data processing
- API reverse engineering concepts

Please respect DeepSeek's terms of service and API usage policies.

## Looking for Production-Ready AI Services?

Visit [MCPCore](https://www.mcpcore.xyz) - Your one-stop platform for AI services:
- Access to 30+ AI models in one place
- Advanced AI image generation capabilities
- Premium models including Flux 1 Ultra
- Unified API access
- Production-ready implementations

## Features

- Session management with persistent storage
- WebAssembly-based proof-of-work challenge solving
- Streaming response handling
- Message history tracking
- Clean OOP design

## Installation & Setup

1. **Clone and Install**
   ```bash
   # Clone the repository
   git clone https://github.com/springmusk026/deepseek-api-client.git

   # Navigate to the project directory
   cd deepseek-api-client

   # Install dependencies
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Create your environment file
   cp .env.example .env
   ```

3. **Get Your Token**
   - Visit [chat.deepseek.com](https://chat.deepseek.com)
   - Sign in to your account
   - Open DevTools (F12 or right-click -> Inspect)
   - Go to "Application" tab
   - In left sidebar, expand "Local Storage"
   - Click on "https://chat.deepseek.com"
   - Find "userToken" key
   - Copy its value and add to your .env file:
     ```env
     DEEPSEEK_TOKEN=your_token_here
     ```

## Usage

### 1. Command Line Interface
```bash
# Run with default message
npm start

# Run with custom message
npm start "What is JavaScript?"
```

### 2. Module Integration
```javascript
const { chat } = require('./src');

async function main() {
    const token = process.env.DEEPSEEK_TOKEN;
    await chat(token, "Hello! How are you?");
}

main().catch(console.error);
```

### 3. Advanced Usage
```javascript
const DeepseekClient = require('./src/client/DeepseekClient');

async function customChat() {
    const client = new DeepseekClient(process.env.DEEPSEEK_TOKEN);
    await client.initialize();

    const session = await client.createSession();
    
    const response = await client.sendMessage('Hello!', session, {
        thinking_enabled: true,  // Show AI's thinking process
        search_enabled: false    // Disable web search
    });

    // Handle streaming response
    for await (const chunk of client.streamResponse(response)) {
        process.stdout.write(chunk);
    }
}
```

## Technical Details

### Architecture
```
src/
├── client/
│   ├── DeepseekClient.js    # Main client implementation
│   └── ChatSession.js       # Session management
├── services/
│   └── PowService.js        # Proof-of-work implementation
└── config/
    └── constants.js         # API endpoints & configuration
```

### Key Components

1. **DeepseekClient**
   - Session management
   - Message sending
   - Response streaming

2. **ChatSession**
   - Session creation and management
   - Message ID tracking
   - Parent message handling

3. **PowService**
   - WebAssembly integration
   - Proof-of-work challenge solving

### Message ID System
- User messages: Odd IDs (1, 3, 5, ...)
- Assistant messages: Even IDs (2, 4, 6, ...)
- Parent message IDs for conversation threading

## Educational Value

This project demonstrates:
1. API reverse engineering methodology
2. WebAssembly integration in Node.js
3. Streaming response handling
4. Session management patterns
5. Clean code architecture
6. Error handling best practices

## Contributing

This is an educational project. To contribute:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - See LICENSE file for details.

## Disclaimer

This project is not affiliated with DeepSeek. It is an educational demonstration of API interaction patterns and should not be used in production environments or to circumvent any service limitations or terms of use.

---

⚠️ **Note**: This is a proof-of-concept implementation for educational purposes. Always respect API providers' terms of service and usage policies. 