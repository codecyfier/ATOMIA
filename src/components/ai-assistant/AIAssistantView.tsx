import React, { useState, useRef, useEffect } from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { Bot, Send, WifiOff, Sparkles, User, RefreshCw, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "Pourquoi la molécule d'eau est-elle coudée (104.5°) ?",
  "Explique simplement la règle de Klechkowski",
  "Comment calculer le pH d'un acide fort à 0.01 mol/L ?",
  "Quelle est la différence entre liaison covalente et ionique ?",
];

export const AIAssistantView: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Bonjour ! Je suis l'assistant pédagogique Atomia. Posez-moi vos questions de chimie : devoirs, mécanismes réactionnels, orbitales ou calculs, je vous guide pas à pas.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "Désolé, aucune réponse n'a pu être formulée.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "L'assistant n'a pas pu contacter le service. Vérifiez votre connexion internet.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Conversation réinitialisée. En quoi puis-je vous aider en chimie ?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col space-y-4 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            Assistant IA Chimie Atomia
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Tuteur interactif pour éclaircir vos notions, exercices et calculs.
          </p>
        </div>

        <button
          onClick={handleClear}
          className="p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
          title="Nouvelle conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Offline Notice (When disconnected) */}
      {!isOnline && (
        <div className="p-5 rounded-3xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3 shadow-lg">
          <WifiOff className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white">Assistant disponible avec internet</h4>
            <p className="text-slate-300 leading-relaxed">
              Vous êtes actuellement hors connexion. Seul l'assistant de conversation requiert internet.
            </p>
            <p className="text-cyan-300 font-medium">
              ✓ L'ensemble des 10 autres modules (Tableau périodique 118 éléments, Visualiseur 3D, Équilibreur, Laboratoire virtuel, Calculatrices, Cours et Quiz) fonctionnent parfaitement hors ligne !
            </p>
          </div>
        </div>
      )}

      {/* Suggested prompts carousel */}
      {messages.length <= 2 && isOnline && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs whitespace-nowrap transition cursor-pointer active:scale-95 min-h-[44px] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="bg-slate-950/80 rounded-3xl border border-slate-800 p-4 sm:p-6 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4 shadow-inner flex flex-col">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'flex-row-reverse self-end max-w-[85%]' : 'self-start max-w-[88%]'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                m.role === 'user'
                  ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 text-white'
                  : 'bg-slate-800 text-cyan-300 border border-slate-700'
              }`}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
              <span className="block text-[10px] opacity-60 font-mono mt-1.5 text-right">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900/60 p-3 rounded-2xl w-fit border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Atomia réfléchit à votre question chimique...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isOnline
              ? "Posez votre question (ex: Comment trouver la configuration du Fer ?)..."
              : "Assistant indisponible hors ligne..."
          }
          disabled={!isOnline || isLoading}
          className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition disabled:opacity-50 min-h-[48px]"
        />

        <button
          type="submit"
          disabled={!isOnline || !input.trim() || isLoading}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-cyan-500/25 active:scale-95 transition disabled:opacity-40 min-h-[48px] flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
