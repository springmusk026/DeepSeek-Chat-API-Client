const DeepseekClient = require('./client/DeepseekClient');

/**
 * Example usage of DeepseekClient
 * @param {string} token - Your DeepSeek token from chat.deepseek.com
 * @param {string} message - Message to send
 * @returns {Promise<void>}
 */
async function chat(token, message) {
    try {
        // Initialize client
        const client = new DeepseekClient(token);
        await client.initialize();

        // Create a new chat session
        const session = await client.createSession();
        console.log(`Created chat session: ${session.getId()}`);

        // Send message and get response
        console.log(`\nSending: "${message}"`);
        const response = await client.sendMessage(message, session, {
            thinking_enabled: true,
            search_enabled: false
        });

        // Handle streaming response
        console.log("\nReceiving response:");
        for await (const chunk of client.streamResponse(response)) {
            process.stdout.write(chunk);
        }
        console.log("\n");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Export the chat function
module.exports = { chat };

// Example usage when run directly
if (require.main === module) {
    const token = process.env.DEEPSEEK_TOKEN;
    if (!token) {
        console.error("Please set DEEPSEEK_TOKEN environment variable");
        process.exit(1);
    }

    const message = process.argv[2] || "Hello! How are you?";
    chat(token, message).catch(console.error);
} 