import { LandingPage } from '@/pages/landing'
import {
  contentTypeRequest,
  challengeRequest,
  goalsRequest,
  plansRequest,
} from '@/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
  loader: async ({ context }) => {
    context.queryClient?.ensureQueryData(contentTypeRequest)
    context.queryClient?.ensureQueryData(challengeRequest)
    context.queryClient?.ensureQueryData(goalsRequest)
    context.queryClient?.ensureQueryData(plansRequest)
  },
})
