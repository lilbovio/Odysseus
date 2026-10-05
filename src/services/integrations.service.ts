export interface ClassroomSyncInfo {
  isConnected: boolean;
  syncedCoursesCount: number;
  lastSyncFormatted: string;
  pendingDeliveriesCount: number;
  serviceName: string;
}

export interface IIntegrationsService {
  getClassroomStatus(): Promise<ClassroomSyncInfo>;
  syncNow(): Promise<ClassroomSyncInfo>;
  toggleClassroom(connected: boolean): Promise<ClassroomSyncInfo>;
}

let mockStatus: ClassroomSyncInfo = {
  isConnected: true,
  syncedCoursesCount: 5,
  lastSyncFormatted: 'hace 15 minutos',
  pendingDeliveriesCount: 3,
  serviceName: 'Google Classroom',
};

export class IntegrationsService implements IIntegrationsService {
  async getClassroomStatus(): Promise<ClassroomSyncInfo> {
    await new Promise((r) => setTimeout(r, 40));
    return { ...mockStatus };
  }

  async syncNow(): Promise<ClassroomSyncInfo> {
    await new Promise((r) => setTimeout(r, 300));
    mockStatus = {
      ...mockStatus,
      lastSyncFormatted: 'hace unos momentos',
    };
    return { ...mockStatus };
  }

  async toggleClassroom(connected: boolean): Promise<ClassroomSyncInfo> {
    await new Promise((r) => setTimeout(r, 100));
    mockStatus = {
      ...mockStatus,
      isConnected: connected,
      lastSyncFormatted: connected ? 'hace unos momentos' : 'desconectado',
    };
    return { ...mockStatus };
  }
}

export const integrationsService = new IntegrationsService();
