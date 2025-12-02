import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components'
import { Trophy, Lock } from 'lucide-react'
import { motion } from 'motion/react'
import { useGamificationStore } from '@/store/gamification/useGamificationStore'

export function AchievementsGrid() {
  const { achievements: allAchievements, userAchievements } =
    useGamificationStore()
  const isUnlocked = (id: string) =>
    userAchievements.some((ua) => ua.achievement_id === id)

  return (
    <Card className='h-full dark:bg-zinc-900/50 dark:border-zinc-800'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 dark:text-zinc-100'>
          <Trophy className='w-5 h-5 text-yellow-500' />
          Achievements
          <Badge
            variant='secondary'
            className='ml-auto dark:bg-zinc-800 dark:text-zinc-300'>
            {userAchievements.length} / {allAchievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {allAchievements.map((achievement) => {
            const unlocked = isUnlocked(achievement.id)
            return (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border text-center flex flex-col items-center gap-2 transition-colors ${
                  unlocked
                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700/50'
                    : 'bg-gray-50 border-gray-100 opacity-70 grayscale dark:bg-zinc-800/50 dark:border-zinc-700'
                }`}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    unlocked
                      ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400'
                      : 'bg-gray-200 text-gray-400 dark:bg-zinc-700 dark:text-zinc-500'
                  }`}>
                  {unlocked ? (
                    <Trophy className='w-6 h-6' />
                  ) : (
                    <Lock className='w-6 h-6' />
                  )}
                </div>
                <div>
                  <p className='font-semibold text-sm text-gray-900 dark:text-zinc-100'>
                    {achievement.title}
                  </p>
                  <p className='text-xs text-gray-500 line-clamp-2 dark:text-zinc-400'>
                    {achievement.description}
                  </p>
                </div>
                {unlocked && (
                  <Badge
                    variant='outline'
                    className='mt-auto text-[10px] border-yellow-200 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700/50'>
                    +{achievement.xp_reward} XP
                  </Badge>
                )}
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
