import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'
import { formatCurrency } from '@/lib'

export type PricingCardProps = {
  title: string
  price: number
  currency?: string
  frequency?: string // e.g. "mo", "yr"
  description?: string
  badge?: string
  features?: string[]
  popular?: boolean
  ctaLabel?: string
  onCta?: () => void
  className?: string
}

export default function PricingCard({
  title,
  price,
  currency = '$',
  frequency = 'mo',
  description,
  badge,
  features = [],
  popular = false,
  ctaLabel = 'Get started',
  onCta,
  className = '',
}: PricingCardProps) {
  return (
    <Card
      className={`w-full max-w-sm ${popular ? 'border-2 border-primary/80 shadow-lg' : ''} ${className}`}>
      <CardHeader className='flex flex-col gap-1'>
        <div className='flex items-center justify-between gap-2'>
          <CardTitle className='text-lg'>{title}</CardTitle>
          {badge && (
            <Badge variant={popular ? 'destructive' : 'secondary'}>
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <CardDescription className='text-sm text-muted-foreground'>
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        <div className='flex items-baseline gap-3'>
          <span className='text-4xl font-extrabold leading-none'>
            {formatCurrency(price, currency)}
          </span>
          <span className='text-sm text-muted-foreground'>/{frequency}</span>
        </div>

        <Separator />

        <ul className='flex flex-col gap-2'>
          {features.length === 0 ? (
            <li className='text-sm text-muted-foreground'>
              No features listed.
            </li>
          ) : (
            features.map((f, i) => (
              <li key={i} className='flex items-start gap-3 text-sm'>
                <span className='mt-0.5 text-primary'>
                  <Check size={16} />
                </span>
                <span className='text-muted-foreground'>{f}</span>
              </li>
            ))
          )}
        </ul>
      </CardContent>

      <CardFooter className='flex flex-col gap-3'>
        <Button className='w-full' size={'lg'} onClick={onCta}>
          {ctaLabel}
        </Button>
        {popular && (
          <div className='text-center text-xs text-muted-foreground'>
            Most popular
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
