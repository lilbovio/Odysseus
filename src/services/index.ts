import { documentsService } from './documents.service';
import { studyService } from './study.service';
import { sessionsService } from './sessions.service';
import { agentService } from './agent.service';
import { integrationsService } from './integrations.service';
import { profileService } from './profile.service';

export * from './types';
export * from './documents.service';
export * from './study.service';
export * from './sessions.service';
export * from './agent.service';
export * from './integrations.service';
export * from './profile.service';

/**
 * Aggregated typed API client
 * Ready to be wired to AWS API Gateway / Cognito authenticated endpoints.
 */
export const api = {
  documents: documentsService,
  study: studyService,
  sessions: sessionsService,
  agent: agentService,
  integrations: integrationsService,
  profile: profileService,
};
