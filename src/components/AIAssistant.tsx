import React, { useState } from 'react';
import type { ChatMessage } from '../types';
import { Bot, Send, User, RefreshCw } from 'lucide-react';

interface AIAssistantProps {
  onOpenSubscription?: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Why are the leaves on my money plant turning yellow?',
      timestamp: '10:42 AM',
    },
    {
      id: '2',
      sender: 'ai',
      text: "Yellow leaves can be caused by overwatering, poor drainage, or insufficient light. Let's check a few things about your plant: \n\n1. Feel the top 2 inches of soil — is it soggy or dry?\n2. Does your pot have drainage holes at the bottom?\n3. Is your plant receiving bright indirect light or stuck in a dark corner?",
      timestamp: '10:42 AM',
      category: 'Watering & Light Balance',
      actionPills: ['💧 Check Moisture', '☀️ Light Guide', '🪴 Repotting Steps'],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickTopics = [
    { label: '💧 Watering', query: 'How often should I water my indoor tropical plants in summer?' },
    { label: '☀️ Sunlight', query: 'What is the difference between direct and bright indirect light?' },
    { label: '🌱 Soil', query: 'What is the ideal soil mix recipe for Monstera and Philodendrons?' },
    { label: '🪴 Repotting', query: 'How do I know when my plant is rootbound and needs a bigger pot?' },
    { label: '🐛 Pests', query: 'How do I naturally get rid of spider mites and fungus gnats?' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "Based on your plant's query, I recommend checking root hydration and lighting conditions. Would you like me to generate a custom 7-day care calendar for your plant?";
      let pills = ['📅 Create Care Schedule', '🩺 Doctor Consultation'];

      const lower = text.toLowerCase();
      if (lower.includes('water') || lower.includes('summer')) {
        aiText = "Most houseplants prefer deep watering until liquid drains from the bottom, then letting the top 1-2 inches dry out. In summer, increase frequency by 30% due to active growth!";
        pills = ['💧 Soil Moisture Check', '☀️ Summer Humidity Tips'];
      } else if (lower.includes('light') || lower.includes('indirect')) {
        aiText = "Bright indirect light means bright enough to read a book without direct sun rays scorching leaf tips. Place your plant 3-5 feet away from a south or east window!";
        pills = ['☀️ Meter Light Level', '🌿 Leaf Cleaning Tip'];
      } else if (lower.includes('soil') || lower.includes('monstera')) {
        aiText = "For tropicals like Monstera: blend 40% indoor potting soil, 30% coarse orchid bark, 20% perlite, and 10% worm castings for aerated, chunkier drainage!";
        pills = ['🌱 Chunky Soil Recipe', '🪴 Drainage Hole Guide'];
      } else if (lower.includes('pest') || lower.includes('mite') || lower.includes('gnat')) {
        aiText = "For pests: spray foliage with 1 tsp organic cold-pressed neem oil + 1/2 tsp mild liquid soap diluted in 1 quart warm water. Repeat every 5 days for 3 cycles.";
        pills = ['🐛 Neem Spray Recipe', '🔍 Pest Identification'];
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPills: pills,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <section id="ai-assistant" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
            <Bot className="w-4 h-4 text-[#3A7D44]" />
            <span>24/7 Intelligent Botanical Guidance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#132E1E]">
            Meet your <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">AI Plant Assistant</span>
          </h2>

          <p className="text-base text-[#132E1E]/75 max-w-xl mx-auto">
            From watering schedules to yellow leaves, nutrition, sunlight, pests, and everyday plant problems — ask GreenCare anything.
          </p>
        </div>

        {/* Chat Card Window */}
        <div className="max-w-4xl mx-auto card-organic bg-white p-4 sm:p-8 border border-[#132E1E]/10 shadow-2xl space-y-6">
          
          {/* Top Bar inside Chat */}
          <div className="flex items-center justify-between pb-4 border-b border-[#132E1E]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#132E1E] text-[#A3B18A] flex items-center justify-center shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#132E1E] flex items-center gap-2">
                  <span>GreenCare AI Specialist</span>
                  <span className="w-2 h-2 rounded-full bg-[#3A7D44]" />
                </h3>
                <p className="text-xs text-[#132E1E]/60">Trained on 50,000+ peer-reviewed botanical studies</p>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages(messages.slice(0, 2));
              }}
              className="p-2 rounded-xl text-[#132E1E]/50 hover:text-[#132E1E] hover:bg-[#132E1E]/5 text-xs flex items-center gap-1 transition-colors"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>

          {/* Messages Feed Area */}
          <div className="space-y-6 min-h-[320px] max-h-[480px] overflow-y-auto pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#132E1E] text-[#FAF8F5] rounded-tr-none shadow-sm'
                      : 'bg-[#F4F1EA] text-[#132E1E] rounded-tl-none border border-[#132E1E]/5'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Action Pills */}
                  {msg.actionPills && msg.actionPills.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {msg.actionPills.map((pill, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(pill)}
                          className="px-3 py-1 rounded-full bg-white text-[#132E1E] text-xs font-semibold hover:bg-[#2D6A4F] hover:text-white transition-all shadow-2xs border border-[#132E1E]/10"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block text-[10px] text-right mt-1 ${
                      msg.sender === 'user' ? 'text-[#FAF8F5]/60' : 'text-[#132E1E]/50'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#A3B18A]/30 text-[#132E1E] flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-xs text-[#132E1E]/60 italic">
                <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <span>GreenCare AI is typing...</span>
              </div>
            )}
          </div>

          {/* Quick Plant Suggestion Pills */}
          <div className="pt-2 border-t border-[#132E1E]/10 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
              Quick Botanical Queries
            </div>
            <div className="flex flex-wrap gap-2">
              {quickTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.query)}
                  className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#132E1E] hover:text-white border border-[#132E1E]/10 text-xs font-semibold text-[#132E1E] transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3 pt-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about your plants (e.g. why is my monstera drooping?)"
              className="flex-1 px-5 py-3.5 rounded-full bg-[#FAF8F5] border border-[#132E1E]/15 text-sm text-[#132E1E] placeholder-[#132E1E]/40 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all flex items-center gap-2 shadow-sm shrink-0"
            >
              <span>Ask AI</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
