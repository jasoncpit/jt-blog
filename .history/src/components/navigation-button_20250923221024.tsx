import React, { useState } from 'react'; 
import { ArrowUpRight, Eye } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  text: string;
  href: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  className?: string;
  icon?: React.ReactNode;
}

const NavigationButton = ({
  href,
  text = 'Open',
  icon = undefined,
  target = '_blank',
  className = ''
}: ButtonProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex items-start">
      <a
        href={href}
        target={target}
        className={cn(
          'flex items-center gap-1 outline-none cursor-pointer text-zinc-400 hover:text-blue-400 font-semibold shadow-sm py-2 px-4 hover:brightness-125 active:brightness-105 transition-opacity duration-100 rounded-lg no-underline',
          className
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {!hovered && (
            <motion.div
              key={'eye-btn' + href}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ ease: 'linear', duration: 0.1 }}
            >
              {icon ? icon : <Eye size={14} />}
            </motion.div>
          )}
          <motion.p
            layout
            transition={{ duration: 0.1, ease: 'linear' }}
            className="text-xs sm:text-sm whitespace-nowrap"
          >
            {text}
          </motion.p>
          {hovered && (
            <motion.div
              key={'arrow-btn' + href}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ ease: 'linear', duration: 0.1 }}
            >
              <ArrowUpRight size={14} />
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </div>
  );
};

export default NavigationButton;
