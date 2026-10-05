import { DailyReviewSession, Subject, StudySuggestion, QuizQuestion, WeakSpot } from './types';

export interface IStudyService {
  getDailyReview(): Promise<DailyReviewSession>;
  postponeDailyReview(hours: number): Promise<DailyReviewSession>;
  getSubjects(): Promise<Subject[]>;
  getSubjectById(id: string): Promise<Subject | null>;
  createSubject(payload: Omit<Subject, 'id' | 'materialsCount' | 'retentionRate' | 'status' | 'examBadgeText'>): Promise<Subject>;
  getStudySuggestions(): Promise<StudySuggestion[]>;
  getWeakSpots(): Promise<WeakSpot[]>;
  getQuizQuestion(questionNumber: number): Promise<QuizQuestion>;
  submitConfidence(questionId: string, level: 'knewIt' | 'doubted' | 'guessed' | 'didntKnow'): Promise<{ success: boolean; nextIntervalDays: number }>;
}

let mockDailyReview: DailyReviewSession = {
  id: 'session-today',
  cardsCount: 12,
  estimatedMinutes: 15,
  retentionPercentage: 82,
  topicsReadyForExam: 4,
  keyTopics: [
    { topic: 'Garantías constitucionales', subject: 'Derecho civil' },
    { topic: 'Vías metabólicas', subject: 'Bioquímica' },
  ],
  isPostponed: false,
};

let mockSubjects: Subject[] = [
  {
    id: 'derecho-civil',
    name: 'Derecho civil',
    professor: 'Prof. Alejandro Morales',
    area: 'Derecho',
    materialsCount: 8,
    retentionRate: 84,
    status: 'Activa',
    nextExamDate: '2024-11-14',
    nextExamFormatted: '14 de nov',
    examBadgeText: 'En curso',
    color: '#5ce0b8',
    units: [
      { id: 'u1', title: 'Unidad 1: Teoría de los Hechos y Actos Jurídicos', mastery: 92, docsCount: 2 },
      { id: 'u2', title: 'Unidad 2: Invalidez, Nulidades y Rescisión', mastery: 84, docsCount: 3 },
      { id: 'u3', title: 'Unidad 3: Cumplimiento e Incumplimiento de Obligaciones', mastery: 76, docsCount: 3 },
    ],
  },
  {
    id: 'anatomia-humana',
    name: 'Anatomía humana',
    professor: 'Dra. Carmen Villaseñor',
    area: 'Salud',
    materialsCount: 14,
    retentionRate: 62,
    status: 'Repaso urgente',
    nextExamDate: '2024-11-18',
    nextExamFormatted: '18 de nov',
    examBadgeText: '4 días',
    color: '#f4be4e',
    units: [
      { id: 'u1', title: 'Unidad 1: Sistema Nervioso Central', mastery: 58, docsCount: 5 },
      { id: 'u2', title: 'Unidad 2: Pares Craneales y Vías Aferentes', mastery: 62, docsCount: 5 },
      { id: 'u3', title: 'Unidad 3: Sistema Vascular y Drenaje Venoso', mastery: 66, docsCount: 4 },
    ],
  },
  {
    id: 'microeconomia',
    name: 'Microeconomía',
    professor: 'Mtro. Roberto Sada',
    area: 'Economía',
    materialsCount: 6,
    retentionRate: 91,
    status: 'Óptimo',
    nextExamDate: '2024-11-22',
    nextExamFormatted: '22 de nov',
    examBadgeText: 'Al corriente',
    color: '#6db8f2',
    units: [
      { id: 'u1', title: 'Unidad 1: Estructuras de Mercado y Competencia', mastery: 94, docsCount: 2 },
      { id: 'u2', title: 'Unidad 2: Teoría de Juegos y Equilibrio de Nash', mastery: 91, docsCount: 2 },
      { id: 'u3', title: 'Unidad 3: Externalidades y Bienes Públicos', mastery: 88, docsCount: 2 },
    ],
  },
  {
    id: 'criptografia',
    name: 'Criptografía',
    professor: 'Dr. Héctor Navarro',
    area: 'Tecnología',
    materialsCount: 5,
    retentionRate: 45,
    status: 'Bajo dominio',
    nextExamDate: '2024-11-28',
    nextExamFormatted: '28 de nov',
    examBadgeText: 'Reforzar',
    color: '#b8e06a',
    units: [
      { id: 'u1', title: 'Unidad 1: Cifrado Simétrico y Modos de Operación', mastery: 60, docsCount: 2 },
      { id: 'u2', title: 'Unidad 2: RSA, Curvas Elípticas y Algoritmo de Euclides', mastery: 45, docsCount: 2 },
      { id: 'u3', title: 'Unidad 3: Funciones Hash y Firmas Digitales', mastery: 30, docsCount: 1 },
    ],
  },
  {
    id: 'historia-del-arte',
    name: 'Historia del arte',
    professor: 'Mtra. Sofía Del Paso',
    area: 'Arte',
    materialsCount: 9,
    retentionRate: 78,
    status: 'Regular',
    nextExamDate: '2024-12-05',
    nextExamFormatted: '5 de dic',
    examBadgeText: '3 semanas',
    color: '#f28dae',
    units: [
      { id: 'u1', title: 'Unidad 1: Posrevolución y Renacimiento Mural', mastery: 82, docsCount: 3 },
      { id: 'u2', title: 'Unidad 2: Ruptura y Abstracción en México', mastery: 78, docsCount: 3 },
      { id: 'u3', title: 'Unidad 3: Fotografía Documental Moderna', mastery: 74, docsCount: 3 },
    ],
  },
];

