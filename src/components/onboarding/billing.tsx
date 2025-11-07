import { useState } from 'react'
import PricingCard from '@/components/pricingCard'
import { Switch } from '..'
import { useRouteContext } from '@tanstack/react-router'
import { supabaseService } from '@/integration'
import PaystackPop from '@paystack/inline-js'
import type { PlanObject } from '@/lib'

const features = [
  'Unlimited speed reading exercises',
  'Personalized AI coaching',
  'Detailed progress analytics',
  'Daily reading goals & reminders',
  'Access to advanced RSVP training',
  'Focus building exercises',
]

export default function Billing({ plans }: { plans: PlanObject[] }) {
  const { session } = useRouteContext({ from: '__root__' })
  const [interval, setInterval] = useState<'mo' | 'yr'>('mo')
  const email = session?.user.email || ''
  const paystackPop = new PaystackPop()

  const handleSubscription = async (amount: number, plan: string) => {
    const data = await supabaseService.initiateSubscription({
      email,
      amount,
      plan,
    })

    const res = data.data

    return paystackPop.resumeTransaction(res.access_code)
  }

  return (
    <div className='max-w-2xl mx-auto w-full'>
      <header className='mb-8'>
        <h1 className='text-3xl font-extrabold'>Billing</h1>
        <p className='text-sm text-muted-foreground mt-2'>
          Choose a plan that fits you.
        </p>
      </header>

      <div className=' hidden items-center gap-2 mb-6'>
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

      <div className='grid md:grid-cols-2  gap-6'>
        {plans.map((plan) => (
          <PricingCard
            title={plan.name}
            price={plan.amount}
            currency={plan.currency}
            frequency={plan.interval}
            description={plan.description}
            features={features}
            badge={plan.interval}
            ctaLabel='Start'
            onCta={() => handleSubscription(plan.amount, plan.planCode)}
          />
        ))}
      </div>
    </div>
  )
}
