import { UserProfile } from './types';

export interface IProfileService {
  getProfile(): Promise<UserProfile>;
  updateProfile(updates: Partial<UserProfile>): Promise<UserProfile>;
  getStreakDays(): Promise<{
    days: { letter: string; name: string; completed: boolean; isToday?: boolean; isFuture?: boolean }[];
    currentStreak: number;
    goalText: string;
  }>;
}

let mockProfile: UserProfile = {
  id: 'usr-juan-01',
  fullName: 'Juan Pérez',
  email: 'juan.perez@universidad.edu.mx',
  career: 'Licenciatura en Derecho',
  cycle: 'Ciclo 2024-B · 6to Semestre',
  university: 'Facultad de Estudios Superiores',
  averageGrade: 8.9,
  studyStreakDays: 12,
  processedDocsCount: 42,
  overallRetentionRate: 82,
  classroomConnected: true,
  lastClassroomSync: 'hace 15 minutos',
  algorithm: 'FSRS v4 (Free Spaced Repetition Scheduler)',
  dailyGoalCards: 20,
};

export class ProfileService implements IProfileService {
  async getProfile(): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 50));
    return { ...mockProfile };
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 80));
    mockProfile = { ...mockProfile, ...updates };
    return { ...mockProfile };
  }

  async getStreakDays() {
    await new Promise((r) => setTimeout(r, 40));
    return {
      days: [
        { letter: 'L', name: 'Lunes', completed: true },
        { letter: 'M', name: 'Martes', completed: true },
        { letter: 'M', name: 'Miércoles', completed: true },
        { letter: 'J', name: 'Jueves', completed: true },
        { letter: 'V', name: 'Viernes', completed: true, isToday: true },
        { letter: 'S', name: 'Sábado', completed: false, isFuture: true },
        { letter: 'D', name: 'Domingo', completed: false, isFuture: true },
      ],
      currentStreak: 5,
      goalText: 'Meta: 7/7',
    };
  }
}

export const profileService = new ProfileService();
