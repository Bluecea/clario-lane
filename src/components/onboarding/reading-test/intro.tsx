import { BookOpen, CheckCircle2, Timer } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { StepCard } from '../layout'
import { useOnboardingReadingTest } from './useOnboardingReadingTest'

export function ReadingTestIntro() {
  const { handleStartReading } = useOnboardingReadingTest()

  return (
    <StepCard
      title='Baseline Reading Test'
      description='Let’s establish your starting point. This 2-minute assessment will measure your current reading speed and comprehension.'>
      <div className='flex flex-col gap-6'>
        <div className='grid sm:grid-cols-3 gap-4'>
          {[
            {
              icon: Timer,
              text: 'About 2 minutes',
              sub: 'Short & sweet',
              color: 'text-blue-500',
              bg: 'bg-blue-500/10',
            },
            {
              icon: BookOpen,
              text: 'Normal Pace',
              sub: 'Read comfortably',
              color: 'text-purple-500',
              bg: 'bg-purple-500/10',
            },
            {
              icon: CheckCircle2,
              text: 'Simple Questions',
              sub: 'Test memory',
              color: 'text-green-500',
              bg: 'bg-green-500/10',
            },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className='p-4 rounded-xl border border-border/50 bg-secondary/20 flex flex-col items-center text-center gap-3'>
              <div
                className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className='font-semibold text-sm'>{item.text}</div>
                <div className='text-xs text-muted-foreground'>{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-600 dark:text-yellow-400 text-center'>
          <span className='font-medium'>Tip:</span> Don't rush! Read for
          understanding, not just speed.
        </div>

        <div className='flex justify-center mt-2'>
          <Button
            size='lg'
            onClick={handleStartReading}
            className='min-w-[200px] h-12 text-lg font-medium bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all'>
            Start Reading
          </Button>
        </div>
      </div>
    </StepCard>
  )
}
