import { Timer } from 'lucide-react'
import { motion } from 'motion/react'
import { Button, Card } from '@/components'
import { PASSAGE } from './passage'
import { useOnboardingReadingTest } from './useOnboardingReadingTest'

export function Reading() {
  const { handleFinishReading } = useOnboardingReadingTest()
  return (
    <Card className='w-full max-w-3xl p-8'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className='mb-6 flex items-center justify-between'>
          <h3>Read the following passage</h3>
          <div className='text-sm text-muted-foreground flex items-center gap-2'>
            <Timer className='w-4 h-4' />
            <span>Timer running...</span>
          </div>
        </div>
        <div className='prose prose-lg max-w-none mb-8 leading-relaxed'>
          {PASSAGE.text.split('\n\n').map((paragraph) => (
            <p key={paragraph} className='mb-4'>
              {paragraph}
            </p>
          ))}
        </div>
        <Button size='lg' onClick={handleFinishReading} className='w-full'>
          I'm Done Reading
        </Button>
      </motion.div>
    </Card>
  )
}
