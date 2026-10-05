import { AgentChatMessage } from './types';

export interface IAgentService {
  getConversationHistory(subjectId?: string): Promise<AgentChatMessage[]>;
  ask(params: { query: string; subjectId?: string; strictMode: boolean }): Promise<AgentChatMessage>;
  clearConversation(): Promise<void>;
}

const initialHistory: AgentChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    timestamp: '11:42',
    text: '¿Cuál es la diferencia entre nulidad absoluta y relativa según el Código Civil en nuestros apuntes?',
  },
  {
    id: 'msg-2',
    sender: 'agent',
    timestamp: '11:43',
    text: 'En tus notas de la sesión 4, la nulidad absoluta protege el orden público y no admite convalidación ni prescripción. La nulidad relativa solo puede ser invocada por las partes afectadas y se convalida por el paso del tiempo o ratificación expresa.',
    isVerified: true,
    verifiedSession: 'sesión 4',
    sourceTags: [
      { docName: 'Apuntes_Unidad2.pdf', page: 14 },
      { docName: 'Codigo_Civil_Comentado.pdf', page: 102 },
    ],
    matchRate: 98.4,
    inspectionData: {
      docName: 'Apuntes_Unidad2.pdf',
      page: 14,
      articleTag: 'Art. 2226',
      className: 'Clase 4 · Invalidez del Acto Jurídico',
      annotatedDate: '18 de Febrero',
      professor: 'Profesor Morales',
      highlightedQuote: '«La nulidad absoluta produce efectos de pleno derecho y no puede convalidarse por confirmación ni por prescripción (Art. 2226)»',
      semanticMatchRate: 98.4,
    },
  },
  {
    id: 'msg-3',
    sender: 'user',
    timestamp: '11:44',
    text: '¿El maestro mencionó algún ejemplo de examen sobre esto?',
  },
  {
    id: 'msg-4',
    sender: 'agent',
    timestamp: '11:44',
    text: 'No encontré esto en tus materiales sobre preguntas específicas de examen de este tema. ¿Quieres que lo busque con conocimiento jurídico general o prefieres subir las notas de la clase siguiente?',
    isSourceBoundary: true,
    sourceBoundaryOptions: {
      searchGeneral: true,
      uploadMaterial: true,
    },
  },
];

let currentHistory = [...initialHistory];

export class AgentService implements IAgentService {
  async getConversationHistory(_subjectId?: string): Promise<AgentChatMessage[]> {
    await new Promise((r) => setTimeout(r, 60));
    return [...currentHistory];
  }

  async ask(params: { query: string; subjectId?: string; strictMode: boolean }): Promise<AgentChatMessage> {
    await new Promise((r) => setTimeout(r, 350));
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMessage: AgentChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      timestamp: timeStr,
      text: params.query,
    };
    currentHistory.push(userMessage);

    const lower = params.query.toLowerCase();
    let agentMessage: AgentChatMessage;

    if (lower.includes('examen') || lower.includes('pregunta') && lower.includes('profesor') && params.strictMode) {
      agentMessage = {
        id: `msg-a-${Date.now()}`,
        sender: 'agent',
        timestamp: timeStr,
        text: 'No se localiza un reactivo idéntico en las diapositivas de clase subidas. Sin embargo, en el temario de Unidad 2 se subraya la cláusula rescisoria como criterio de evaluación prioritario.',
        isSourceBoundary: true,
        sourceBoundaryOptions: {
          searchGeneral: true,
          uploadMaterial: true,
        },
      };
    } else if (lower.includes('rescisión') || lower.includes('rescision') || lower.includes('contrato')) {
      agentMessage = {
        id: `msg-a-${Date.now()}`,
        sender: 'agent',
        timestamp: timeStr,
        text: 'De acuerdo con la página 28 de tus apuntes de Unidad 2, la rescisión produce la ineficacia sobrevenida de un contrato válidamente celebrado debido al incumplimiento de una de las partes, obligando a la restitución bilateral recíproca.',
        isVerified: true,
        verifiedSession: 'Unidad 2 · Sesión 5',
        sourceTags: [{ docName: 'Apuntes_Unidad2.pdf', page: 28 }],
        matchRate: 97.2,
        inspectionData: {
          docName: 'Apuntes_Unidad2.pdf',
          page: 28,
          articleTag: 'Art. 1949',
          className: 'Clase 5 · Efectos de la Rescisión y Mora',
          annotatedDate: '22 de Febrero',
          professor: 'Profesor Morales',
          highlightedQuote: '«El pacto comisorio tácito legitima al contratante cumplido a exigir el cumplimiento forzoso o la rescisión con resarcimiento de daños»',
          semanticMatchRate: 97.2,
        },
      };
    } else {
      agentMessage = {
        id: `msg-a-${Date.now()}`,
        sender: 'agent',
        timestamp: timeStr,
        text: `Identificado en tus documentos indexados: "${params.query}". Los conceptos clave vinculan los principios generales de la materia con los ejercicios prácticos revisados durante las sesiones teóricas.`,
        isVerified: true,
        verifiedSession: 'Material de curso',
        sourceTags: [{ docName: 'Apuntes_Unidad2.pdf', page: 14 }],
        matchRate: 94.8,
        inspectionData: {
          docName: 'Apuntes_Unidad2.pdf',
          page: 14,
          articleTag: 'Sesión teórica',
          className: 'Derecho Civil III',
          annotatedDate: 'Febrero 2024',
          professor: 'Profesor Morales',
          highlightedQuote: '«Todo negocio jurídico debe interpretarse conforme a la buena fe objetiva y las disposiciones supletorias de la ley aplicable»',
          semanticMatchRate: 94.8,
        },
      };
    }

    currentHistory.push(agentMessage);
    return agentMessage;
  }

  async clearConversation(): Promise<void> {
    currentHistory = [...initialHistory];
  }
}

export const agentService = new AgentService();
