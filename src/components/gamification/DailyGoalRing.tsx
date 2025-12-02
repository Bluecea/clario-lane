import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { Target } from 'lucide-react'
import { motion } from 'motion/react'

interface DailyGoalRingProps {
  currentWords: number
  goalWords: number
}

export function DailyGoalRing({ currentWords, goalWords }: DailyGoalRingProps) {
  const progress = Math.min((currentWords / goalWords) * 100, 100)
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <Card className='dark:bg-zinc-900/50 dark:border-zinc-800'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg dark:text-zinc-100'>
          <Target className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
          Daily Goal
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <div className='relative w-32 h-32'>
          {/* Background circle */}
          <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
            <circle
              cx='50'
              cy='50'
              r='45'
              fill='none'
              stroke='#e5e7eb'
              strokeWidth='8'
              className='dark:stroke-zinc-700'
            />
            {/* Progress circle */}
            <motion.circle
              cx='50'
              cy='50'
              r='45'
              fill='none'
              stroke='url(#gradient)'
              strokeWidth='8'
              strokeLinecap='round'
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#6366f1' />
                <stop offset='100%' stopColor='#8b5cf6' />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-2xl font-bold text-gray-900 dark:text-zinc-100'>
              {Math.round(progress)}%
            </span>
            <span className='text-xs text-gray-500 dark:text-zinc-400'>
              complete
            </span>
          </div>
        </div>
        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600 dark:text-zinc-300'>
            {currentWords.toLocaleString()} / {goalWords.toLocaleString()} words
          </p>
          <p className='text-xs text-gray-500 mt-1 dark:text-zinc-400'>
            {goalWords - currentWords > 0
              ? `${(goalWords - currentWords).toLocaleString()} words to go!`
              : 'Goal achieved! 🎉'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
