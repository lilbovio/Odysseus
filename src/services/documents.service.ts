import { DocumentItem } from './types';

export interface IDocumentsService {
  getAllDocuments(): Promise<DocumentItem[]>;
  getDocumentsBySubject(subjectId: string): Promise<DocumentItem[]>;
  getDocumentById(id: string): Promise<DocumentItem | null>;
  uploadDocument(payload: { subjectId: string; title: string; fileName: string; pageCount: number; summary: string }): Promise<DocumentItem>;
}

// In-memory mock storage (ready to be swapped with AWS S3 / API Gateway endpoints)
let mockDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    subjectId: 'sub-derecho',
    title: 'Apuntes Unidad 2 - Invalidez del Acto Jurídico',
    fileName: 'Apuntes_Unidad2.pdf',
    pageCount: 34,
    uploadedAt: '18 de Feb, 2024',
    summary: 'Análisis detallado de nulidad absoluta vs. nulidad relativa, vicios del consentimiento y efectos restitutorios en contratos civiles.',
    snippetQuote: '«La nulidad absoluta produce efectos de pleno derecho y no puede convalidarse por confirmación ni por prescripción (Art. 2226)»',
    citationPage: 14,
    articleTag: 'Art. 2226',
  },
  {
    id: 'doc-2',
    subjectId: 'sub-derecho',
    title: 'Código Civil Federal Comentado',
    fileName: 'Codigo_Civil_Comentado.pdf',
    pageCount: 420,
    uploadedAt: '10 de Feb, 2024',
    summary: 'Compendio de jurisprudencia y tesis aisladas sobre obligaciones bilaterales y rescisión por mora del deudor.',
    snippetQuote: 'La rescisión disuelve el contrato válido y obliga a devolver lo recibido con efectos retroactivos generales.',
    citationPage: 102,
    articleTag: 'Art. 1949',
  },
  {
    id: 'doc-3',
    subjectId: 'sub-salud',
    title: 'Anatomía Clínica de Tronco Encefálico y Pares Craneales',
    fileName: 'Pares_Craneales_Atlas.pdf',
    pageCount: 68,
    uploadedAt: '25 de Ene, 2024',
    summary: 'Origen real y aparente de los pares craneales IX (Glosofaríngeo), X (Vago), XI (Accesorio) y XII (Hipogloso).',
    citationPage: 45,
    articleTag: 'Atlas Anatómico',
  },
  {
    id: 'doc-4',
    subjectId: 'sub-economia',
    title: 'Microeconomía Intermedia - Equilibrios No Cooperativos',
    fileName: 'Nash_Equilibria_Notes.pdf',
    pageCount: 52,
    uploadedAt: '02 de Feb, 2024',
    summary: 'Modelos de duopolio de Cournot, Bertrand y Stackelberg con aplicaciones al mercado mexicano.',
    citationPage: 28,
  },
  {
    id: 'doc-5',
    subjectId: 'sub-tecnologia',
    title: 'Fundamentos de Criptografía Asimétrica y Curvas Elípticas',
    fileName: 'Criptografia_RSA_ECC.pdf',
    pageCount: 84,
    uploadedAt: '12 de Feb, 2024',
    summary: 'Aritmética modular, primalidad de Miller-Rabin y ataques de factorización sobre llaves RSA de 2048 bits.',
    citationPage: 19,
    articleTag: 'RSA / ECC',
  },
  {
    id: 'doc-6',
    subjectId: 'sub-arte',
    title: 'Historia del Arte Mexicano: Muralismo y Vanguardias',
    fileName: 'Muralismo_SigloXX.pdf',
    pageCount: 96,
    uploadedAt: '05 de Feb, 2024',
    summary: 'Obras de Rivera, Orozco y Siqueiros en los edificios públicos posrevolucionarios.',
    citationPage: 33,
  },
];

export class DocumentsService implements IDocumentsService {
  async getAllDocuments(): Promise<DocumentItem[]> {
    await new Promise((r) => setTimeout(r, 60));
    return [...mockDocuments];
  }

  async getDocumentsBySubject(subjectId: string): Promise<DocumentItem[]> {
    await new Promise((r) => setTimeout(r, 60));
    return mockDocuments.filter((d) => d.subjectId === subjectId);
  }

  async getDocumentById(id: string): Promise<DocumentItem | null> {
    await new Promise((r) => setTimeout(r, 40));
    return mockDocuments.find((d) => d.id === id) || null;
  }

  async uploadDocument(payload: {
    subjectId: string;
    title: string;
    fileName: string;
    pageCount: number;
    summary: string;
  }): Promise<DocumentItem> {
    await new Promise((r) => setTimeout(r, 120));
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      subjectId: payload.subjectId,
      title: payload.title,
      fileName: payload.fileName,
      pageCount: payload.pageCount,
      uploadedAt: 'Hoy',
      summary: payload.summary,
      citationPage: 1,
    };
    mockDocuments.unshift(newDoc);
    return newDoc;
  }
}

export const documentsService = new DocumentsService();
