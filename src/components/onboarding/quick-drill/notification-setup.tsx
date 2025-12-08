import { Bell, CheckCircle2, ChevronRight, Mail, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { useId } from 'react'
import { useOnboardingStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { StepCard } from '../layout'

type Props = {
  onContinue: () => void
}

export function NotificationSetup({ onContinue }: Props) {
  const { updateProfile, ...onboarding } = useOnboardingStore()

  const dailyId = useId()
  const weeklyId = useId()
  const achievementId = useId()

  const items = [
    {
      id: dailyId,
      icon: Bell,
      label: 'Daily Practice Reminder',
      desc: 'Get reminded to practice each day',
      checked: onboarding.daily_reminder,
      onChange: (c: boolean) => updateProfile({ daily_reminder: c }),
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      id: weeklyId,
      icon: Mail,
      label: 'Weekly Progress Report',
      desc: "See your week's achievements",
      checked: onboarding.weekly_summary,
      onChange: (c: boolean) => updateProfile({ weekly_summary: c }),
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      id: achievementId,
      icon: Trophy,
      label: 'Achievement Alerts',
      desc: 'Celebrate badges and milestones',
      checked: onboarding.achievements,
      onChange: (c: boolean) => updateProfile({ achievements: c }),
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ]

  return (
    <div className='max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 items-start'>
      <StepCard
        title='Stay on Track'
        description='Consistency is key to improving reading speed. Choose how we can help you.'>
        <div className='space-y-4'>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className='flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors'>
              <div className='flex items-center gap-4'>
                <div
                  className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <label
                    htmlFor={item.id}
                    className='font-semibold cursor-pointer block'>
                    {item.label}
                  </label>
                  <p className='text-xs text-muted-foreground'>{item.desc}</p>
                </div>
              </div>
              <Switch
                id={item.id}
                checked={item.checked}
                onCheckedChange={item.onChange}
              />
            </motion.div>
          ))}
        </div>
      </StepCard>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className='h-full flex flex-col'>
        <div className='bg-linear-to-br from-primary to-blue-600 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden flex-1 flex flex-col'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />

          <div className='flex items-center gap-3 mb-6'>
            <div className='bg-white/20 p-2 rounded-lg backdrop-blur-md'>
              <CheckCircle2 className='w-6 h-6 text-white' />
            </div>
            <h3 className='text-xl font-bold'>Ready to Start!</h3>
          </div>

          <p className='text-blue-100 mb-8 leading-relaxed'>
            You're all set to begin your journey. By customizing your
            notifications, you're 3x more likely to hit your reading goals!
          </p>

          <ul className='space-y-4 mb-8 text-sm font-medium'>
            {[
              'Personalized daily exercises',
              'Progress tracking analytics',
              'Gamified challenges',
            ].map((feature) => (
              <li key={feature} className='flex items-center gap-3'>
                <div className='w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(147,197,253,0.8)]' />
                {feature}
              </li>
            ))}
          </ul>

          <div className='mt-auto pt-8'>
            <Button
              size='lg'
              onClick={onContinue}
              className='w-full h-12 bg-white text-primary hover:bg-white/90 shadow-xl border-0 font-bold tracking-wide'>
              Create Account & Begin
              <ChevronRight className='ml-2 w-4 h-4' />
            </Button>
            {/* <p className='text-center text-xs text-blue-200 mt-4 opacity-80'>
              No credit card required for trial
            </p> */}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
