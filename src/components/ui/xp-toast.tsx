"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface XPToastProps {
  amount: number;
  message: string;
  show: boolean;
  onClose: () => void;
}

export function XPToast({ amount, message, show, onClose }: XPToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 px-5 py-3 shadow-lg dark:border-amber-700 dark:from-amber-950/80 dark:to-yellow-950/80"
        >
          <motion.div
            initial={{ rotate: -20 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-white"
          >
            <Zap className="h-5 w-5" />
          </motion.div>
          <div>
            <motion.p
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className="text-lg font-bold text-amber-700 dark:text-amber-300"
            >
              +{amount} XP
            </motion.p>
            <p className="text-xs text-amber-600 dark:text-amber-400">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
