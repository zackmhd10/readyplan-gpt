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

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setPlan(data.result);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", direction: "rtl", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>ReadyPlan - إنشاء خطة مشروع بالذكاء الاصطناعي</h1>
      <textarea
        placeholder="اكتب وصف مشروعك هنا..."
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={generatePlan} disabled={loading} style={{ background: "#3b82f6", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px" }}>
        {loading ? "جاري الإنشاء..." : "أنشئ خطتي الآن"}
      </button>
      {plan && (
        <div style={{ whiteSpace: "pre-wrap", padding: "10px", marginTop: "20px", background: "#f0f0f0", textAlign: "right", borderRadius: "4px" }}>
          {plan}
        </div>
      )}
    </div>
  );
}
