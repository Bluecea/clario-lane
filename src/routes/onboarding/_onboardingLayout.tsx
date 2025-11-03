import { Button } from '@/components'
import { useOnboardingStore } from '@/store'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/onboarding/_onboardingLayout')({
  component: RouteComponent,
  beforeLoad: () => {
    useOnboardingStore.setState({ currentStep: 5 })
  },
})

function RouteComponent() {
  const { currentStep, updateProfile, totalSteps } = useOnboardingStore()

  const onSkipNextStep = () => {
    if (currentStep < 6) updateProfile({ currentStep: currentStep + 1 })
  }

  const canSkip = [4, 5].includes(currentStep)

  return (
    <div className='min-h-[80svh] bg-background p-4 max-w-6xl mx-auto'>
      {/* Progress Bar */}
      <div className='mb-8'>
        <div className='flex justify-between mb-2 text-sm text-muted-foreground'>
          {currentStep > 0 ? (
            <Button
              size={'sm'}
              variant='outline'
              onClick={() => updateProfile({ currentStep: currentStep - 1 })}>
              <ArrowLeft />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <div className='flex gap-2 items-center'>
            {canSkip ? (
              <Button
                size='sm'
                variant={'ghost'}
                onClick={onSkipNextStep}
                className='flex items-center gap-2'>
                Skip step <ArrowRight />
              </Button>
            ) : null}
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center '>
        <Outlet />
      </div>
    </div>
  )
}
