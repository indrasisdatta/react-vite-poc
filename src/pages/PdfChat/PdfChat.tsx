import { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Chat = {
    role: string
    content: string
}

const PdfChat = () => {

    const [chatMessages, setChatMessages] = useState<Chat[]>([]);

    const fetchStream = async () => {
        const userMessage = {
            role: "user",
            content:
                "List the primary and secondary skills of the candidate. Is he suitable for Tech Lead role?",
        };
        setChatMessages([userMessage, { role: "assistant", content: "" }]);
        const response = await fetch('http://localhost:9000/chat/stream', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "user_question": userMessage.content,
                "session_id": "ab2e0905-1738-4ec9-83df-87eeba257ec1"
            })
        });
        if (!response.body) {
            throw new Error("ReadableStream not supported in this browser.");
        }
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        let result = "";
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            result += chunk;
            setChatMessages(prev => {
                const messages = [...prev];
                messages[messages.length - 1] = {
                    role: "assistant",
                    content: result
                };
                return messages;
            });
        }
    }

    useEffect(() => {
        fetchStream();
    }, [])


    return (
        <div style={{ padding: 20 }}>
            {chatMessages.map((msg, index) => (
                <div key={index} style={{ marginBottom: 12 }}>
                    <strong>{msg.role}:</strong>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
}

export default PdfChat