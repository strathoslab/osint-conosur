import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  RefreshCw
} from 'lucide-react';
import { CountryCode } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'analyst';
  text: string;
  timestamp: string;
  sources?: string[];
}

interface AnalystCopilotProps {
  onAskAnalyst: (query: string, countryFilter?: CountryCode | 'ALL') => Promise<{ answer: string; sourcesUsed: string[] }>;
}

export const AnalystCopilot: React.FC<AnalystCopilotProps> = ({ onAskAnalyst }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'analyst',
      text: `Bienvenido a la terminal interactiva del Analista OSINT Cono Sur.
Estoy entrenado con la doctrina de análisis estratégico y los cables en tiempo real de **Argentina, Chile, Uruguay, Brasil, Paraguay y Bolivia**.

Puedes consultarme sobre:
• Dinámica y cuellos de botella en la **Hidrovía Paraná-Paraguay**
• Geopolítica y contratos del **Triángulo del Litio** (Uyuni, Atacama, Hombre Muerto)
• Integración logística del **Corredor Bioceánico Capricórnio**
• Seguridad fronteriza, crimen transnacional y narcotráfico (PCC / Frontera Seca)
• Matriz energética regional (**Vaca Muerta, Itaipú, Yacyretá, Gasbol**)

¿En qué área requieres una evaluación de inteligencia?`,
      timestamp: new Date().toISOString(),
      sources: ['Base de Datos OSINT Regional', 'Cables Oficiales Cono Sur']
    }
  ]);
  const [input, setInput] = useState('');
  const [countryFilter, setCountryFilter] = useState<CountryCode | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQueries = [
    '¿Cuál es la situación actual y los riesgos en la Hidrovía Paraná-Paraguay?',
    'Analizar el balance geoestratégico del Litio entre Chile, Bolivia y Argentina.',
    '¿Qué impacto tiene el avance del Corredor Bioceánico en los puertos chilenos vs brasileños?',
    'Resumen de amenazas de seguridad y crimen organizado en la Triple Frontera y Amambay.',
    '¿Cómo se proyecta la integración de gas de Vaca Muerta hacia Brasil a través de Bolivia?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const response = await onAskAnalyst(textToSend, countryFilter);
      const analystMsg: Message = {
        id: `analyst-${Date.now()}`,
        sender: 'analyst',
        text: response.answer,
        timestamp: new Date().toISOString(),
        sources: response.sourcesUsed,
      };
      setMessages((prev) => [...prev, analystMsg]);
    } catch (err) {
      console.error('Error asking analyst:', err);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        sender: 'analyst',
        text: 'Ocurrió un error al procesar la solicitud de inteligencia. Por favor reintente.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Copilot Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Analista Copilot OSINT // Cono Sur
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                GEMINI 3.7 FLASH
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Consultas estratégicas e inteligencia analítica con contexto regional en vivo
            </p>
          </div>
        </div>

        {/* Filter by country */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono">Foco de País:</span>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Todo el Cono Sur (Regional)</option>
            <option value="AR">🇦🇷 Argentina</option>
            <option value="CL">🇨🇱 Chile</option>
            <option value="BR">🇧🇷 Brasil</option>
            <option value="UY">🇺🇾 Uruguay</option>
            <option value="PY">🇵🇾 Paraguay</option>
            <option value="BO">🇧🇴 Bolivia</option>
          </select>
        </div>
      </div>

      {/* Suggested Quick Queries */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-mono text-slate-500 shrink-0 uppercase">Sugerencias:</span>
        {suggestedQueries.map((query, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(query)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 whitespace-nowrap text-xs transition disabled:opacity-50 font-sans cursor-pointer"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 min-h-[420px] max-h-[580px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-3xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-[0_0_15px_rgba(37,99,235,0.25)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              {/* Header inside message */}
              <div className="flex items-center justify-between text-[11px] font-mono pb-2 mb-2 border-b border-white/10 opacity-80">
                <span className="font-bold flex items-center gap-1">
                  {msg.sender === 'user' ? 'OFICIAL DE INTELIGENCIA' : 'ANALISTA PRINCIPAL OSINT'}
                </span>
                <span>{new Date(msg.timestamp).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              {/* Message Body */}
              <div className="whitespace-pre-wrap font-sans">
                {msg.text}
              </div>

              {/* Sources Citation */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-blue-400">
                  <span className="text-slate-500">FUENTES CONSULTADAS:</span>
                  {msg.sources.map((src, idx) => (
                    <span key={idx} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                      {src}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-none p-4 text-xs text-slate-400 flex items-center space-x-2.5">
              <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
              <span className="font-mono">Analizando cables y correlacionando inteligencia estratégica...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex items-center gap-2 shadow-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe una pregunta de inteligencia o solicita un análisis prospectivo..."
          disabled={isLoading}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-50 shadow-[0_0_10px_rgba(37,99,235,0.3)] cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
