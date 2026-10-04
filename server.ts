import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// API Route for Chemistry Assistant
app.post('/api/assistant', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message requis.' });
    }

    if (!ai) {
      return res.json({
        reply: "Assistant Atomia : L'assistant est prêt ! Clé GEMINI_API_KEY non configurée pour le moment, mais vous pouvez tester vos requêtes de chimie ou utiliser l'ensemble des 10 autres modules hors ligne.",
      });
    }

    const systemInstruction = `Tu es Atomia AI, le tuteur pédagogique de chimie de l'application Atomia.
Tu t'adresses à des élèves du secondaire, des étudiants et des enseignants francophones.
Directives strictes :
1. Réponds toujours en français impeccable, concis, bienveillant et scientifique.
2. Utilise des formules chimiques bien formatées avec des indices si possible (H₂O, CO₂, mol/L, g/mol).
3. Explique les concepts étape par étape avec clarté.
4. Pour les exercices, favorise la maïeutique pédagogique : donne des indices et la méthode pas à pas.
5. Garde tes réponses courtes, synthétiques et percutantes (moins de 200 mots sauf si une démonstration complète est requise).`;

    const chatContents: any[] = [];
    if (Array.isArray(history)) {
      history.forEach((h: { role: string; content: string }) => {
        chatContents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        });
      });
    }

    chatContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: 1000,
      },
    });

    const reply = response.text || "Je n'ai pas pu formuler de réponse, veuillez reformuler votre question chimique.";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Erreur API Assistant :', error);
    return res.status(500).json({
      error: 'Erreur lors de la génération de réponse.',
      details: error.message,
    });
  }
});

// Dev vs Prod Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Atomia] Serveur démarré sur http://localhost:${PORT}`);
  });
}

startServer();
