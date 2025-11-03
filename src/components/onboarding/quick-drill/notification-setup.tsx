import { Bell, CheckCircle2, Mail, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { useId } from 'react'
import { useOnboardingStore } from '@/store'
import { Button, Card, CardContent, Label, Switch } from '@/components'

export function NotificationSetup() {
  const { updateProfile, ...onboarding } = useOnboardingStore()
  const onContinue = () => {
    updateProfile({ currentStep: onboarding.currentStep + 1 })
  }
  const dailyId = useId()
  const weeklyId = useId()
  const achievementId = useId()

  return (
    <div className='space-y-4 '>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}>
        <Card>
          <CardContent>
            <h3 className='mb-4'>Notification Preferences</h3>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Bell className='w-5 h-5 text-primary' />
                  <div>
                    <Label htmlFor='daily'>Daily Practice Reminder</Label>
                    <p className='text-sm text-gray-500'>
                      Get reminded to practice each day
                    </p>
                  </div>
                </div>
                <Switch
                  id={dailyId}
                  checked={onboarding.dailyReminder}
                  onCheckedChange={(checked) =>
                    updateProfile({ dailyReminder: checked })
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Mail className='w-5 h-5 text-primary' />
                  <div>
                    <Label htmlFor='weekly'>Weekly Progress Report</Label>
                    <p className='text-sm text-gray-500'>
                      See your week's achievements
                    </p>
                  </div>
                </div>
                <Switch
                  id={weeklyId}
                  checked={onboarding.weeklyProgress}
                  onCheckedChange={(checked) =>
                    updateProfile({ weeklyProgress: checked })
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Trophy className='w-5 h-5 text-primary' />
                  <div>
                    <Label htmlFor='achievements'>Achievement Alerts</Label>
                    <p className='text-sm text-gray-500'>
                      Celebrate badges and milestones
                    </p>
                  </div>
                </div>
                <Switch
                  id={achievementId}
                  checked={onboarding.achievements}
                  onCheckedChange={(checked) =>
                    updateProfile({ achievements: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        <Card className='bg-gradient-to-r from-primary to-blue-600 text-white border-0 '>
          <CardContent>
            <div className='flex items-start gap-3'>
              <CheckCircle2 className='w-6 h-6  flex-shrink-0 mt-1' />
              <div>
                <h3 className='mb-2 text-left'>Ready to Start!</h3>
                <p className='text-sm  mb-3'>
                  You're all set to begin your reading speed journey. Here's
                  what you'll get access to:
                </p>
                <ul className='space-y-2 text-sm '>
                  <li className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-secondary-foreground rounded-full'></div>
                    Personalized daily exercises
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-secondary-foreground rounded-full'></div>
                    Progress tracking and analytics
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-secondary-foreground rounded-full'></div>
                    Gamified challenges and badges
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-secondary-foreground rounded-full'></div>
                    Community leaderboards
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Button size='lg' onClick={onContinue} className='w-full'>
        Continue
      </Button>
    </div>
  )
}
