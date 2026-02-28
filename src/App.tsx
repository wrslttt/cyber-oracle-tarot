import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Send, ChevronRight, Loader2 } from 'lucide-react';
import { MAJOR_ARCANA, TarotCard } from './constants';
import { generateTarotInterpretation, generateCardImage } from './services/gemini';

type AppState = 'INITIAL' | 'SELECTING' | 'REVEALING' | 'RESULT';

export default function App() {
  const [state, setState] = useState<AppState>('INITIAL');
  const [question, setQuestion] = useState('');
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [cardImages, setCardImages] = useState<Record<string, string>>({});
  const [interpretation, setInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);

  useEffect(() => {
    setShuffledDeck([...MAJOR_ARCANA].sort(() => Math.random() - 0.5));
  }, []);

  const handleStart = () => {
    if (question.trim()) {
      setState('SELECTING');
    }
  };

  const handleCardSelect = (index: number) => {
    if (selectedIndices.includes(index)) return;
    if (selectedIndices.length >= 3) return;

    const newIndices = [...selectedIndices, index];
    setSelectedIndices(newIndices);

    if (newIndices.length === 3) {
      const selectedCards = newIndices.map(i => shuffledDeck[i]);
      setCards(selectedCards);
      setTimeout(() => setState('REVEALING'), 500);
    }
  };

  const revealResults = useCallback(async () => {
    setIsLoading(true);
    try {
      // Generate images for selected cards
      const imagePromises = cards.map(card => generateCardImage(card.name));
      const images = await Promise.all(imagePromises);
      const imageMap: Record<string, string> = {};
      cards.forEach((card, i) => {
        imageMap[card.name] = images[i];
      });
      setCardImages(imageMap);

      // Generate interpretation
      const text = await generateTarotInterpretation(question, cards);
      setInterpretation(text || '无法生成解读，请重试。');
      setState('RESULT');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [cards, question]);

  useEffect(() => {
    if (state === 'REVEALING') {
      revealResults();
    }
  }, [state, revealResults]);

  const reset = () => {
    setState('INITIAL');
    setQuestion('');
    setSelectedIndices([]);
    setCards([]);
    setInterpretation('');
    setCardImages({});
    setShuffledDeck([...MAJOR_ARCANA].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8">
      <div className="atmosphere" />
      
      <AnimatePresence mode="wait">
        {state === 'INITIAL' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full glass-card p-8 text-center space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-serif italic neon-text text-orange-500">Cyber Oracle</h1>
              <p className="text-sm uppercase tracking-[0.3em] opacity-50 font-mono">Futuristic Tarot Divination</p>
            </div>

            <div className="relative group">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在此输入你的困惑或问题..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 h-40 focus:outline-none focus:border-orange-500/50 transition-all resize-none font-serif text-xl placeholder:opacity-30"
              />
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={handleStart}
                  disabled={!question.trim()}
                  className="bg-orange-600 hover:bg-orange-500 disabled:opacity-30 disabled:cursor-not-allowed text-white p-4 rounded-full transition-all shadow-lg shadow-orange-900/20 group-hover:scale-110"
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
            
            <p className="text-xs opacity-40 font-mono">
              静下心来，将你的意念集中在问题上。
            </p>
          </motion.div>
        )}

        {state === 'SELECTING' && (
          <motion.div
            key="selecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-6xl space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif italic text-orange-400">选择三张牌</h2>
              <p className="text-sm font-mono opacity-50">已选择: {selectedIndices.length} / 3</p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-2 md:gap-4">
              {shuffledDeck.map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardSelect(i)}
                  className={`aspect-[2/3] cursor-pointer rounded-lg transition-all ${
                    selectedIndices.includes(i) 
                    ? 'ring-2 ring-orange-500 opacity-50 scale-90' 
                    : 'card-back shadow-xl'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {state === 'REVEALING' && (
          <motion.div
            key="revealing"
            className="flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex gap-4 md:gap-8">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="w-32 md:w-48 aspect-[2/3] card-back rounded-xl flex items-center justify-center"
                >
                  <Loader2 className="animate-spin text-orange-500" size={32} />
                </motion.div>
              ))}
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-serif italic animate-pulse">正在连接星际神谕...</h3>
              <p className="text-sm font-mono opacity-50">正在生成卡面与解读</p>
            </div>
          </motion.div>
        )}

        {state === 'RESULT' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl space-y-12 pb-20"
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="group relative w-64 aspect-[3/4] glass-card overflow-hidden shadow-2xl shadow-orange-900/20"
                >
                  <img
                    src={cardImages[card.name]}
                    alt={card.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h4 className="text-2xl font-serif italic text-orange-400">{card.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 mt-1">{card.keywords.join(' · ')}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="glass-card p-8 md:p-12 space-y-6"
            >
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Sparkles className="text-orange-500" />
                <h3 className="text-2xl font-serif italic">神谕解读</h3>
              </div>
              
              <div className="prose prose-invert max-w-none font-serif text-lg leading-relaxed whitespace-pre-wrap opacity-90">
                {interpretation}
              </div>

              <div className="pt-8 flex justify-center">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full transition-all group"
                >
                  <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-mono text-sm uppercase tracking-widest">重新占卜</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
