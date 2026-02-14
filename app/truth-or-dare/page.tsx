"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TruthOrDarePage() {

  // ✅ Truth Questions by Category
  const truthData = {
    Romantic: [
      "What was your first impression of me?",
      "What is your favorite memory with me?",
      "What makes you feel most loved?",
      "When did you realize you liked me?",
      "What do you love most about me?",
      "What is your dream date with me?",
      "When did you feel closest to me?",
      "What song reminds you of us?",
      "What do you imagine our future like?",
      "What makes our relationship special?"
    ],
    Fun: [
      "What is your weirdest habit?",
      "What is your funniest memory?",
      "What cartoon character are you like?",
      "What is your hidden talent?",
      "What is your guilty pleasure?",
      "What is your funniest childhood story?",
      "What food could you eat forever?",
      "What is your dream vacation?",
      "What makes you laugh instantly?",
      "What is your weird food combo?"
    ],
    Spicy: [
      "What is your biggest turn-on?",
      "Have you ever had a crush on my friend?",
      "What is your wildest fantasy?",
      "Have you ever lied to impress someone?",
      "What is something naughty you’ve thought about?",
      "Have you ever stalked someone online?",
      "What is your secret attraction?",
      "What is your boldest move in love?",
      "Have you ever sent a risky text?",
      "What is your hidden desire?"
    ]
  };

  // ✅ Dare Questions by Category
  const dareData = {
    Romantic: [
      "Say something romantic.",
      "Send me a love message.",
      "Call me and say you miss me.",
      "Write a short love poem.",
      "Send me 5 heart emojis.",
      "Send me a romantic song.",
      "Tell me why you love me.",
      "Send me your cutest selfie.",
      "Write me a sweet message.",
      "Send me a voice note saying I love you."
    ],
    Fun: [
      "Do a silly dance.",
      "Send a funny selfie.",
      "Sing a random song.",
      "Say tongue twister fast.",
      "Make a funny face selfie.",
      "Dance for 10 seconds.",
      "Send me a meme.",
      "Act like a cartoon character.",
      "Send a voice note laughing.",
      "Make a funny video."
    ],
    Spicy: [
      "Send a flirty text.",
      "Tell me your secret crush story.",
      "Send a bold selfie.",
      "Say something seductive.",
      "Send a spicy emoji combo.",
      "Whisper something naughty.",
      "Send a risky compliment.",
      "Say your biggest turn-on.",
      "Send a teasing voice note.",
      "Describe your dream romantic night."
    ]
  };

  const [mode, setMode] = useState<"truth" | "dare" | null>(null);
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState<"Romantic" | "Fun" | "Spicy">("Romantic");

  function getTruth() {
    const list = truthData[category];
    const random = list[Math.floor(Math.random() * list.length)];
    setMode("truth");
    setPrompt(random);
  }

  function getDare() {
    const list = dareData[category];
    const random = list[Math.floor(Math.random() * list.length)];
    setMode("dare");
    setPrompt(random);
  }

  function getCategoryButtonStyle(cat: string) {
    if (cat === category) return "bg-white text-pink-600";
    return "bg-white/30 text-white";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-purple-500 text-white p-6">

      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Truth or Dare 💕
      </motion.h1>

      {/* ✅ Category Selector */}
      <div className="flex gap-3 mb-6">
        {["Romantic", "Fun", "Spicy"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat as any)}
            className={`px-4 py-2 rounded-full font-semibold transition ${getCategoryButtonStyle(cat)}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Truth Dare Buttons */}
      <div className="flex gap-4 mb-8">
        <motion.button
          onClick={getTruth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-xl shadow-lg"
        >
          Truth
        </motion.button>

        <motion.button
          onClick={getDare}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg"
        >
          Dare
        </motion.button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        {prompt && (
          <motion.div
            key={prompt}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white text-black p-6 rounded-xl shadow-xl max-w-md text-center"
          >

            {/* Category Badge */}
            <div className="mb-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-600">
                {category}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-2">
              {mode === "truth" ? "Truth 💖" : "Dare 🔥"}
            </h2>

            <p>{prompt}</p>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
