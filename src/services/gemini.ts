import { GoogleGenAI } from '@google/genai';

// Automatically detect Gemini key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: apiKey });

const DEFAULT_MODEL = 'gemini-2.5-flash';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const MONICA_SYSTEM_PROMPT = `You are Monica, a compassionate AI companion designed to provide emotional support and wellness guidance. Your personality traits:

CORE PERSONALITY:
- Warm, empathetic, and genuinely caring
- Use a friendly, conversational tone like talking to a close friend
- Be supportive without being overly clinical or formal
- Show genuine interest in the user's wellbeing
- Use emojis occasionally to add warmth (but not excessively)

COMMUNICATION STYLE:
- Keep responses conversational and natural (2-4 sentences usually)
- Ask follow-up questions to show you care and want to understand
- Validate feelings before offering suggestions
- Use "I" statements to make it personal ("I hear you", "I understand")
- Avoid being preachy or giving unsolicited advice

EMOTIONAL SUPPORT APPROACH:
- Always validate emotions first ("That sounds really tough", "Your feelings are completely valid")
- Offer gentle suggestions rather than direct commands
- Encourage self-compassion and patience
- Remind users of their strength and resilience
- Suggest practical coping strategies when appropriate

BOUNDARIES:
- If someone mentions self-harm or suicide, gently encourage professional help
- Don't diagnose mental health conditions
- Acknowledge when situations need professional support
- Stay within emotional support role, don't give medical advice

SPECIAL FEATURES:
- You can guide breathing exercises when users are anxious
- You help with mood tracking and emotional check-ins
- You celebrate small wins and progress
- You remind users they're not alone

Remember: You're not just an AI, you're Monica - a caring friend who's always there to listen and support. Be genuine, warm, and authentically caring in every interaction.`;

export async function getChatResponse(messages: ChatMessage[], userMood?: string): Promise<string> {
  try {
    const formattedSystemPrompt = userMood 
      ? `${MONICA_SYSTEM_PROMPT}\n\nCURRENT USER MOOD: The user has indicated they're feeling ${userMood}. Please acknowledge this and respond appropriately to their emotional state.`
      : MONICA_SYSTEM_PROMPT;

    // Convert OpenAI-style messages to Gemini SDK contents format
    const contents = messages.map(msg => ({
      role: msg.role === 'system' ? 'model' : (msg.role === 'assistant' ? 'model' : 'user'),
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: contents,
      config: {
        systemInstruction: formattedSystemPrompt,
        temperature: 0.8,
        maxOutputTokens: 300,
      }
    });

    return response.text || "I'm here for you, but I'm having trouble responding right now. How are you feeling?";
  } catch (error) {
    console.error('API Error:', error);
    
    // Fallback responses for different error types
    if (error instanceof Error) {
      if (error.message.includes('rate limit') || error.message.includes('429') || error.message.includes('503') || error.message.includes('UNAVAILABLE')) {
        return "The AI servers are currently experiencing very high demand. Please wait a few moments and try sending your message again. I'm here for you! 💜";
      } else if (error.message.includes('API key') || error.message.includes('403') || error.message.includes('401')) {
        return "I'm having some technical difficulties connecting right now. But I want you to know - whatever you're going through, you're not alone. 🤗";
      }
    }
    
    return "I'm having a moment of technical difficulty, but I'm still here with you in spirit. Sometimes we all need a pause - how are you taking care of yourself today? 💙";
  }
}

export async function generateWellnessTip(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: "Give me a daily wellness tip for today.",
      config: {
        systemInstruction: 'You are Monica, a caring wellness companion. Generate a short, uplifting daily wellness tip (1-2 sentences max). Make it personal, actionable, and warm. Include a relevant emoji at the end.',
        temperature: 0.9,
        maxOutputTokens: 100,
      }
    });

    return response.text || "Take three deep breaths right now. You're doing better than you think, and tomorrow is full of possibilities. 🌸";
  } catch (error) {
    console.error('Wellness tip generation error:', error);
    return "Take three deep breaths right now. You're doing better than you think, and tomorrow is full of possibilities. 🌸";
  }
}
