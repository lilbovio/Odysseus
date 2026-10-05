import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

import { HoyPage } from './features/hoy/HoyPage';
import { MateriasPage } from './features/materias/MateriasPage';
import { MateriaDetailPage } from './features/materias/MateriaDetailPage';
import { PreguntarPage } from './features/preguntar/PreguntarPage';
import { EstudiarHubPage } from './features/estudiar/EstudiarHubPage';
import { QuizPage } from './features/estudiar/QuizPage';
import { NuevaClasePage } from './features/clases/NuevaClasePage';
import { YoPage } from './features/yo/YoPage';
import { OnboardingPage } from './features/onboarding/OnboardingPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/hoy" replace />} />
              <Route path="/hoy" element={<HoyPage />} />
              <Route path="/materias" element={<MateriasPage />} />
              <Route path="/materias/:id" element={<MateriaDetailPage />} />
              <Route path="/preguntar" element={<PreguntarPage />} />
              <Route path="/estudiar" element={<EstudiarHubPage />} />
              <Route path="/estudiar/quiz" element={<QuizPage />} />
              <Route path="/clases/nueva" element={<NuevaClasePage />} />
              <Route path="/yo" element={<YoPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/hoy" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
