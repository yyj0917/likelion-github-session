// 🔒 DO NOT TOUCH: 라우터 정의. 학생이 만지면 사이트가 깨집니다.
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './components/Layout';
import { LandingPage } from '../routes/landing/LandingPage';
import { GuidePage } from '../routes/guide/GuidePage';
import { CommandsPage } from '../routes/commands/CommandsPage';
import { PracticePage } from '../routes/practice/PracticePage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/guide', element: <GuidePage /> },
      { path: '/commands', element: <CommandsPage /> },
      { path: '/practice', element: <PracticePage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
