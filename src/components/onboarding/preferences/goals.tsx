import { BookOpen, FileText, Focus, GraduationCap } from 'lucide-react'
import { OptionCard } from '@/components/ui/option-card'
import { StepContainer } from '@/components/ui/step-container'

import type { GoalsType, PreferencesType } from '@/types'
import type { ReactNode } from 'react'
import { getIcon } from './getIcon'

type goals =
  | 'enhance focus'
  | 'boost retention'
  | 'increase speed'
  | 'improve comprehension'

const Icons: Record<goals, ReactNode> = {
  'boost retention': <FileText className='w-6 h-6' />,
  'enhance focus': <Focus className='w-6 h-6' />,
  'improve comprehension': <BookOpen className='w-6 h-6' />,
  'increase speed': <GraduationCap className='w-6 h-6' />,
}

type Props = {
  selections: string[]
  goals: GoalsType[]
  toggleSelection: (category: PreferencesType, value: string) => void
}

export function Goals({ selections, toggleSelection, goals }: Props) {
  return (
    <StepContainer key='step-0'>
      <h3 className='mb-6 text-center'>What are your reading goals?</h3>
      <div className='grid sm:grid-cols-2 gap-4'>
        {goals.map(({ goal, id, description }) => (
          <OptionCard
            key={id}
            icon={getIcon(Icons, goal.toLowerCase() as goals)}
            title={goal}
            description={description}
            selected={selections.includes(goal)}
            onClick={() => toggleSelection('goals', goal)}
          />
        ))}
      </div>
    </StepContainer>
  )
}
