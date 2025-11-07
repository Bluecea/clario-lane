import { useState, useEffect } from 'react'
import {
  RadioGroup,
  RadioGroupItem,
  Progress,
  Button,
  Card,
  CardContent,
} from '@/components'
import { X, Timer, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useOnboardingStore } from '@/store'

interface ReadingExerciseProps {
  exerciseId: string
  onComplete: () => void
  onExit: () => void
}

const SAMPLE_PASSAGE = `Neuroplasticity, the brain's ability to reorganize itself by forming new neural connections throughout life, has revolutionized our understanding of learning and cognitive development. This remarkable feature allows the brain to compensate for injury, adapt to new situations, and adjust to environmental changes. Scientists have discovered that engaging in challenging mental activities, learning new skills, and maintaining social connections can significantly enhance neuroplasticity at any age. Regular practice and repetition strengthen neural pathways, making tasks easier over time. This understanding has profound implications for education, rehabilitation, and personal development, suggesting that our brains remain malleable and capable of growth well into old age.`

const QUESTIONS = [
  {
    question: 'What is neuroplasticity?',
    options: [
      'A type of brain surgery',
      "The brain's ability to form new neural connections",
      'A learning disability',
      'A meditation technique',
    ],
    correct: 1,
  },
  {
    question: 'According to the passage, what enhances neuroplasticity?',
    options: [
      'Avoiding new experiences',
      'Staying in isolation',
      'Engaging in challenging mental activities',
      'Taking frequent breaks from thinking',
    ],
    correct: 2,
  },
  {
    question: 'When does neuroplasticity occur?',
    options: [
      'Only in childhood',
      'Only in young adults',
      'Throughout life',
      'Only after brain injury',
    ],
    correct: 2,
  },
]

