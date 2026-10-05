/**
 * Type definitions for Odysseus Service Interfaces
 * Mirrored to match AWS Lambda / DynamoDB backend endpoints in production.
 */

export interface Subject {
  id: string;
  name: string;
  professor: string;
  area: 'Derecho' | 'Salud' | 'Economía' | 'Tecnología' | 'Arte';
  materialsCount: number;
  retentionRate: number; // 0 to 100
  status: 'Activa' | 'Repaso urgente' | 'Óptimo' | 'Bajo dominio' | 'Regular';
  nextExamDate: string;
  nextExamFormatted: string;
  examBadgeText: string;
  color: string;
  units?: { id: string; title: string; mastery: number; docsCount: number }[];
}

export interface DocumentItem {
  id: string;
  subjectId: string;
  title: string;
  fileName: string;
  pageCount: number;
  uploadedAt: string;
  summary: string;
  snippetQuote?: string;
  citationPage?: number;
  articleTag?: string;
}

export interface DailyReviewSession {
  id: string;
  cardsCount: number;
  estimatedMinutes: number;
  retentionPercentage: number;
  topicsReadyForExam: number;
  keyTopics: { topic: string; subject: string }[];
  isPostponed?: boolean;
}

export interface UpcomingDelivery {
  id: string;
  title: string;
  subjectName: string;
  dueDateTime: string;
  dueBadge: string;
  badgeType: 'coral' | 'amber' | 'sky';
  colorDot: string;
}

export interface RecentActivity {
  lastQuery: {
    id: string;
    title: string;
    description: string;
    timeAgo: string;
    sourcesCount: number;
  };
  lastQuiz: {
    id: string;
    title: string;
    description: string;
    scoreFraction: string;
    errorsCount: number;
  };
}

export interface StudySuggestion {
  id: string;
  title: string;
  subjectName: string;
  description: string;
  iconName: string;
  badgeColor: string;
}

export interface WeeklyDistribution {
  totalHours: number;
  comparisonText: string;
  description: string;
  days: {
    dayLabel: string;
    heightPercent: number;
    isToday?: boolean;
  }[];
}

export interface QuizOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  isDiscarded?: boolean;
}

export interface QuizQuestion {
  id: string;
  subjectName: string;
  unitName: string;
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  caseTypeTag: string;
  difficultyTag: string;
  options: QuizOption[];
  explanation: string;
  sourceDoc: string;
  sourcePage: number;
  weakTopics: { topic: string; note: string; type: 'fallo' | 'duda' }[];
  studyTip: { text: string; sourceClass: string };
}

export interface WeakSpot {
  id: string;
  name: string;
  countLabel: string;
  colorDot: string;
}

export interface AgentSourceInspection {
  docName: string;
  page: number;
  articleTag: string;
  className: string;
  annotatedDate: string;
  professor: string;
  highlightedQuote: string;
  semanticMatchRate: number;
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  timestamp: string;
  text: string;
  isVerified?: boolean;
  verifiedSession?: string;
  sourceTags?: { docName: string; page: number }[];
  matchRate?: number;
  isSourceBoundary?: boolean;
  sourceBoundaryOptions?: {
    searchGeneral?: boolean;
    uploadMaterial?: boolean;
  };
  inspectionData?: AgentSourceInspection;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  career: string;
  cycle: string;
  university: string;
  averageGrade: number;
  studyStreakDays: number;
  processedDocsCount: number;
  overallRetentionRate: number;
  classroomConnected: boolean;
  lastClassroomSync: string;
  algorithm: string;
  dailyGoalCards: number;
}
