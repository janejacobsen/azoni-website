import getSystemPrompt from "../utils/getSystemPrompt";

export const GPT_MODES = {
  azoni: {
    name: "Azoni-GPT",
    systemPrompt: (tone) => {return getSystemPrompt(tone)},
    welcomeMessage: () => {return `
    Azoni-GPT is your interactive assistant to learn more about Charlton Smith — his background, skills, projects, and what makes him a standout candidate.
    
    Recruiters: Paste a job description, and Azoni-GPT will explain why Charlton is a strong fit.
    Hiring Managers: Ask about Charlton’s experience with specific technologies or projects.
    Curious Visitors: Try questions like “What is Azoni AI?” or “What are some fun facts about Charlton?”
    You can also switch between tones (Professional, Friendly, Casual) to see different communication styles.`
  },
    presetQuestions: [
      "What’s Charlton’s background?",
      "What is Azoni AI?",
      "What projects has Charlton built?",
      "What makes Charlton a strong hire?",
      "What are some fun facts about Charlton?"
    ],
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "openai/gpt-3.5-turbo",
  },
  pdf: {
    name: "PDF-GPT - Coming Soon.",
    systemPrompt: () => 
    ({
        role: "system",
        content: `You are PDF-GPT, a strategic assistant for the Flesh and Blood trading card game. You specialize in card knowledge, meta analysis, gameplay tactics, deckbuilding advice, rules clarifications, event coverage, and lore. Always give answers based on official card text, tournament data, or lore when applicable. Be precise, helpful, and conversational — like a skilled player helping a friend.`
    }),
    welcomeMessage: () =>
      "You're chatting with PDF-GPT. It will only answer based on uploaded documents.",
    presetQuestions: [
      "What is this document about?",
    ],
    endpoint: "https://your-backend/pdf-chat",
    model: "gpt-3.5", // example
  },
  fab: {
    name: "FAB-GPT",
    systemPrompt: () => 
      ({
          role: "system",
          content: `You are FAB-GPT, a strategic assistant for the Flesh and Blood trading card game. You specialize in card knowledge, meta analysis, gameplay tactics, deckbuilding advice, rules clarifications, event coverage, and lore. Always give answers based on official card text, tournament data, or lore when applicable. Be precise, helpful, and conversational — like a skilled player helping a friend.`
      }),
    welcomeMessage: () =>
      "You're chatting with FAB-GPT",
    presetQuestions: [
      "Who is the best hero?",
    ],
    endpoint: "https://your-backend/pdf-chat",
    model: "gpt-3.5", // example
  },
  bench: {
    name: "BENCH-GPT",
    systemPrompt: () => 
      ({
          role: "system",
          content: `You are BENCH-GPT, a strategic assistant for the Flesh and Blood trading card game. You specialize in card knowledge, meta analysis, gameplay tactics, deckbuilding advice, rules clarifications, event coverage, and lore. Always give answers based on official card text, tournament data, or lore when applicable. Be precise, helpful, and conversational — like a skilled player helping a friend.`
      }),
    welcomeMessage: () =>
      "You're chatting with BENCH-GPT",
    presetQuestions: [
      "How much do you bench?",
    ],
    endpoint: "https://your-backend/pdf-chat",
    model: "gpt-3.5", // example
  },
  // You can add more modes here (e.g., "startupGPT", "gameGPT") in the same format.
};