export function ReadingExercise({
  // exerciseId,
  onComplete,
  onExit,
}: ReadingExerciseProps) {
  const { updateProfile, ...userProfile } = useOnboardingStore()
  const [stage, setStage] = useState<'reading' | 'questions' | 'results'>(
    'reading'
  )
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const setElapsedTime = useState(0)[1]

  useEffect(() => {
    setStartTime(Date.now())

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - Date.now()) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleFinishReading = () => {
    setEndTime(Date.now())
    setStage('questions')
  }

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    const timeInMinutes = (endTime - startTime) / 1000 / 60
    const wordCount = SAMPLE_PASSAGE.split(' ').length
    const wpm = Math.round(wordCount / timeInMinutes)

    const correctAnswers = answers.filter(
      (answer, idx) => answer === QUESTIONS[idx].correct
    ).length
    const currentComprehensionScore = Math.round(
      (correctAnswers / QUESTIONS.length) * 100
    )

    const xpEarned =
      50 +
      (currentComprehensionScore >= 80 ? 20 : 0) +
      (wpm > userProfile.current_wpm! ? 30 : 0)

    updateProfile({
      current_wpm: Math.max(userProfile.current_wpm!, wpm),
      current_comprehension_score: currentComprehensionScore,
      xp_earned: userProfile.xp_earned! + xpEarned,
      total_sessions: userProfile.total_sessions! + 1,
    })

    setStage('results')
  }

  const renderReading = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='max-w-4xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-indigo-900'>Speed Reading Exercise</h2>
          <p className='text-gray-600'>Read at your comfortable pace</p>
        </div>
        <Button variant='ghost' size='icon' onClick={onExit}>
          <X className='w-5 h-5' />
        </Button>
      </div>

      <Card className='mb-6'>
        <CardContent className='pt-6'>
          <div className='flex items-center gap-4 mb-4 p-4 bg-blue-50 rounded-lg'>
            <Timer className='w-5 h-5 text-blue-600' />
            <div className='flex-1'>
              <p className='text-sm text-blue-900'>
                Read the passage below, then click "I'm Done" when you finish.
                Focus on understanding while maintaining a good pace.
              </p>
            </div>
          </div>

          <div className='prose prose-lg max-w-none leading-relaxed text-gray-800 p-6'>
            {SAMPLE_PASSAGE}
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-center'>
        <Button size='lg' onClick={handleFinishReading} className='px-12'>
          I'm Done Reading
          <ArrowRight className='w-5 h-5 ml-2' />
        </Button>
      </div>
    </motion.div>
  )

  const renderQuestions = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='max-w-3xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-indigo-900'>Comprehension Check</h2>
          <p className='text-gray-600'>
            Answer these questions about what you read
          </p>
        </div>
        <Button variant='ghost' size='icon' onClick={onExit}>
          <X className='w-5 h-5' />
        </Button>
      </div>

      <div className='mb-4'>
        <Progress
          value={(answers.length / QUESTIONS.length) * 100}
          className='h-2'
        />
        <p className='text-sm text-gray-600 text-center mt-2'>
          {answers.length} of {QUESTIONS.length} answered
        </p>
      </div>

      <div className='space-y-6'>
        {QUESTIONS.map((q, qIdx) => (
          <Card key={qIdx}>
            <CardContent className='pt-6'>
              <h3 className='mb-4'>Question {qIdx + 1}</h3>
              <p className='text-gray-700 mb-4'>{q.question}</p>
              <RadioGroup
                value={answers[qIdx]?.toString()}
                onValueChange={(value) => handleAnswer(qIdx, parseInt(value))}>
                <div className='space-y-3'>
                  {q.options.map((option, oIdx) => (
                    <label
                      key={oIdx}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[qIdx] === oIdx
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}>
                      <RadioGroupItem
                        value={oIdx.toString()}
                        className='mt-1'
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='mt-6 flex gap-4'>
        <Button
          variant='outline'
          onClick={() => setStage('reading')}
          className='flex-1'>
          Review Passage
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={answers.length !== QUESTIONS.length}
          className='flex-1'>
          Submit Answers
        </Button>
      </div>
    </motion.div>
  )

  const renderResults = () => {
    const timeInMinutes = (endTime - startTime) / 1000 / 60
    const wordCount = SAMPLE_PASSAGE.split(' ').length
    const wpm = Math.round(wordCount / timeInMinutes)
    const correctAnswers = answers.filter(
      (answer, idx) => answer === QUESTIONS[idx].correct
    ).length
    const comprehension = Math.round((correctAnswers / QUESTIONS.length) * 100)
    const improvement = wpm - userProfile.baseline_wpm!

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className='max-w-2xl mx-auto text-center'>
        <CheckCircle2 className='w-16 h-16 text-green-500 mx-auto mb-4' />
        <h2 className='mb-2 text-indigo-900'>Exercise Complete!</h2>
        <p className='text-gray-600 mb-8'>Great job! Here are your results</p>

        <div className='grid md:grid-cols-2 gap-6 mb-8'>
          <Card>
            <CardContent className='pt-6'>
              <TrendingUp className='w-8 h-8 text-indigo-600 mx-auto mb-2' />
              <div className='text-4xl mb-2 text-indigo-600'>{wpm}</div>
              <div className='text-gray-600 mb-2'>Words Per Minute</div>
              {improvement > 0 && (
                <div className='text-sm text-green-600'>
                  +{improvement} from baseline!
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <CheckCircle2 className='w-8 h-8 text-green-600 mx-auto mb-2' />
              <div className='text-4xl mb-2 text-green-600'>
                {comprehension}%
              </div>
              <div className='text-gray-600 mb-2'>Comprehension</div>
              <div className='text-sm text-gray-600'>
                {correctAnswers}/{QUESTIONS.length} correct
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'>
          <CardContent className='pt-6'>
            <h3 className='mb-2 text-indigo-900'>
              XP Earned: +
              {50 +
                (comprehension >= 80 ? 20 : 0) +
                (wpm > userProfile.current_wpm! ? 30 : 0)}
            </h3>
            <p className='text-sm text-gray-700'>
              {comprehension >= 80 && '🎯 Bonus: High comprehension! '}
              {wpm > userProfile.current_wpm! &&
                '⚡ Bonus: New personal best! '}
            </p>
          </CardContent>
        </Card>

        <div className='flex gap-4'>
          <Button variant='outline' onClick={onExit} className='flex-1'>
            Back to Dashboard
          </Button>
          <Button onClick={onComplete} className='flex-1'>
            Continue Practice
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 py-12'>
      <AnimatePresence mode='wait'>
        {stage === 'reading' && renderReading()}
        {stage === 'questions' && renderQuestions()}
        {stage === 'results' && renderResults()}
      </AnimatePresence>
    </div>
  )
}
