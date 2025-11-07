// src/router.tsx

import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { queryClient } from './queries'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // optionally expose the QueryClient via router context
    context: { queryClient, session: null },
    scrollRestoration: true,
    defaultPreload: 'intent',
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    wrapQueryClient: false,
    // optional:
    // handleRedirects: true,
  })

  return router
}
