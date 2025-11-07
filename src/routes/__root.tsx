import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from 'sonner'
import Navbar from '@/components/navbar'

import { Footer, PendingPage, ThemeProvider } from '@/components'
import type { Session } from '@supabase/supabase-js'
import { logServerError } from '@/lib'
import { supabaseService } from '~supabase/clientServices'
import { queryClient } from '@/queries'

const countryNameKey = 'userCountryName'
const countryCodeKey = 'userCountryCode'

type RootRouteContext = {
  session: Session | null
  userCountryName?: string
  userCountryCode?: string
  queryClient?: QueryClient
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  pendingComponent: PendingPage,
  beforeLoad: async () => {
    try {
      const userCountryCode = localStorage.getItem(countryCodeKey)
      const userCountryName = localStorage.getItem(countryNameKey)
      const session = await supabaseService.getSession()
      await supabaseService.getUser()

      if (userCountryCode) {
        return { userCountryCode, userCountryName, session }
      }
      const res = await fetch('https://ipapi.co/json/')
      const data = await res.json()
      localStorage.setItem(countryCodeKey, data.country_code)
      localStorage.setItem(countryNameKey, data.country_name)

      return {
        userCountryName: data.country_name,
        userCountryCode: data.country_code,
        session,
      }
    } catch (error) {
      logServerError(error)
      return {
        userCountryName: 'United States',
        userCountryCode: 'US',
      }
    }
  },
})

function RootComponent() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        {/* The rest of your application */}
        <ThemeProvider>
          <Navbar />
          <Outlet />
          <Footer />
          <Toaster position='top-center' />
        </ThemeProvider>
        <TanStackRouterDevtools position='bottom-left' />
        <ReactQueryDevtools position='bottom' initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  )
}
