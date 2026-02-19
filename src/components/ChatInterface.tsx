import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your AI Tax Assistant. How can I help you today?",
        timestamp: new Date(Date.now() - 60000),
    },
];
const API_URL = 'https://taxlens-vercel.vercel.app/api/ask';

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const question = inputValue.trim();
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: question,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            let aiContent = data.answer;
            if (data.sources && data.sources.length > 0) {
                const sourcesText = data.sources.map((s: any) => s.content).join('\n\n');
                aiContent += `\n\n**Sources:**\n${sourcesText}`;
            }

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiContent,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error('API Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "❌ Error: Check if backend is running at localhost:8000.\n" + String(error),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800">AI Tax Assistant</h3>
                    <p className="text-xs text-slate-500">Powered by tax information</p>
                </div>
            </div>

            {/* Chat Container */}
            <div
                id="chat-container"
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-emerald-600 text-white'
                                }`}
                        >
                            {message.role === 'user' ? (
                                <User className="w-5 h-5" />
                            ) : (
                                <Bot className="w-5 h-5" />
                            )}
                        </div>

                        <div
                            className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${message.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                                }`}
                        >
                            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            <span className={`text-[10px] mt-2 block opacity-70 ${message.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                                }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 text-white">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <form onSubmit={handleSendMessage} className="flex gap-3 relative">
                    <input
                        id="question-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question about your taxes..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        disabled={isTyping}
                    />
                    <button
                        id="send-button"
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                <p className="text-center text-xs text-slate-400 mt-2">
                    AI may produce inaccurate information. Please verify with a tax professional.
                </p>
            </div>
        </div>
    );
}
