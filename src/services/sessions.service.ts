import { UpcomingDelivery, RecentActivity, WeeklyDistribution } from './types';

export interface ISessionsService {
  getUpcomingDeliveries(): Promise<UpcomingDelivery[]>;
  getRecentActivity(): Promise<RecentActivity>;
  getWeeklyDistribution(): Promise<WeeklyDistribution>;
}

const mockDeliveries: UpcomingDelivery[] = [
  {
    id: 'del-1',
    title: 'Ensayo argumentativo: Juicio de amparo',
    subjectName: 'Derecho civil · Hoy, 11:59 p. m.',
    dueDateTime: 'Hoy, 11:59 p. m.',
    dueBadge: 'Vence en 6 h',
    badgeType: 'coral',
    colorDot: '#ff8a6b',
  },
  {
    id: 'del-2',
    title: 'Caso clínico: Isquemia miocárdica',
    subjectName: 'Patología médica · Mañana, 11:59 p. m.',
    dueDateTime: 'Mañana, 11:59 p. m.',
    dueBadge: 'Mañana',
    badgeType: 'amber',
    colorDot: '#f4be4e',
  },
  {
    id: 'del-3',
    title: 'Problemas de equilibrio de Nash',
    subjectName: 'Microeconomía · Jueves, 2:00 p. m.',
    dueDateTime: 'Jueves, 2:00 p. m.',
    dueBadge: 'Jueves',
    badgeType: 'sky',
    colorDot: '#6db8f2',
  },
];

const mockActivity: RecentActivity = {
  lastQuery: {
    id: 'query-1',
    title: 'Pregunta sobre Art. 14 Constitucional',
    description: 'Interpretación de retroactividad y garantías de debido proceso con 4 jurisprudencias analizadas.',
    timeAgo: 'Hace 2 horas',
    sourcesCount: 4,
  },
  lastQuiz: {
    id: 'quiz-1',
    title: 'Fisiología renal',
    description: 'Filtración glomerular y balance hidroelectrolítico completados. Pendiente reforzar túbulo distal.',
    scoreFraction: '8/10 aciertos',
    errorsCount: 2,
  },
};

const mockWeeklyDist: WeeklyDistribution = {
  totalHours: 18.5,
  comparisonText: '+2.4 h que la semana pasada',
  description: 'Tu ritmo es constante, con mayor enfoque en Derecho civil y Anatomía.',
  days: [
    { dayLabel: 'L', heightPercent: 40 },
    { dayLabel: 'M', heightPercent: 65 },
    { dayLabel: 'M', heightPercent: 85 },
    { dayLabel: 'J', heightPercent: 100, isToday: true },
    { dayLabel: 'V', heightPercent: 55 },
    { dayLabel: 'S', heightPercent: 70 },
    { dayLabel: 'D', heightPercent: 30 },
  ],
};

export class SessionsService implements ISessionsService {
  async getUpcomingDeliveries(): Promise<UpcomingDelivery[]> {
    await new Promise((r) => setTimeout(r, 60));
    return [...mockDeliveries];
  }

  async getRecentActivity(): Promise<RecentActivity> {
    await new Promise((r) => setTimeout(r, 50));
    return { ...mockActivity };
  }

  async getWeeklyDistribution(): Promise<WeeklyDistribution> {
    await new Promise((r) => setTimeout(r, 60));
    return { ...mockWeeklyDist };
  }
}

export const sessionsService = new SessionsService();
