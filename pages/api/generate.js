export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-or-xxxxx`, // أدخل مفتاح OpenRouter هنا
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

    const data = await completion.json();
    const result = data.choices?.[0]?.message?.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "حدث خطأ أثناء توليد الخطة." });
  }
}
