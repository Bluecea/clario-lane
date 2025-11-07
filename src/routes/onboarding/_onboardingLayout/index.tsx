import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import {
  Button,
  Challenges,
  ContentType,
  Goals,
  OnboardingReadingTest,
  QuickDrill,
  Progress,
  PendingPage,
  NotificationSetup,
} from '@/components'
import { Card } from '@/components/ui/card'
import PaystackPop from '@paystack/inline-js'

import { useOnboardingStore, useUserProfileStore } from '@/store'

import Billing from '@/components/onboarding/billing'
import type {
  ChallengesType,
  ContentTypesType,
  GoalsType,
  PlanObject,
  Preferences,
} from '@/types'
import { toast } from 'sonner'
import {
  challengeRequest,
  challengeRequestKey,
  contentTypeRequest,
  contentTypeRequestKey,
  goalsRequest,
  goalsRequestKey,
  plansRequest,
  plansRequestKey,
} from '@/queries'
import { supabaseService } from '~supabase/clientServices'

export const Route = createFileRoute('/onboarding/_onboardingLayout/')({
  component: RouteComponent,
  pendingComponent: PendingPage,
  beforeLoad: async ({ context: { session } }) => {
    if (!session) {
      throw redirect({ to: '/auth' })
    }

    const user_metadata = session?.user.user_metadata
    const name = user_metadata.displayName || user_metadata.full_name
    const email = session?.user.email

    useOnboardingStore.setState({ email, name })
    const { onboardingComplete } = useUserProfileStore.getState()

    if (onboardingComplete) {
      throw redirect({ to: '/dashboard' })
    }
  },
  loader: async ({ context }) => {
    context.queryClient?.ensureQueryData(contentTypeRequest)
    context.queryClient?.ensureQueryData(challengeRequest)
    context.queryClient?.ensureQueryData(goalsRequest)
    context.queryClient?.ensureQueryData(plansRequest)
  },
})

function RouteComponent() {
  const {
    current_step: currentStep,
    total_steps: totalSteps,
    updateProfile,
    ...onboarding
  } = useOnboardingStore()
  const progress = ((currentStep + 1) / totalSteps) * 100
  const route = useRouter()

  const queryClient = Route.useRouteContext().queryClient

  const goals = queryClient?.getQueryData([goalsRequestKey]) as GoalsType[]
  const challenges = queryClient?.getQueryData([
    challengeRequestKey,
  ]) as ChallengesType[]
  const contentType = queryClient?.getQueryData([
    contentTypeRequestKey,
  ]) as ContentTypesType[]
  const plans = queryClient?.getQueryData([plansRequestKey]) as PlanObject[]

  console.log({ challenges, contentType, goals, plans })

  const toggleSelection = (category: keyof Preferences, value: string) => {
    updateProfile({
      [category]: onboarding[category].includes(value)
        ? onboarding[category].filter((item) => item !== value)
        : [...onboarding[category], value],
    })
  }

  const session = Route.useRouteContext()?.session
  const email = session?.user?.email ?? ''
  const paystackPop = new PaystackPop()

  const onSubscribe = async (amount: number, plan: string) => {
    const data = await supabaseService.initiateSubscription({
      email,
      amount,
      plan,
    })

    return paystackPop.resumeTransaction(data.data.access_code)
  }

  const handleSubmission = async () => {
    updateProfile({
      streak_days: 1,
      onboarding_completed: true,
      isSubmitting: true,
    })

    supabaseService
      .insertUser()
      .then(() => handleNext())
      .catch((error) => toast.error(error.message))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      updateProfile({ current_step: currentStep + 1 })
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return onboarding.challenges.length > 0
      case 1:
        return onboarding.content_type.length > 0
      case 2:
        return onboarding.goals.length > 0
      default:
        return false
    }
  }

  if (currentStep === 3) return <OnboardingReadingTest />
  if (currentStep === 4) return <QuickDrill />
  if (currentStep === 5)
    return <NotificationSetup onContinue={handleSubmission} />
  if (currentStep === 6 && plans?.length)
    return <Billing plans={plans} onSubscribe={onSubscribe} />
  else route.navigate({ to: '/dashboard' })

  return (
    <Card className='w-full mx-auto mt-10 lg:mt-20 max-w-3xl  p-8'>
      {/* Progress Bar */}
      <div className='mb-8'>
        <div className='flex justify-between mb-2 text-sm text-muted-foreground'>
          <span>
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Welcome Message */}
      {currentStep === 0 && (
        <div className='mb-6 text-center'>
          <h2 className='mb-2'>Welcome, {onboarding.name}! 👋</h2>
          <p className='text-muted-foreground'>
            Let's personalize your learning journey
          </p>
        </div>
      )}

      {/* Steps */}
      <AnimatePresence mode='wait'>
        {currentStep === 0 && (
          <Challenges
            challenges={challenges}
            selections={onboarding.challenges}
            toggleSelection={toggleSelection}
          />
        )}
        {currentStep === 1 && (
          <ContentType
            contentType={contentType}
            selections={onboarding.content_type}
            toggleSelection={toggleSelection}
          />
        )}
        {currentStep === 2 && (
          <Goals
            selections={onboarding.goals}
            goals={goals}
            toggleSelection={toggleSelection}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className='flex gap-4 mt-8'>
        <Button
          size={'lg'}
          onClick={handleNext}
          disabled={!canProceed()}
          className='flex-1'>
          {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </Card>
  )
}
