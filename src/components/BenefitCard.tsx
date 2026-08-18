import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function BenefitCard({ icon: Icon, title, description, index }: BenefitCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
      role="article"
      aria-label={`Benefit: ${title}`}
    >
      <div className="relative bg-white p-8 shadow-theme hover:shadow-theme-lg transition-all duration-500 border border-gray-200 hover:border-primary-500 overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-theme group-hover:shadow-theme-md transition-shadow duration-300"
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-bebas font-bold text-charcoal-950 mb-3 tracking-wide group-hover:text-primary-600 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary-500/10 blur-2xl"
        />
      </div>
    </motion.div>
  );
}
