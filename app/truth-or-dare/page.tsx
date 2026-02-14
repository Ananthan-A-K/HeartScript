"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TruthOrDarePage() {

  const truths = [
    "What was your first impression of me?",
    "What is your favorite memory with me?",
    "What makes you feel most loved?",
    "What is something you've never told me?",
    "When did you realize you liked me?",
    "What is your biggest fear in our relationship?",
    "What do you love most about me?",
    "What song reminds you of me?",
    "What is your biggest insecurity?",
    "Have you ever been jealous of someone in my life?",
    "What's your love language?",
    "What would you change about yourself for me?",
    "What's the sweetest thing I've done for you?",
    "Do you believe in soulmates?",
    "What's your biggest turn-on?",
    "Have you ever thought about our future together?",
    "What's something you find attractive about me?",
    "What would you do if I had to move away?",
    "What's your favorite thing about our relationship?",
    "Have you told your friends about us?",
    "What's the most vulnerable you've felt with me?",
    "What do you think I think about most?",
    "What's your ideal way to spend time together?",
    "Have you ever dreamed about me?",
    "What would make you happiest right now?",
    "What's something you're afraid to tell me?",
    "How do you see our relationship in 5 years?",
    "What's your biggest turn-off?",
    "Have you ever been unfaithful in a relationship?",
    "What's something you want me to know?",
    "What makes you feel safe with me?",
    "How do you feel when you see me?",
    "What's your favorite physical feature of mine?",
    "Have you ever lied to me?",
    "What's something you wish we did more of?",
    "What's your love language and why?",
    "Have you been in love before?",
    "What's the biggest sacrifice you'd make for me?",
    "What do you think about when you can't sleep?",
    "What's something I do that annoys you?",
    "How do you want to be loved?",
    "What's your biggest regret?",
    "Have you ever cheated?",
    "What does forever mean to you?",
    "What's something you're too shy to tell me?",
    "How do I make you feel?",
    "What's your biggest dream?",
    "Have you ever felt truly heartbroken?",
    "What would you do if you lost me tomorrow?",
    "What's something you want to experience with me?",
    "How do you feel about marriage?",
    "What's your biggest fear in life?",
    "Have you ever lied about your feelings?",
    "What makes you feel most connected to me?",
    "What's something you'd never tell anyone else?",
    "How do you want to be remembered?",
    "What's your biggest weakness?",
    "Have you ever been tempted to cheat?",
    "What would you change about me if you could?",
    "What's your biggest strength?",
    "How do you handle conflict?",
    "What's something you're proud of?",
    "Have you ever doubted our relationship?",
    "What makes you feel most secure with me?",
    "What's your favorite thing about your personality?",
    "How do you define true love?",
    "What's something you want to improve about yourself?",
    "Have you ever felt unloved by someone?",
    "What makes you feel appreciated?",
    "What's your biggest accomplishment?",
    "How do you want to grow together?",
    "What's something you regret not doing?",
    "Have you ever been envious of someone?",
    "What makes you feel most alive?",
    "What's your biggest limitation?",
    "How do you want to be celebrated?",
    "What's something you want to forgive yourself for?",
    "Have you ever hurt someone intentionally?",
    "What makes you feel most loved by me?",
    "What's your biggest goal in life?",
    "How do you see love?",
    "What's something you want to learn?",
    "Have you ever felt misunderstood by me?",
    "What makes you feel most confident?",
    "What's your biggest passion?",
    "How would you describe our love?",
    "What's something you want to experience?",
    "Have you ever felt lonely in a relationship?",
    "What makes you feel most accepted?",
    "What's your biggest desire?",
    "How do you handle stress?",
    "What's something you want to create?",
    "Have you ever felt abandoned?",
    "What makes you feel most beautiful?",
    "What's your biggest wish for us?",
    "How do you want to be supported?",
    "What's something you want to overcome?"
  ];

  const dares = [
    "Send me a cute selfie right now.",
    "Say something romantic.",
    "Give me a compliment.",
    "Call me and say you miss me.",
    "Send a heart emoji 10 times.",
    "Write a short love message.",
    "Blow a flying kiss.",
    "Say 'I love you' in a funny way.",
    "Text me a song lyric that describes us.",
    "Do a silly dance and send me a video.",
    "Sing your favorite song to me.",
    "Tell me your biggest turn-on.",
    "Describe your ideal date with me.",
    "Send me a voice message saying sweet things.",
    "Do 10 push-ups and take a photo.",
    "Wear something nice and send a pic.",
    "Tell me a secret about yourself.",
    "Send me your favorite childhood photo.",
    "Write a poem about me.",
    "Do an impression of someone famous.",
    "Call me just to hear my voice.",
    "Send me a list of reasons why you love me.",
    "Take a photo of us (or pretend) together.",
    "Describe your favorite thing about my personality.",
    "Send me a meme that makes you think of me.",
    "Do a handstand or cartwheel and send proof.",
    "Write me a short story where we're the main characters.",
    "Tell me something you've always wanted to say.",
    "Send me a candid photo of myself (from your phone).",
    "Compliment me in front of someone else.",
    "Make a TikTok with me.",
    "Tell me your biggest insecurity and why.",
    "Send me a photo of your smile.",
    "Do your best impression of me.",
    "Write down three things you find attractive about me.",
    "Call me and we have a 5-minute phone date.",
    "Send me a photo of your outfit right now.",
    "Tell me about your first crush.",
    "Do 20 jumping jacks and send a video.",
    "Create a pet name for me and use it for a day.",
    "Send me a selfie in natural lighting.",
    "Tell me about your biggest dream.",
    "Write me a love letter (any length).",
    "Do a lip sync to a romantic song.",
    "Send me a photo of your favorite place.",
    "Tell me something you admire about me.",
    "Recreate a favorite photo of us together.",
    "Send me a video of you cooking something.",
    "Tell me the first thing you noticed about me.",
    "Do a funny voice impression and send audio.",
    "Send me a photo of your most comfortable outfit.",
    "Tell me what you were thinking when we first met.",
    "Send me a photo of something that reminds you of me.",
    "Do a 30-second workout video for me.",
    "Tell me your favorite smell.",
    "Send me a photo of your bookshelf or hobby.",
    "Write down your love language.",
    "Do a fashion show with your clothes and send video.",
    "Tell me about your happiest memory with me.",
    "Send me a photo of your breakfast.",
    "Do impressions of different animals for me.",
    "Tell me what makes you feel confident.",
    "Send me a photo of you making a silly face.",
    "Tell me about your biggest pet peeve.",
    "Do a quick makeup or grooming routine on camera.",
    "Send me a photo of your workspace.",
    "Tell me something you're proud of.",
    "Write me a text message using only emojis.",
    "Do a cartwheel or backflip (or try).",
    "Send me a photo of your current mood.",
    "Tell me about your favorite childhood memory.",
    "Do a karaoke video to a love song.",
    "Send me a photo of something blue.",
    "Tell me what you'd do with $1 million.",
    "Write down three things you want to do with me.",
    "Do a 10-second video dancing to our song.",
    "Send me a photo of your workspace.",
    "Tell me about your ideal vacation.",
    "Do a video of you doing something you're bad at.",
    "Send me a photo of your pet (or favorite animal).",
    "Tell me what you'd miss most if we were apart.",
    "Write a haiku about our relationship.",
    "Do a slow-motion video of you winking.",
    "Send me a photo with your favorite filter.",
    "Tell me about a time you were really scared.",
    "Do a video giving yourself a compliment.",
    "Send me a photo of your most prized possession.",
    "Tell me what you love doing on weekends.",
    "Write me a message in Morse code or another format.",
    "Do a video of you laughing genuinely.",
    "Send me a photo of something that makes you happy.",
    "Tell me about your favorite place on Earth.",
    "Do a handwriting sample and send it to me.",
    "Send me a photo of your favorite outfit.",
    "Tell me what love means to you.",
    "Do a video of yourself giving dating advice.",
    "Send me a photo of your most recent achievement.",
    "Tell me something you never thought you'd do but did."
  ];

  const [mode, setMode] = useState<"truth" | "dare" | null>(null);
  const [prompt, setPrompt] = useState("");

  function getTruth() {
    const random = truths[Math.floor(Math.random() * truths.length)];
    setMode("truth");
    setPrompt(random);
  }

  function getDare() {
    const random = dares[Math.floor(Math.random() * dares.length)];
    setMode("dare");
    setPrompt(random);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-purple-500 text-white p-6">

      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Truth or Dare 💕
      </motion.h1>

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

      <AnimatePresence mode="wait">
        {prompt && (
          <motion.div
            key={prompt}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white text-black p-6 rounded-xl shadow-xl max-w-md text-center"
          >

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
