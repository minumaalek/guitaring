"use client";

import { useState } from "react";
import Input from "@/components/common/input";
import { EllipsisVertical } from "lucide-react";

export default function AssistantPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("goal");
  const [goal, setGoal] = useState("");

  async function handleSend() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    setMessages((prev) => [...prev, trimmedMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skill_level: "beginner",
          budget: 4000,
          guitar_type: "electric",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to get recommendations.");
      }

      const productNames = data.products
        .map((product: { title: string }) => product.title)
        .join(", ");

      const reply = productNames
        ? `Here are some products you might like: ${productNames}`
        : "I couldn't find matching products within your budget.";

      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        "Sorry, I couldn't get recommendations right now. Please try again.",
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-[1fr_4fr] h-screen">
      <div className="bg-gray-100 h-full p-2 flex flex-col">
        <h2>Recent chats</h2>

        <div className="w-full">
          <div className="w-full border h-10 p-1 bg-blue-200 rounded flex items-center justify-between">
            <span>New chat</span>
            <EllipsisVertical />
          </div>
        </div>
      </div>

      <div className="bg-blue-100 h-full relative flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {messages.map((item, index) => (
            <div key={index} className="flex justify-end">
              <p className="bg-blue-600 text-white rounded-2xl px-4 py-2 max-w-[70%] break-words">
                {item}
              </p>
            </div>
          ))}
        </div>
        {step === "goal" && (
          <div className="flex flex-col items-start gap-3 p-6">
            <p>What are you looking for today?</p>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "Courses", value: "courses" },
                { label: "Products", value: "products" },
                { label: "Both", value: "both" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setGoal(option.value);

                    if (option.value === "courses" || option.value === "both") {
                      setStep("level");
                    } else {
                      setStep("guitar_type");
                    }
                  }}
                  className="rounded-xl border border-blue-600 px-4 py-2 hover:bg-blue-600 hover:text-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="p-4 flex items-center gap-2">
          <Input
            type="text"
            name="content"
            placeholder="What's in your mind?"
            className="flex-1 rounded-xl border"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="rounded-xl bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
