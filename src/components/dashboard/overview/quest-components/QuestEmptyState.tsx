import { Card, CardContent } from '@/components'
import { Trophy } from 'lucide-react'

export function QuestEmptyState() {
  return (
    <Card className='bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-900 flex items-center justify-center'>
      <CardContent className='flex flex-col items-center justify-center py-12'>
        <Trophy className='w-16 h-16 text-indigo-300 dark:text-indigo-700 mb-4' />
        <p className='text-center text-gray-600 dark:text-gray-400 font-medium'>
          No active quests available
        </p>
        <p className='text-sm text-center text-gray-500 dark:text-gray-500 mt-2'>
          Check back tomorrow for new challenges!
        </p>
      </CardContent>
    </Card>
  )
}
