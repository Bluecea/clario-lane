import { motion } from 'motion/react'
import { cn } from '@/lib'

type OnboardingLayoutProps = {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  stepTitle?: string
  showProgress?: boolean
  className?: string
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  stepTitle,
  showProgress = true,
  className,
}: OnboardingLayoutProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div
      className={cn(
        'min-h-screen w-full bg-linear-to-b from-background to-secondary/20',
        'flex flex-col items-center justify-center p-4 md:p-8',
        className
      )}>
      {showProgress && (
        <div className='w-full max-w-xl mb-12 space-y-3'>
          <div className='flex items-center justify-between text-sm font-medium text-muted-foreground'>
            <span className='uppercase tracking-wider text-xs'>
              {stepTitle || `Step ${currentStep + 1} of ${totalSteps}`}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className='relative h-2 w-full overflow-hidden rounded-full bg-secondary'>
            <motion.div
              className='h-full bg-linear-to-r from-primary via-blue-500 to-indigo-500 rounded-full'
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      <div className='w-full max-w-4xl perspective-[1000px]'>{children}</div>

      {/* Background Gradient Mesh */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none -z-10'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-pulse-slow' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px] animate-pulse-slow delay-700' />
      </div>
    </div>
  )
}