const mockSuggestions: StudySuggestion[] = [
  {
    id: 'sug-1',
    title: 'Curva de cifrado RSA',
    subjectName: 'Criptografía',
    description: '12 tarjetas pendientes para consolidar memoria de largo plazo.',
    iconName: 'key',
    badgeColor: '#b8e06a',
  },
  {
    id: 'sug-2',
    title: 'Pares craneales IX al XII',
    subjectName: 'Anatomía humana',
    description: 'Tu examen es en 4 días, repasa origen aparente y trayecto periférico.',
    iconName: 'biotech',
    badgeColor: '#f4be4e',
  },
];

const mockWeakSpots: WeakSpot[] = [
  { id: 'w1', name: 'Efectos retroactivos', countLabel: '1 fallo previo', colorDot: '#ff8a6b' },
  { id: 'w2', name: 'Mora creditoris', countLabel: '2 dudas marcadas', colorDot: '#f4be4e' },
];

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-3',
    subjectName: 'Derecho Civil',
    unitName: 'Unidad 2',
    questionNumber: 3,
    totalQuestions: 8,
    questionText: '¿Cuál es el efecto inmediato de la declaración judicial de rescisión contractual por incumplimiento culposo?',
    caseTypeTag: 'Caso práctico',
    difficultyTag: 'Dificultad media',
    options: [
      {
        id: 'opt-a',
        label: 'A',
        text: 'La restitución mutua de las prestaciones con efectos retroactivos salvo contratos de tracto sucesivo.',
        isCorrect: true,
      },
      {
        id: 'opt-b',
        label: 'B',
        text: 'La indemnización forzosa sin posibilidad de devolución de los bienes transmitidos previamente.',
        isCorrect: false,
        isDiscarded: true,
      },
      {
        id: 'opt-c',
        label: 'C',
        text: 'La conversión automática del convenio en un contrato de promesa de venta supletorio.',
        isCorrect: false,
      },
      {
        id: 'opt-d',
        label: 'D',
        text: 'La extinción retroactiva exclusiva de los intereses moratorios generados en el ejercicio fiscal.',
        isCorrect: false,
      },
    ],
    explanation: 'La rescisión disuelve el contrato válido y obliga a devolver lo recibido, tal como indica la regla general de restitución. En tracto sucesivo (arrendamiento), los efectos no se retrotraen porque el goce temporal ya fue consumado.',
    sourceDoc: 'Apuntes_Unidad2.pdf',
    sourcePage: 28,
    weakTopics: [
      { topic: 'Efectos retroactivos', note: '1 fallo previo', type: 'fallo' },
      { topic: 'Mora creditoris', note: '2 dudas marcadas', type: 'duda' },
    ],
    studyTip: {
      text: 'Relaciona la rescisión con el concepto de sinalagma funcional para recordar por qué las prestaciones deben restituirse de forma bilateral.',
      sourceClass: 'Basado en tu clase del martes',
    },
  },
  {
    id: 'q-4',
    subjectName: 'Derecho Civil',
    unitName: 'Unidad 2',
    questionNumber: 4,
    totalQuestions: 8,
    questionText: '¿En qué supuesto la nulidad relativa puede ser subsanada mediante confirmación expresa?',
    caseTypeTag: 'Doctrina civil',
    difficultyTag: 'Dificultad estándar',
    options: [
      {
        id: 'opt-4a',
        label: 'A',
        text: 'Cuando cesa el vicio del consentimiento y la parte legitimada ratifica el negocio sin dolo ni coacción.',
        isCorrect: true,
      },
      {
        id: 'opt-4b',
        label: 'B',
        text: 'Cuando el Ministerio Público determina la ausencia de lesión pecuniaria en el patrimonio estatal.',
        isCorrect: false,
      },
      {
        id: 'opt-4c',
        label: 'C',
        text: 'Únicamente tras sentencia condenatoria firme ejecutada por el juez de cuantía menor.',
        isCorrect: false,
      },
      {
        id: 'opt-4d',
        label: 'D',
        text: 'En ningún caso, dado que el orden público impide validar actos imperfectos en origen.',
        isCorrect: false,
      },
    ],
    explanation: 'La nulidad relativa está instituida para proteger intereses particulares; por ello, cesado el vicio (por ejemplo, el error o la violencia), el afectado puede confirmar el acto.',
    sourceDoc: 'Codigo_Civil_Comentado.pdf',
    sourcePage: 104,
    weakTopics: [
      { topic: 'Confirmación del acto', note: 'Consolidación requerida', type: 'duda' },
    ],
    studyTip: {
      text: 'Recuerda: la nulidad absoluta no admite confirmación; la relativa sí se purga con ratificación.',
      sourceClass: 'Apuntes sesión 4',
    },
  },
];

