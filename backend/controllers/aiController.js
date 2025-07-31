const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.askAI = async (req, res) => {
  const { question } = req.body;
  const isCheating = detectCheating(question);

  if (isCheating) {
    return res.status(403).json({ message: "Question flagged as test-related." });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: question }],
  });

  res.json({ answer: completion.choices[0].message.content });
};

function detectCheating(question) {
  const keywords = ["exam", "quiz", "test", "solve for x"];
  return keywords.some(keyword => question.toLowerCase().includes(keyword));
}
