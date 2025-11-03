import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Toaster } from 'sonner'
import Navbar from '@/components/navbar'
import { supabaseService } from '@/integration'
import { Footer, PendingPage, ThemeProvider } from '@/components'
import type { Session } from '@supabase/supabase-js'
import { logServerError } from '@/lib'

const countryNameKey = 'userCountryName'
const countryCodeKey = 'userCountryCode'

type RootRouteContext = {
  session: Session | null
  userCountryName: string
  userCountryCode: string
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
  loader: async () => {},
})

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <Navbar />
        <Outlet />
        <Footer />
        <Toaster position='top-center' />
      </ThemeProvider>
      <TanStackRouterDevtools position='bottom-right' />
    </React.Fragment>
  )
}