export class StudyService implements IStudyService {
  async getDailyReview(): Promise<DailyReviewSession> {
    await new Promise((r) => setTimeout(r, 50));
    return { ...mockDailyReview };
  }

  async postponeDailyReview(hours: number): Promise<DailyReviewSession> {
    await new Promise((r) => setTimeout(r, 60));
    mockDailyReview = {
      ...mockDailyReview,
      isPostponed: true,
      estimatedMinutes: mockDailyReview.estimatedMinutes,
    };
    return { ...mockDailyReview };
  }

  async getSubjects(): Promise<Subject[]> {
    await new Promise((r) => setTimeout(r, 70));
    return [...mockSubjects];
  }

  async getSubjectById(id: string): Promise<Subject | null> {
    await new Promise((r) => setTimeout(r, 50));
    const normalized = id.toLowerCase();
    return (
      mockSubjects.find(
        (s) => s.id.toLowerCase() === normalized || s.name.toLowerCase().includes(normalized)
      ) || null
    );
  }

  async createSubject(payload: Omit<Subject, 'id' | 'materialsCount' | 'retentionRate' | 'status' | 'examBadgeText'>): Promise<Subject> {
    await new Promise((r) => setTimeout(r, 120));
    const newSubject: Subject = {
      ...payload,
      id: `sub-${Date.now()}`,
      materialsCount: 1,
      retentionRate: 50,
      status: 'Activa',
      examBadgeText: 'Programado',
      units: [
        { id: 'u1', title: 'Unidad 1: Fundamentos y Conceptos Iniciales', mastery: 50, docsCount: 1 },
      ],
    };
    mockSubjects.push(newSubject);
    return newSubject;
  }

  async getStudySuggestions(): Promise<StudySuggestion[]> {
    await new Promise((r) => setTimeout(r, 50));
    return [...mockSuggestions];
  }

  async getWeakSpots(): Promise<WeakSpot[]> {
    await new Promise((r) => setTimeout(r, 40));
    return [...mockWeakSpots];
  }

  async getQuizQuestion(questionNumber: number): Promise<QuizQuestion> {
    await new Promise((r) => setTimeout(r, 60));
    const q = mockQuizQuestions.find((item) => item.questionNumber === questionNumber) || mockQuizQuestions[0];
    return { ...q };
  }

  async submitConfidence(
    questionId: string,
    level: 'knewIt' | 'doubted' | 'guessed' | 'didntKnow'
  ): Promise<{ success: boolean; nextIntervalDays: number }> {
    await new Promise((r) => setTimeout(r, 70));
    const intervals: Record<string, number> = {
      knewIt: 6,
      doubted: 3,
      guessed: 1,
      didntKnow: 1,
    };
    return { success: true, nextIntervalDays: intervals[level] || 2 };
  }
}

export const studyService = new StudyService();
