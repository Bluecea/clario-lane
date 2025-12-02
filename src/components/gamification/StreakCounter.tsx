import { Card, CardContent } from '@/components'
import { Flame } from 'lucide-react'
import { motion } from 'motion/react'

interface StreakCounterProps {
  currentStreak: number
  longestStreak?: number
}

export function StreakCounter({
  currentStreak,
  longestStreak,
}: StreakCounterProps) {
  // Determine flame color based on streak length
  const getFlameColor = () => {
    if (currentStreak >= 30) return 'text-purple-500' // Epic streak
    if (currentStreak >= 7) return 'text-orange-500' // Hot streak
    if (currentStreak >= 3) return 'text-yellow-500' // Warming up
    return 'text-gray-400' // Just started
  }

  return (
    <Card className='bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-100 dark:from-orange-900/10 dark:to-yellow-900/10 dark:border-orange-900/30 dark:bg-zinc-900/50'>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <motion.div
              animate={{
                scale: currentStreak > 0 ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: currentStreak > 0 ? Infinity : 0,
                repeatDelay: 2,
              }}>
              <Flame className={`w-8 h-8 ${getFlameColor()}`} />
            </motion.div>
            <div>
              <div className='flex items-baseline gap-2'>
                <span className='text-3xl font-bold text-gray-900 dark:text-zinc-100'>
                  {currentStreak}
                </span>
                <span className='text-sm text-gray-600 dark:text-zinc-400'>
                  day streak
                </span>
              </div>
              {longestStreak !== undefined && longestStreak > currentStreak && (
                <p className='text-xs text-gray-500 mt-1 dark:text-zinc-500'>
                  Personal best: {longestStreak} days
                </p>
              )}
            </div>
          </div>
          <div className='text-right'>
            <p className='text-xs text-gray-600 font-medium dark:text-zinc-400'>
              {currentStreak === 0 && 'Start today!'}
              {currentStreak > 0 && currentStreak < 3 && 'Keep it up!'}
              {currentStreak >= 3 && currentStreak < 7 && 'On fire! 🔥'}
              {currentStreak >= 7 && currentStreak < 30 && 'Incredible! 🚀'}
              {currentStreak >= 30 && 'Legendary! 👑'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
