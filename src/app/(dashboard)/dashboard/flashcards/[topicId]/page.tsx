"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { XPToast } from "@/components/ui/xp-toast";
import { useConfetti } from "@/components/ui/confetti";
import { ChevronLeft, ChevronRight, RotateCcw, Eye, EyeOff, Zap, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { XP_REWARDS } from "@/lib/gamification";

const flashcardData = {
  subject: "Chemistry",
  topic: "Atomic Structure",
  cards: [
    { term: "Atom", definition: "The smallest part of an element that can exist. Made up of protons, neutrons, and electrons.", hint: "Building blocks of matter" },
    { term: "Proton", definition: "A positively charged subatomic particle found in the nucleus. Relative mass of 1, relative charge of +1.", hint: "Found in the nucleus, positive" },
    { term: "Neutron", definition: "A neutral subatomic particle found in the nucleus. Relative mass of 1, relative charge of 0.", hint: "No charge, in the nucleus" },
    { term: "Electron", definition: "A negatively charged subatomic particle found in shells orbiting the nucleus. Relative mass of ~0, relative charge of -1.", hint: "Orbits the nucleus" },
    { term: "Atomic number", definition: "The number of protons in an atom. This defines which element it is. Also equals the number of electrons in a neutral atom.", hint: "Bottom number on periodic table" },
    { term: "Mass number", definition: "The total number of protons and neutrons in the nucleus of an atom.", hint: "Top number on periodic table" },
    { term: "Isotopes", definition: "Atoms of the same element with the same number of protons but different numbers of neutrons.", hint: "Same element, different mass" },
    { term: "Ion", definition: "A charged atom or group of atoms formed when atoms gain or lose electrons.", hint: "Charged particle" },
  ],
};

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [needsWork, setNeedsWork] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const { fireConfetti, fireSides } = useConfetti();

  const card = flashcardData.cards[currentCard];
  const total = flashcardData.cards.length;

  function goNext() {
    if (currentCard < total - 1) {
      setCurrentCard((c) => c + 1);
      setFlipped(false);
      setShowHint(false);
    } else {
      setFinished(true);
      setShowXP(true);
      if (known.size > needsWork.size) {
        fireSides();
      }
    }
  }

  function markKnown() {
    setKnown((prev) => new Set([...prev, currentCard]));
    fireConfetti();
    goNext();
  }

  function markNeedsWork() {
    setNeedsWork((prev) => new Set([...prev, currentCard]));
    goNext();
  }

  function restart() {
    setCurrentCard(0);
    setFlipped(false);
    setShowHint(false);
    setKnown(new Set());
    setNeedsWork(new Set());
    setFinished(false);
    setShowXP(false);
  }

  if (finished) {
    const knownCount = known.size;
    const percentage = Math.round((knownCount / total) * 100);

    return (
      <div className="mx-auto max-w-2xl">
        <XPToast
          amount={XP_REWARDS.COMPLETE_FLASHCARDS}
          message="Flashcard deck completed!"
          show={showXP}
          onClose={() => setShowXP(false)}
        />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center dark:from-indigo-950/30 dark:to-purple-950/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Trophy className="mx-auto h-12 w-12 text-indigo-500" />
              </motion.div>
              <h2 className="mt-4 text-2xl font-bold">Deck Complete!</h2>
              <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                {flashcardData.subject} - {flashcardData.topic}
              </p>

              <div className="mt-6 flex justify-center gap-8">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-3xl font-bold">{knownCount}</span>
                  </div>
                  <p className="text-xs text-zinc-500">Got it</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-amber-500">
                    <XCircle className="h-5 w-5" />
                    <span className="text-3xl font-bold">{needsWork.size}</span>
                  </div>
                  <p className="text-xs text-zinc-500">Still learning</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 dark:bg-amber-900/50"
              >
                <Zap className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                  +{XP_REWARDS.COMPLETE_FLASHCARDS} XP earned
                </span>
              </motion.div>

              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" onClick={restart}>
                  <RotateCcw className="h-4 w-4" /> Go again
                </Button>
                <Button onClick={() => window.history.back()}>
                  Back to dashboard
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{flashcardData.topic}</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{flashcardData.subject}</p>
          </div>
          <Badge variant="secondary">{currentCard + 1} of {total}</Badge>
        </div>
        <Progress value={((currentCard + 1) / total) * 100} className="mt-4" />
        <div className="mt-2 flex gap-4 text-xs text-zinc-400">
          <span className="text-emerald-500">{known.size} known</span>
          <span className="text-amber-500">{needsWork.size} learning</span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000" onClick={() => setFlipped(!flipped)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCard}-${flipped}`}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="min-h-[280px] cursor-pointer transition-shadow hover:shadow-lg">
              <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
                {!flipped ? (
                  <>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-semibold uppercase tracking-widest text-indigo-500"
                    >
                      Term
                    </motion.span>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mt-4 text-3xl font-bold"
                    >
                      {card.term}
                    </motion.p>
                    <p className="mt-8 text-sm text-zinc-300 dark:text-zinc-600">
                      Tap to reveal definition
                    </p>
                  </>
                ) : (
                  <>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-semibold uppercase tracking-widest text-emerald-500"
                    >
                      Definition
                    </motion.span>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mt-4 text-lg leading-relaxed"
                    >
                      {card.definition}
                    </motion.p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hint */}
      {!flipped && (
        <div className="mt-3 text-center">
          <button
            onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
            className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {showHint ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {showHint ? "Hide hint" : "Show hint"}
          </button>
          <AnimatePresence>
            {showHint && card.hint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm italic text-zinc-500 dark:text-zinc-400"
              >
                {card.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {flipped ? (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={(e) => { e.stopPropagation(); markNeedsWork(); }}
                className="border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400"
              >
                <XCircle className="h-4 w-4" /> Still learning
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="success"
                size="lg"
                onClick={(e) => { e.stopPropagation(); markKnown(); }}
              >
                <CheckCircle2 className="h-4 w-4" /> Got it!
              </Button>
            </motion.div>
          </>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.stopPropagation(); if (currentCard > 0) { setCurrentCard(c => c - 1); setFlipped(false); setShowHint(false); }}}
              disabled={currentCard === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
            >
              Flip card
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.stopPropagation(); if (currentCard < total - 1) { setCurrentCard(c => c + 1); setFlipped(false); setShowHint(false); }}}
              disabled={currentCard >= total - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
