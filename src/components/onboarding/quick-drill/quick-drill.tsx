import { Drill } from './drill'
import { QuickDrillIntro } from './intro'
import { Result } from './result'
import { useQuickDrill } from './use-quick-drill'

export function QuickDrill() {
  const { stage, handleStartDrill, currentIndex, improvement } = useQuickDrill()
  return (
    <div>
      {stage === 'intro' && (
        <QuickDrillIntro handleStartDrill={handleStartDrill} />
      )}
      {stage === 'drill' && <Drill currentIndex={currentIndex} />}
      {stage === 'results' && <Result improvement={improvement} />}
    </div>
  )
}
