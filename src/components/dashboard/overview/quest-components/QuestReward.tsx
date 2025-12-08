import { Zap } from 'lucide-react'

type QuestRewardProps = {
  xpReward: number
  isCompleted: boolean
  isClaimed: boolean
  onClaim?: () => void
}

export function QuestReward({
  xpReward,
  isCompleted,
  isClaimed,
  onClaim,
}: QuestRewardProps) {
  return (
    <div className='flex items-center justify-between pt-3 dark:border-gray-700'>
      <div className='flex items-center gap-2'>
        <Zap className='w-4 h-4 text-amber-500' />
        <span className='text-sm font-bold text-amber-600 dark:text-amber-400'>
          +{xpReward} XP
        </span>
      </div>

      {isCompleted && !isClaimed && (
        <button
          onClick={onClaim}
          className='px-3 py-1 text-xs font-semibold bg-linear-to-r from-yellow-400 to-amber-500 text-white rounded-full hover:from-yellow-500 hover:to-amber-600 transition-all shadow-md hover:shadow-lg'>
          Claim Reward
        </button>
      )}

      {isClaimed && (
        <span className='text-xs font-medium text-green-600 dark:text-green-400'>
          Claimed ✓
        </span>
      )}
    </div>
  )
}
