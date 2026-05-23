export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key não configurada no servidor" });

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);

    // Converte formato Anthropic → Gemini
    const systemPrompt = body.system || "";
    const messages = body.messages || [];

    // Monta contents do Gemini a partir das mensagens
    const contents = messages.map(msg => {
      const parts = [];
      if (Array.isArray(msg.content)) {
        msg.content.forEach(c => {
          if (c.type === "text") {
            parts.push({ text: c.text });
          } else if (c.type === "image") {
            parts.push({
              inline_data: {
                mime_type: c.source.media_type,
                data: c.source.data
              }
            });
          }
        });
      } else if (typeof msg.content === "string") {
        parts.push({ text: msg.content });
      }
      return {
        role: msg.role === "assistant" ? "model" : "user",
        parts
      };
    });

    const geminiBody = {
      system_instruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
      contents,
      generationConfig: { temperature: 0.1, maxOutputTokens: 500 }
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", JSON.stringify(data));
      return res.status(response.status).json({ error: data.error?.message || "Erro na API Gemini" });
    }

    // Converte resposta Gemini → formato Anthropic (para o frontend não precisar mudar)
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const anthropicFormat = {
      content: [{ type: "text", text }]
    };

    return res.status(200).json(anthropicFormat);

  } catch (err) {
    console.error("Handler error:", err.message);
    return res.status(500).json({ error: "Erro interno: " + err.message });
  }
}
