import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services';
import { Subject } from '../services/types';

// Query Keys
export const queryKeys = {
  dailyReview: ['study', 'dailyReview'] as const,
  subjects: ['study', 'subjects'] as const,
  subject: (id: string) => ['study', 'subject', id] as const,
  studySuggestions: ['study', 'suggestions'] as const,
  weakSpots: ['study', 'weakSpots'] as const,
  quizQuestion: (num: number) => ['study', 'quizQuestion', num] as const,
  upcomingDeliveries: ['sessions', 'deliveries'] as const,
  recentActivity: ['sessions', 'activity'] as const,
  weeklyDistribution: ['sessions', 'weeklyDistribution'] as const,
  agentHistory: (subjectId?: string) => ['agent', 'history', subjectId || 'default'] as const,
  classroomStatus: ['integrations', 'classroom'] as const,
  userProfile: ['profile', 'user'] as const,
  streakDays: ['profile', 'streak'] as const,
  documents: (subjectId?: string) => ['documents', subjectId || 'all'] as const,
};

// 1. Study Hooks
export function useDailyReview() {
  return useQuery({
    queryKey: queryKeys.dailyReview,
    queryFn: () => api.study.getDailyReview(),
  });
}

export function usePostponeReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hours: number) => api.study.postponeDailyReview(hours),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.dailyReview, updated);
    },
  });
}

export function useSubjects() {
  return useQuery({
    queryKey: queryKeys.subjects,
    queryFn: () => api.study.getSubjects(),
  });
}

export function useSubject(id: string) {
  return useQuery({
    queryKey: queryKeys.subject(id),
    queryFn: () => api.study.getSubjectById(id),
    enabled: Boolean(id),
  });
}

export function useCreateSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      payload: Omit<Subject, 'id' | 'materialsCount' | 'retentionRate' | 'status' | 'examBadgeText'>
    ) => api.study.createSubject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects });
    },
  });
}

export function useStudySuggestions() {
  return useQuery({
    queryKey: queryKeys.studySuggestions,
    queryFn: () => api.study.getStudySuggestions(),
  });
}

export function useWeakSpots() {
  return useQuery({
    queryKey: queryKeys.weakSpots,
    queryFn: () => api.study.getWeakSpots(),
  });
}

export function useQuizQuestion(questionNumber: number = 3) {
  return useQuery({
    queryKey: queryKeys.quizQuestion(questionNumber),
    queryFn: () => api.study.getQuizQuestion(questionNumber),
  });
}

export function useSubmitConfidenceMutation() {
  return useMutation({
    mutationFn: ({
      questionId,
      level,
    }: {
      questionId: string;
      level: 'knewIt' | 'doubted' | 'guessed' | 'didntKnow';
    }) => api.study.submitConfidence(questionId, level),
  });
}

// 2. Sessions Hooks
export function useUpcomingDeliveries() {
  return useQuery({
    queryKey: queryKeys.upcomingDeliveries,
    queryFn: () => api.sessions.getUpcomingDeliveries(),
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: queryKeys.recentActivity,
    queryFn: () => api.sessions.getRecentActivity(),
  });
}

export function useWeeklyDistribution() {
  return useQuery({
    queryKey: queryKeys.weeklyDistribution,
    queryFn: () => api.sessions.getWeeklyDistribution(),
  });
}

// 3. Agent Hooks
export function useAgentHistory(subjectId?: string) {
  return useQuery({
    queryKey: queryKeys.agentHistory(subjectId),
    queryFn: () => api.agent.getConversationHistory(subjectId),
  });
}

export function useAskAgentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { query: string; subjectId?: string; strictMode: boolean }) =>
      api.agent.ask(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agent', 'history'] });
    },
  });
}

export function useClearAgentHistoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.agent.clearConversation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agent', 'history'] });
    },
  });
}

// 4. Profile & Streak Hooks
export function useUserProfile() {
  return useQuery({
    queryKey: queryKeys.userProfile,
    queryFn: () => api.profile.getProfile(),
  });
}

export function useStreakDays() {
  return useQuery({
    queryKey: queryKeys.streakDays,
    queryFn: () => api.profile.getStreakDays(),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates: Partial<import('../services/types').UserProfile>) =>
      api.profile.updateProfile(updates),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.userProfile, updated);
    },
  });
}

// 5. Integrations Hooks
export function useClassroomSync() {
  return useQuery({
    queryKey: queryKeys.classroomStatus,
    queryFn: () => api.integrations.getClassroomStatus(),
  });
}

export function useTriggerClassroomSyncMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.integrations.syncNow(),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.classroomStatus, updated);
      queryClient.invalidateQueries({ queryKey: queryKeys.upcomingDeliveries });
    },
  });
}

// 6. Documents Hooks
export function useDocuments(subjectId?: string) {
  return useQuery({
    queryKey: queryKeys.documents(subjectId),
    queryFn: () =>
      subjectId
        ? api.documents.getDocumentsBySubject(subjectId)
        : api.documents.getAllDocuments(),
  });
}

export function useUploadDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      subjectId: string;
      title: string;
      fileName: string;
      pageCount: number;
      summary: string;
    }) => api.documents.uploadDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects });
    },
  });
}
