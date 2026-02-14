"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";

export default function ValentineCardGenerator() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    setRecipient("");
    setMessage("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* Input Section */}
      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium">
            Recipient Name
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient name"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
  <label className="block text-sm font-medium">
    Personal Message
  </label>

  <textarea
    value={message}
    onChange={(e) => {
      if (e.target.value.length <= 500) {
        setMessage(e.target.value);
      }
    }}
    placeholder="Write your message"
    className="w-full border rounded p-2"
  />

  {/* Character Counter */}
  <div className="text-sm text-gray-500 mt-1 text-right">
    {message.length} / 500 characters
  </div>
</div>


      </div>

      <button
        onClick={handleReset}
        className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded"
      >
        Clear Form
      </button>

      <CardPreview
        recipient={recipient}
        message={message}
      />

    </div>
  );
}
