const OpenAI = require("openai");

const openai = new OpenAI();

const CaptionGenerator = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are caption generator assistant." },
      {
        role: "user",
        content: `Generate a captivating caption for the following post:${prompt}.
                    and the caption should be under 255 words only.`,
      },
    ],
    model: "gpt-3.5-turbo",
    // max_tokens: 30,
  });
  return completion.choices[0].message.content;
};

module.exports = {
  CaptionGenerator,
};
