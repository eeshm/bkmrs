import React, { useState } from 'react';
import { Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: '/', label: 'Search' },
    { key: 'A', label: 'Add New' },
    { key: 'E', label: 'Edit Mode' },
    { key: 'D', label: 'Delete Mode' },
    { key: 'Esc', label: 'Close/Clear' },
  ];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-center p-1  transition-colors hover:bg-gray-100 dark:hover:bg-white/10 rounded-md"
        title="Keyboard Shortcuts"
      >
        <Keyboard className="size-5 sm:size-4 stroke-gray-600 dark:stroke-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white sm:bg-[#0a0a0a] border border-gray-200 sm:border-[#edecec]/10 rounded-xl shadow-xl z-50 p-2"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 sm:text-[#edecec]/40 mb-2 px-2 pt-1">
                Keyboard Shortcuts
              </div>
              <div className="space-y-0.5">
                {shortcuts.map((shortcut) => (
                  <div key={shortcut.label} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-50 sm:hover:bg-[#edecec]/5 transition-colors">
                    <span className="text-xs text-gray-700 sm:text-[#edecec]">{shortcut.label}</span>
                    <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-gray-100 sm:bg-[#edecec]/10 border border-gray-200 sm:border-transparent rounded text-gray-500 sm:text-[#edecec]/60 min-w-5 text-center">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
