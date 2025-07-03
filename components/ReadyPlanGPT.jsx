"use client";
import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const generatePlan = async () => {
    setLoading(true);
    const prompt = `
    أنشئ خطة مشروع بناءً على هذا الوصف: "${input}"

    يجب أن تحتوي الخطة على:
    1. ملخص تنفيذي
    2. الأهداف
    3. خطة العمل
    4. الجدول الزمني
    5. الموارد والميزانية
    6. تحليل المخاطر
    7. خاتمة

    اكتبها باللغة العربية وبأسلوب مهني واضح.
    `;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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-ضع_مفتاحك_هنا",
      },
      body: JSON.stringify({
        model: "openai/gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    setPlan(data.choices?.[0]?.message?.content || "لم يتم التوليد");
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center", fontSize: "24px" }}>
        ReadyPlan GPT - أنشئ خطة مشروعك بالذكاء الاصطناعي
      </h1>
      <textarea
        rows={5}
        placeholder="اكتب وصف مشروعك هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: 10, margin: "20px 0" }}
      />
      <button onClick={generatePlan} disabled={loading} style={{ padding: 10 }}>
        {loading ? "جاري الإنشاء..." : "أنشئ خطتي الآن"}
      </button>

      {plan && (
        <div style={{ whiteSpace: "pre-wrap", marginTop: 20, background: "#f9f9f9", padding: 15 }}>
          {plan}
        </div>
      )}
    </main>
  );
}
