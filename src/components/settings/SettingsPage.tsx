import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
} from '@/components/ui'
import { useSettingsStore, type FontFace, type Theme } from '@/store'
import { useState } from 'react'

export function SettingsPage() {
  const [dailyReminder, setDailyReminder] = useState(true)

  const [weeklySummary, setWeeklySummary] = useState(true)
  const {
    fontFace,
    fontSizeScale,
    theme,
    setFontFace,
    setFontSizeScale,
    setTheme,
  } = useSettingsStore()

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
        <p className='text-muted-foreground'>
          Manage your account settings and preferences.
        </p>
      </div>

      <div className='grid gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              Manage your subscription and billing information.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <div className='font-medium'>Active Plan</div>
                <div className='text-sm text-muted-foreground'>
                  You are currently on the active plan.
                </div>
              </div>
              <Button variant='outline'>Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reading Preferences</CardTitle>
            <CardDescription>
              Customize your reading experience.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <Label>Font Face</Label>
              <Select
                value={fontFace}
                onValueChange={(value) => setFontFace(value as FontFace)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a font' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Inter'>Inter</SelectItem>
                  <SelectItem value='Dyslexie'>Dyslexie</SelectItem>
                  <SelectItem value='Serif'>Serif</SelectItem>
                  <SelectItem value='Mono'>Mono</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label>Font Size</Label>
                <span className='text-sm text-muted-foreground'>
                  {fontSizeScale}%
                </span>
              </div>
              <Slider
                value={[fontSizeScale]}
                onValueChange={(value) => setFontSizeScale(value[0])}
                min={75}
                max={150}
                step={5}
              />
            </div>

            <div className='space-y-2'>
              <Label>Theme</Label>
              <Select
                value={theme}
                onValueChange={(value) => setTheme(value as Theme)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='sepia'>Sepia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between space-x-2'>
              <Label htmlFor='daily-reminder' className=' space-y-1'>
                <span className=''>Daily Reminders</span>
                <span className='font-normal text-sm text-muted-foreground'>
                  Receive a daily reminder to practice.
                </span>
              </Label>
              <Switch
                id='daily-reminder'
                checked={dailyReminder}
                onCheckedChange={setDailyReminder}
              />
            </div>
            <div className='flex items-center justify-between space-x-2'>
              <Label htmlFor='weekly-summary'>
                <span className='block'>Weekly Summary</span>
                <span className='font-normal text-sm text-muted-foreground'>
                  Get a weekly summary of your progress.
                </span>
              </Label>
              <Switch
                id='weekly-summary'
                checked={weeklySummary}
                onCheckedChange={setWeeklySummary}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
