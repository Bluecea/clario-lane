import { Target } from 'lucide-react'
import { motion } from 'motion/react'
import { Button, Card, CardContent } from '@/components'

type Props = {
  handleStartDrill: () => void
}

export function QuickDrillIntro({ handleStartDrill }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='max-w-2xl mx-auto text-center'>
      <h2 className='mb-4 text-primary'>Quick Win Training</h2>
      <p className=' mb-8'>
        Let's do a quick exercise to give you an instant boost. This
        word-chunking drill will help you read groups of words together instead
        of one at a time.
      </p>

      <Card className='mb-8'>
        <CardContent className='pt-6'>
          <div className='flex items-start gap-4 text-left'>
            <Target className='w-6 h-6 text-primary flex-shrink-0 mt-1' />
            <div>
              <h3 className='mb-2'>How This Works</h3>
              <p className=' mb-3'>
                Words will appear in groups of 3. Try to see all three words at
                once, without moving your eyes. This trains your peripheral
                vision and reduces the number of eye movements needed while
                reading.
              </p>
              <div className='bg-indigo-50 p-4 rounded-lg'>
                <p className='text-sm text-primary'>
                  <strong>Pro Tip:</strong> Focus on the middle word and let the
                  others come into view naturally.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex gap-4'>
        <Button onClick={handleStartDrill} className='flex-1'>
          Start Drill
        </Button>
      </div>
    </motion.div>
  )
}
