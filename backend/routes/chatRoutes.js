// chatRoutes.js
const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();
const router = express.Router();

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // from backend/.env
});

// 1) Example /chat endpoint
router.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  try {
    // Real OpenAI call:
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 256,
    });

    const answer = response.data.choices[0].message.content;
    return res.send(answer);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error processing OpenAI request');
  }
});

// 2) Training Plan form submission => /api/plans
router.post('/plans', async (req, res) => {
  const {
    raceDistance,
    longestRun,
    weeklyFrequency,
    runTimesPerWeek,
    longRunDay,
    speedWork,
    hillTraining,
    raceDate,
  } = req.body;

  try {
    // Build a prompt for GPT
    const userPrompt = `
      You are a running coach. Based on these variables:
      - Target race distance: ${raceDistance} km
      - Current longest run: ${longestRun} km
      - Current weekly frequency: ${weeklyFrequency}
      - Available runs per week: ${runTimesPerWeek}
      - Preferred long run day: ${longRunDay}
      - Speed work included: ${speedWork}
      - Hill training included: ${hillTraining}
      - Race date: ${raceDate}
      
      Generate a concise, customized running plan.
    `;

    // Real OpenAI call for plan
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful running coach.' },
        { role: 'user', content: userPrompt },
      ],
      temperature: 1,
      max_tokens: 512,
    });

    const plan = response.data.choices[0].message.content;
    return res.json({ success: true, plan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Could not generate a training plan',
    });
  }
});

module.exports = router;
