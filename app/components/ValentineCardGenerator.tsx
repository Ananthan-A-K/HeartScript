"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";
import {
  Download,
  FileText,
  Mail,
  Heart,
  ArrowLeft,
  Send,
  Copy,
  Check
} from "lucide-react";

const loveQuotes: string[] = [
  "You are my today and all of my tomorrows ❤️",
  "Every love story is beautiful, but ours is my favorite 💕",
  "You make my heart smile 😊",
  "With you, every moment is magical ✨",
  "I fall for you more and more every day 💖",
  "You are the best thing that ever happened to me 💘"
];

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

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
  };

  const handleClearMessage = () => setMessage("");

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setMessage(loveQuotes[randomIndex]);
  };

  /* ---------------- SHARE LINK FUNCTION ---------------- */

  const generateShareLink = () => {
    const params = new URLSearchParams({
      to: recipient,
      msg: message,
      theme,
      align: alignment,
      font
    });

    return `${window.location.origin}/card/view?${params.toString()}`;
  };

  const handleCopyLink = async () => {
    try {
      const link = generateShareLink();
      await navigator.clipboard.writeText(link);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      alert("Failed to copy link");
    }
  };

  /* ---------------- DOWNLOAD CARD IMAGE ---------------- */

  const createDownloadCard = () => {
    const themeGradients: Record<string, string> = {
      romantic: "linear-gradient(135deg,#ec4899,#f43f5e,#800020)",
      dark: "linear-gradient(135deg,#1f2937,#111827,#000)",
      pastel: "linear-gradient(135deg,#fbcfe8,#e9d5ff,#bfdbfe)"
    };

    const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
    const textAlignMap = { left: "left", center: "center", right: "right" };

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

  const handleDownloadImage = async () => {
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;
      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);
      const canvas = await html2canvas(downloadCard, { scale: 2 });
      document.body.removeChild(downloadCard);
      const imageData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "valentine-card.png";
      link.href = imageData;
      link.click();
    } catch {
      alert("Download failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);
      const canvas = await html2canvas(downloadCard, { scale: 2 });
      document.body.removeChild(downloadCard);

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [400, 500] });

      pdf.addImage(imageData, "PNG", 0, 0, 400, 500);
      pdf.save("valentine-card.pdf");
    } catch {
      alert("PDF download failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="flex flex-col items-center px-4 py-8 w-full max-w-6xl mx-auto min-h-screen">

      {/* STEP 1 */}
      {step === 1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full items-start">

          <div className="flex flex-col gap-6">

            <input
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="Recipient Name"
              className="px-4 py-4 border-2 rounded-lg"
            />

            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Personal Message"
              rows={5}
              className="px-4 py-4 border-2 rounded-lg resize-none"
            />

            <button
              type="button"
              onClick={generateRandomQuote}
              className="px-4 py-2 bg-[#800020] text-white rounded-lg"
            >
              💌 Generate Random Love Quote
            </button>

            <button
              disabled={!recipient || !message}
              onClick={() => setStep(2)}
              className="py-4 bg-[#800020] text-white rounded-xl disabled:opacity-50"
            >
              Continue →
            </button>
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
        <div className="text-center">

          <CardPreview
            recipient={recipient}
            message={message}
            theme={theme}
            alignment={alignment}
            font={font}
          />

          <div className="flex flex-wrap gap-4 justify-center mt-6">

            <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-200 rounded-xl">
              <ArrowLeft className="inline mr-2" /> Edit
            </button>

            <button onClick={handleDownloadImage} className="px-6 py-3 border rounded-xl">
              <Download className="inline mr-2" /> Image
            </button>

            <button onClick={handleDownloadPDF} className="px-6 py-3 border rounded-xl">
              <FileText className="inline mr-2" /> PDF
            </button>

            <button onClick={() => setStep(3)} className="px-6 py-3 bg-[#800020] text-white rounded-xl">
              Send <Send className="inline ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="text-center">

          <Heart className="w-12 h-12 text-[#800020] mx-auto mb-6 animate-pulse" />

          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={handleCopyLink}
              className="p-6 border rounded-xl"
            >
              {showCopied ? <Check /> : <Copy />}
              <div className="mt-2 font-semibold">
                {showCopied ? "Copied!" : "Copy Share Link"}
              </div>
            </button>

            <button
              onClick={handleDownloadImage}
              className="p-6 border rounded-xl"
            >
              <Download />
              <div className="mt-2 font-semibold">Download</div>
            </button>

          </div>

          <button
            onClick={() => setStep(2)}
            className="mt-6 px-6 py-3 bg-gray-200 rounded-xl"
          >
            Back
          </button>
        </div>
      )}
    </main>
  );
}
