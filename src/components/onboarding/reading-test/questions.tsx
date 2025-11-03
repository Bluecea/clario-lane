import { motion } from 'motion/react'
import {
  Button,
  Card,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
} from '@/components'
import { PASSAGE } from './passage'
import { useOnboardingReadingTest } from './useOnboardingReadingTest'

export function Questions() {
  const { answers, currentQuestion, handleAnswerQuestion, handleNextQuestion } =
    useOnboardingReadingTest()
  const currentQ = PASSAGE.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / PASSAGE.questions.length) * 100

  return (
    <Card className='w-full max-w-2xl p-8'>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        key={currentQuestion}>
        <div className='mb-6'>
          <div className='flex justify-between mb-2 text-sm text-muted-foreground'>
            <span>
              Question {currentQuestion + 1} of {PASSAGE.questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <h3 className='mb-6'>{currentQ.question}</h3>

        <RadioGroup
          value={answers[currentQuestion]?.toString()}
          onValueChange={(value) => handleAnswerQuestion(parseInt(value))}>
          <div className='space-y-3'>
            {currentQ.options.map((option, index) => (
              <div
                key={option}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}>
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className='flex-1 cursor-pointer'>
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <Button
          size='lg'
          onClick={handleNextQuestion}
          disabled={answers[currentQuestion] === undefined}
          className='w-full mt-8'>
          {currentQuestion === PASSAGE.questions.length - 1
            ? 'See Results'
            : 'Next Question'}
        </Button>
      </motion.div>
    </Card>
  )
}
