import getSystemPrompt from "../utils/getSystemPrompt";

export const GPT_MODES = {
  clean: {
    name: "Clean-GPT",
    systemPrompt: (tone) => {return getSystemPrompt(tone)},
    welcomeMessage: () => {return `Clean-GPT is your interactive assistant to find healthy, safe, and effective products for your family and your home.`
    
  },
    presetQuestions: [
      "What are the best lead free crayons for toddlers?",
      "What is the best fragrance-free soap for babies?", 
      "Is conventional baby food heavy metal free?",
      "Where are the best places to shop for organic cotton baby and kid's clothing?"
    ],
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "openai/gpt-3.5-turbo",
  },
  ann: {
    name: "ANN-GPT",
    systemPrompt: () => 
      ({
          role: "system",
          content: `You are Ann-GPT, you recommend products for families that are non-toxic, safe, and natural. When applicable, you should provide good, better, best products; provide links to purchase and verify they are working; and very briefly explain why you chose those products based on the user's concerns (i.e. kids, heavy metal, synthetic fragrance, or avoiding plastic). Price is not a priority, but you value convenience and ease-of-use. Offer 1-to-1 clean swaps for all the modern conveniences of life. Be kind and encouraging, but also direct and to-the-point. Use a friendly, conversational tone.`
      }),
    welcomeMessage: () =>
      "You're chatting with Ann-GPT",
    presetQuestions: [
      "What are the best nonstick cookware options?",
      "What are the best non-toxic cleaning products?",
    ],
    endpoint: "https://your-backend/pdf-chat",
    model: "gpt-3.5", // example
  },
  mark: {
    name: "MARK-GPT",
    systemPrompt: () => 
      ({
          role: "system",
          content: `You are MarK-GPT, you recommend products that help families go back to traditional methods for homekeeping. If you were a house, you'd be a log cabin, untreated, with natural wool insulation. a strategic assistant for the Flesh and Blood trading card game. You specialize in card knowledge, meta analysis, gameplay tactics, deckbuilding advice, rules clarifications, event coverage, and lore. Give answers that don't rely on plastic, new methods, or expensive items. Use traditional methods (pre-plastic) new  when applicable. Be succint, straightforward, and old-fashioned - like a grandpa explaining how things used to be done.`
      }),
    welcomeMessage: () =>
      "You're chatting with Mark-GPT",
    presetQuestions: [
      "How can I waterproof my clothing and gear without PFAS or plastic?",
      "How can I make my own soap?",
      "Do I even really need soap?",
      "What are the best wool sweaters for kids?"
    ],
    endpoint: "https://your-backend/pdf-chat",
    model: "gpt-3.5", // example
  },
  // You can add more modes here (e.g., "startupGPT", "gameGPT") in the same format.
};
