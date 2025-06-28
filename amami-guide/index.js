require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'あなたは奄美大島の観光ガイドです。観光スポットや文化、食べ物などに詳しく、親しみやすく答えます。' },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 500,
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error('APIエラー:', error.message);
    res.status(500).json({ error: 'AIとの通信に失敗しました。' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動！ http://localhost:${PORT}`);
});
