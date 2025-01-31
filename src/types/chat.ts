import { Content } from "@google/generative-ai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Helper function to convert ChatMessage to Gemini Content format
export function chatMessageToGeminiContent(message: ChatMessage): Content {
  return {
    role: message.role,
    parts: [{ text: message.content }],
  };
}
