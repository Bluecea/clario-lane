import { useState } from 'react'
import PricingCard from '@/components/pricingCard'
import { Switch } from '..'
import { useRouteContext } from '@tanstack/react-router'

type PricingPlan = {
  title: string
  mo: number
  yr: number
  description: string
  features: string[]
}

const countryPricingMap: Record<string, Array<PricingPlan>> = {
  NG: [
    {
      title: 'Plus',
      mo: 11555,
      yr: 65000,
      description: 'Access features',
      features: [
        'Unlimited speed reading exercises',
        'Personalized AI coaching',
        'Detailed progress analytics',
        'Daily reading goals & reminders',
        'Access to advanced RSVP training',
        'Focus building exercises',
      ],
    },
  ],
  US: [
    {
      title: 'Plus',
      mo: 8,
      yr: 70,
      description: 'Access features',
      features: [
        'Unlimited speed reading exercises',
        'Personalized AI coaching',
        'Detailed progress analytics',
        'Daily reading goals & reminders',
        'Access to advanced RSVP training',
        'Focus building exercises',
      ],
    },
  ],
}

export default function Billing() {
  const { userCountryCode } = useRouteContext({ from: '__root__' })
  const [interval, setInterval] = useState<'mo' | 'yr'>('mo')

  const currency = userCountryCode === 'NG' ? 'NGN' : 'USD'

  const onSelect = (plan: string) => {
    // simple handler - replace with navigation / checkout logic
    window.alert(`Selected ${plan} (${interval})`)
  }

  const prices = countryPricingMap[userCountryCode]

  return (
    <div className='max-w-2xl mx-auto w-full'>
      <header className='mb-8'>
        <h1 className='text-3xl font-extrabold'>Billing</h1>
        <p className='text-sm text-muted-foreground mt-2'>
          Choose a plan that fits your team.
        </p>
      </header>

      <div className='flex items-center gap-2 mb-6'>
        <span className={interval === 'mo' ? `font-bold text-primary` : ''}>
          Monthly
        </span>
        <Switch
          checked={interval === 'yr'}
          onCheckedChange={(checked) => setInterval(checked ? 'yr' : 'mo')}
        />
        <span className={interval === 'yr' ? `font-bold text-primary` : ''}>
          Yearly
        </span>

        <div className='ml-auto text-sm text-muted-foreground'>
          Billed {interval === 'mo' ? 'monthly' : 'annually'}
        </div>
      </div>

      <div className='flex flex-col items-center gap-4 mb-8'>
        {prices.map((pricing) => (
          <PricingCard
            title={pricing.title}
            price={interval === 'mo' ? pricing.mo : pricing.yr}
            currency={currency}
            frequency={interval}
            description={pricing.description}
            features={pricing.features}
            badge='Popular'
            popular
            ctaLabel='Start'
            onCta={() => onSelect('Pro')}
          />
        ))}
      </div>
    </div>
  )
}
