import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary, PendingPage } from './components'
import { logServerError } from './lib'

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => logServerError(error),
      },
    },
  })
  const router = createRouter({
    routeTree,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultPendingComponent: PendingPage,
    scrollRestoration: true,
    // defaultPreload: 'render',
    context: {
      queryClient,
      session: null,
      user: undefined,
    },
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    // optional:
    // handleRedirects: true,
    // wrapQueryClient: true,
  })

  return router
}
