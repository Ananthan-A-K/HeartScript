"use client";

import { useState, useRef } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail, MessageCircle, Heart, ArrowLeft, Send, Copy, Check } from "lucide-react";

export default function ValentineCardGenerator() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [showCopied, setShowCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [font, setFont] = useState("serif");
  const [showEmoji, setShowEmoji] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
  };

  const handleClearMessage = () => setMessage("");

  const createDownloadCard = () => {
    const themeGradients: Record<string, string> = {
      romantic: "linear-gradient(135deg,#ec4899,#f43f5e,#800020)",
      dark: "linear-gradient(135deg,#1f2937,#111827,#000)",
      pastel: "linear-gradient(135deg,#fbcfe8,#e9d5ff,#bfdbfe)",
    };

    const alignMap: Record<string,string> = {
      left:"flex-start",
      center:"center",
      right:"flex-end"
    };

    const textAlignMap: Record<string,string> = {
      left:"left",
      center:"center",
      right:"right"
    };

    const card = document.createElement("div");
    card.style.cssText = `
      position:fixed;
      left:-9999px;
      width:400px;
      height:500px;
      border-radius:16px;
      overflow:hidden;
      background:${themeGradients[theme]};
    `;

    card.innerHTML = `
      <div style="
        position:absolute;
        inset:0;
        display:flex;
        flex-direction:column;
        align-items:${alignMap[alignment]};
        justify-content:center;
        text-align:${textAlignMap[alignment]};
        color:white;
        padding:40px;
        font-family:'Playfair Display', serif;
      ">
        <div style="font-size:48px;margin-bottom:20px;">❤️</div>

        <h2 style="font-size:36px;font-weight:bold;margin-bottom:20px;">
          Dear <span style="font-style:italic;text-decoration:underline;">${recipient || "Someone Special"}</span>,
        </h2>

        <p style="font-size:16px;line-height:1.6;max-width:300px;margin-bottom:30px;font-family:${font};">
          ${message || "Your beautiful message will appear here..."}
        </p>

        <div style="font-style:italic;font-size:20px;">With Love ✨</div>
      </div>
    `;
    return card;
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 w-full max-w-6xl mx-auto">

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">

          <div className="flex flex-col gap-8">

            <div>
              <h1 className="font-display text-5xl font-bold text-gray-900 mb-3">
                Create Your<br/>Valentine Card
              </h1>
              <p className="text-gray-600">
                Craft a message straight from the heart.
              </p>
            </div>

            {/* Recipient */}
            <input
              autoFocus
              value={recipient}
              onChange={(e)=>setRecipient(e.target.value)}
              placeholder="Recipient Name"
              className="px-4 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
            />

            {/* Message */}
            <div className="relative">

              <textarea
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                placeholder="Personal Message"
                maxLength={500}
                rows={5}
                className="px-4 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none resize-none"
              />

              {/* Emoji Button */}
              <button
                type="button"
                onClick={()=>setShowEmoji(!showEmoji)}
                className="absolute bottom-3 right-3 text-xl"
              >
                😊
              </button>

              {showEmoji && (
                <div className="absolute z-50 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg p-2 shadow-lg">
                  <div className="grid grid-cols-6 gap-1">
                    {['❤️','😍','💕','💖','💗','💓','💞','💘','💝','🥰','😘','💋','🌹','🌷','💐','🌸','✨','🎁','💍','🎀','💌'].map((emoji)=>(
                      <button
                        key={emoji}
                        type="button"
                        onClick={()=>{ setMessage(prev => prev + emoji); setShowEmoji(false); }}
                        className="text-2xl hover:bg-gray-100 rounded p-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {message && (
                <button
                  onClick={handleClearMessage}
                  className="mt-2 text-sm text-[#800020] hover:text-[#630019] font-semibold"
                >
                  ❤️ Clear Message
                </button>
              )}

              <div className="text-right text-xs text-gray-400 mt-1">
                {message.length} / 500 characters
              </div>
            </div>

            {/* Theme */}
            <select
              value={theme}
              onChange={(e)=>setTheme(e.target.value)}
              className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
            >
              <option value="romantic">Romantic</option>
              <option value="dark">Dark Love</option>
              <option value="pastel">Pastel Dream</option>
            </select>

            {/* Handwriting Toggle */}
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <input
                type="checkbox"
                checked={font !== "serif"}
                onChange={(e)=> setFont(e.target.checked ? "'Dancing Script', cursive" : "serif")}
              />
              Handwriting Mode ✍️
            </label>

            {/* Font Selector */}
            <select
              value={font}
              onChange={(e)=>setFont(e.target.value)}
              className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
            >
              <option value="serif">Classic</option>
              <option value="'Great Vibes', cursive">Elegant Handwriting</option>
              <option value="'Dancing Script', cursive">Cute Handwriting</option>
              <option value="'Pacifico', cursive">Fun Handwriting</option>
            </select>

            {/* Alignment */}
            <div className="flex gap-3">
              {["left","center","right"].map((align)=>(
                <button
                  key={align}
                  onClick={()=>setAlignment(align as "left" | "center" | "right")}
                  className={`flex-1 py-3 rounded-lg border font-semibold capitalize transition
                  ${alignment===align
                    ? "bg-[#800020] text-white border-[#800020]"
                    : "bg-white border-gray-300 text-gray-600 hover:border-[#800020]"}`}
                >
                  {align}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 rounded-xl"
              >
                Reset
              </button>

              <button 
                onClick={() => setStep(2)}
                disabled={!recipient || !message}
                className="flex-1 bg-[#800020] hover:bg-[#630019] text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Preview →
              </button>
            </div>

          </div>

          <CardPreview
            recipient={recipient}
            message={message}
            theme={theme}
            alignment={alignment}
            font={font}
          />
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="w-full max-w-4xl">

          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">

              <div className={`absolute inset-0 ${
                theme === 'romantic' ? 'bg-gradient-to-br from-[#ec4899] via-[#f43f5e] to-[#800020]' :
                theme === 'dark' ? 'bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#000000]' :
                'bg-gradient-to-br from-[#fbcfe8] via-[#e9d5ff] to-[#bfdbfe]'
              }`} />

              <div className={`absolute inset-0 flex flex-col justify-center text-white px-10 py-12 ${
                alignment === 'left' ? 'text-left items-start' :
                alignment === 'right' ? 'text-right items-end' :
                'text-center items-center'
              }`}>
                <div className="mb-6 text-4xl">❤️</div>

                <h2 className="font-serif text-4xl font-bold mb-6">
                  Dear <span className="italic underline">{recipient}</span>,
                </h2>

                <p style={{ fontFamily: font }} className="text-lg leading-relaxed max-w-sm mb-8">
                  {message}
                </p>

                <div className="italic text-xl">With Love ✨</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
