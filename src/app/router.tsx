import { createBrowserRouter } from 'react-router-dom'
import { PlaygroundPage } from '@/pages/Playground/index.ts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PlaygroundPage />,
  },
  {
    path: '/playground',
    element: <PlaygroundPage />,
  },
])
