'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const codeSnippets = [
  'const ai = new Model()',
  'pipeline.transform()',
  'async function deploy()',
  'return optimize(data)',
  '// Building AI solutions',
  'model.train(dataset)',
  'export default Agent',
  'if (production) {...}',
  'npm run build',
  'git commit -m "feat"',
  'docker-compose up',
  'kubectl apply -f',
  'SELECT * FROM users',
  'def predict(x): ...',
  'class Pipeline:',
  'import tensorflow as tf',
]

interface CodeSnippet {
  text: string
  x: string
  y: string
  delay: number
  duration: number
  fontSize: number
}

const generateCodeSnippets = (count: number): CodeSnippet[] => {
  return Array.from({ length: count }, (_, i) => ({
    text: codeSnippets[i % codeSnippets.length],
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 15,
    fontSize: 10 + Math.random() * 4,
  }))
}

export function CodeSnippets() {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [snippets] = useState(() => generateCodeSnippets(12))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || prefersReducedMotion) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute font-mono whitespace-nowrap"
          initial={{
            left: snippet.x,
            top: snippet.y,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            left: [
              snippet.x,
              `${parseFloat(snippet.x) + (Math.random() - 0.5) * 40}%`,
              snippet.x,
            ],
            top: [
              snippet.y,
              `${parseFloat(snippet.y) + (Math.random() - 0.5) * 40}%`,
              snippet.y,
            ],
            opacity: [0, 0.04, 0.04, 0],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{
            duration: snippet.duration,
            delay: snippet.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: `${snippet.fontSize}px`,
            color: 'rgba(6, 182, 212, 0.3)',
            textShadow: '0 0 10px rgba(6, 182, 212, 0.2)',
          }}
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  )
}
