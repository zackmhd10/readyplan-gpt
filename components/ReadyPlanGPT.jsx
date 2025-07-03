import React, { useState } from "react";

export default function ReadyPlanGPT() {
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
      Authorization: "Bearer sk-or-xxxxxxxxxxxxxxxxxxxxxxxxx", // ضع المفتاح هنا
    },
    body: JSON.stringify({
      model: "openai/gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  setPlan(data.choices?.[0]?.message?.content || "⚠️ لم يتم التوليد.");
  setLoading(false);
};

  
