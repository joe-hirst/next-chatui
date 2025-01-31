"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/chat";
import classNames from "classnames";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { content: string } = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch (error) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Conversation container */}
      <div className="flex-1 flex flex-col">
        {/* Messages area */}
        <div className="flex-1 h-[calc(100vh-120px)] overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 flex items-start ${
                  message.role === "assistant" ? "bg-white" : ""
                }`}
              >
                {/* Avatar */}
                <div className="mr-3 flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                      message.role === "assistant"
                        ? "bg-emerald-500"
                        : "bg-gray-600"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      // Assistant icon (you can replace with your own)
                      <span className="text-white text-sm">AI</span>
                    ) : (
                      // User icon (you can replace with your own)
                      <span className="text-white text-sm">U</span>
                    )}
                  </div>
                </div>
                {/* Message content */}
                <div className="flex-1 space-y-2">
                  <p className="prose prose-sm max-w-none">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-6 flex items-start">
                <div className="mr-3 flex-shrink-0">
                  <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center">
                    <span className="text-white text-sm">AI</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t bg-white">
          <div className="max-w-3xl mx-auto p-4">
            <form onSubmit={handleSubmit}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Send a message..."
                  className="w-full p-4 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 p-2 text-gray-500 hover:text-emerald-500 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>
            </form>
            <p className="mt-2 text-xs text-center text-gray-400">
              Free Preview. AI may produce inaccurate information about people,
              places, or facts.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
