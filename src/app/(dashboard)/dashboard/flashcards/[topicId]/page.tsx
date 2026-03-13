"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCcw, Eye, EyeOff } from "lucide-react";

const flashcardData = {
  subject: "Chemistry",
  topic: "Atomic Structure",
  cards: [
    { term: "Atom", definition: "The smallest part of an element that can exist. Made up of protons, neutrons, and electrons.", hint: "Think about the building blocks of matter" },
    { term: "Proton", definition: "A positively charged subatomic particle found in the nucleus. Relative mass of 1, relative charge of +1.", hint: "Found in the nucleus" },
    { term: "Neutron", definition: "A neutral subatomic particle found in the nucleus. Relative mass of 1, relative charge of 0.", hint: "No charge" },
    { term: "Electron", definition: "A negatively charged subatomic particle found in shells orbiting the nucleus. Relative mass of ~0, relative charge of -1.", hint: "Orbits the nucleus" },
    { term: "Atomic number", definition: "The number of protons in an atom. This defines which element it is. Also equals the number of electrons in a neutral atom.", hint: "Bottom number on periodic table" },
    { term: "Mass number", definition: "The total number of protons and neutrons in the nucleus of an atom.", hint: "Top number on periodic table" },
    { term: "Isotopes", definition: "Atoms of the same element with the same number of protons but different numbers of neutrons. They have the same atomic number but different mass numbers.", hint: "Same element, different mass" },
    { term: "Ion", definition: "A charged atom or group of atoms. Formed when atoms gain or lose electrons. Positive ions (cations) lose electrons, negative ions (anions) gain electrons.", hint: "Charged particle" },
  ],
};

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const card = flashcardData.cards[currentCard];
  const total = flashcardData.cards.length;

  function goNext() {
    if (currentCard < total - 1) {
      setCurrentCard((c) => c + 1);
      setFlipped(false);
      setShowHint(false);
    }
  }

  function goPrev() {
    if (currentCard > 0) {
      setCurrentCard((c) => c - 1);
      setFlipped(false);
      setShowHint(false);
    }
  }

  function markKnown() {
    setKnown((prev) => new Set([...prev, currentCard]));
    goNext();
  }

  function restart() {
    setCurrentCard(0);
    setFlipped(false);
    setShowHint(false);
    setKnown(new Set());
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{flashcardData.topic} Flashcards</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{flashcardData.subject}</p>
          </div>
          <Badge variant="secondary">
            {currentCard + 1} of {total}
          </Badge>
        </div>
        <Progress value={((currentCard + 1) / total) * 100} className="mt-4" />
        <p className="mt-2 text-xs text-zinc-400">
          {known.size} of {total} marked as known
        </p>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer"
      >
        <Card className="min-h-[280px] transition-all duration-300 hover:shadow-md">
          <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
            {!flipped ? (
              <>
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Term
                </p>
                <p className="mt-4 text-2xl font-bold">{card.term}</p>
                <p className="mt-6 text-sm text-zinc-400">Click to reveal definition</p>
              </>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Definition
                </p>
                <p className="mt-4 text-lg leading-relaxed">{card.definition}</p>
              </>
            )}
          </CardContent>
        </Card>
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
          {showHint && card.hint && (
            <p className="mt-2 text-sm italic text-zinc-500 dark:text-zinc-400">{card.hint}</p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={goPrev} disabled={currentCard === 0}>
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        <div className="flex gap-2">
          {flipped && (
            <>
              <Button variant="outline" size="sm" onClick={goNext}>
                Still learning
              </Button>
              <Button variant="success" size="sm" onClick={markKnown}>
                Got it!
              </Button>
            </>
          )}
        </div>

        <Button variant="outline" size="sm" onClick={goNext} disabled={currentCard >= total - 1}>
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Restart */}
      {currentCard === total - 1 && flipped && (
        <div className="mt-6 text-center">
          <Button variant="secondary" onClick={restart}>
            <RotateCcw className="h-4 w-4" /> Restart deck
          </Button>
        </div>
      )}
    </div>
  );
}
