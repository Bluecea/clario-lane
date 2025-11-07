import { BookOpen, FileText, GraduationCap, Newspaper } from 'lucide-react'
import { OptionCard } from '@/components/ui/option-card'
import { StepContainer } from '@/components/ui/step-container'

import type { ContentTypesType, PreferencesType } from '@/types'
import type { ReactNode } from 'react'
import { getIcon } from './getIcon'

type content = 'non-fiction' | 'fictions' | 'news' | 'technology'

const Icons: Record<content, ReactNode> = {
  fictions: <BookOpen className='w-6 h-6' />,
  'non-fiction': <FileText className='w-6 h-6' />,
  news: <Newspaper className='w-6 h-6' />,
  technology: <GraduationCap className='w-6 h-6' />,
}

type Props = {
  selections: string[]
  contentType: ContentTypesType[]
  toggleSelection: (category: PreferencesType, value: string) => void
}

export function ContentType({
  selections,
  contentType,
  toggleSelection,
}: Props) {
  return (
    <StepContainer key='step-1'>
      <h3 className='mb-6 text-center'>What do you like to read?</h3>
      <div className='grid sm:grid-cols-2 gap-4'>
        {contentType.map(({ content, id, description }) => (
          <OptionCard
            key={id}
            icon={getIcon(Icons, content.toLowerCase() as content)}
            title={content}
            description={description}
            selected={selections.includes(content)}
            onClick={() => toggleSelection('content_type', content)}
          />
        ))}
      </div>
    </StepContainer>
  )
}
