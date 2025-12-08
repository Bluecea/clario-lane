import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib'
import { PASSAGE } from './passage'
import { useOnboardingReadingTest } from './useOnboardingReadingTest'
import { StepCard } from '../layout'

export function Questions() {
  const { answers, currentQuestion, handleAnswerQuestion, handleNextQuestion } =
    useOnboardingReadingTest()
  const currentQ = PASSAGE.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / PASSAGE.questions.length) * 100

  return (
    <StepCard className='max-w-3xl'>
      <div className='flex items-center gap-4 mb-8'>
        <span className='text-sm font-medium text-muted-foreground whitespace-nowrap'>
          Question {currentQuestion + 1} of {PASSAGE.questions.length}
        </span>
        <Progress value={progress} className='h-2' />
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className='space-y-8'>
        <h3 className='text-xl md:text-2xl font-semibold leading-tight'>
          {currentQ.question}
        </h3>

        <div className='grid gap-3'>
          {currentQ.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === index
            return (
              <motion.button
                key={option}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleAnswerQuestion(index)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                    : 'border-border/60 hover:border-primary/50 hover:bg-secondary/30'
                )}>
                <div className='flex items-center gap-4'>
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground/30'
                    )}>
                    {isSelected && (
                      <div className='w-2.5 h-2.5 rounded-full bg-white' />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-base',
                      isSelected
                        ? 'font-medium text-primary'
                        : 'text-foreground'
                    )}>
                    {option}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className='flex justify-end pt-4'>
          <Button
            size='lg'
            onClick={handleNextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className='min-w-[140px]'>
            {currentQuestion === PASSAGE.questions.length - 1
              ? 'Finish Test'
              : 'Next Question'}
          </Button>
        </div>
      </motion.div>
    </StepCard>
  )
}
