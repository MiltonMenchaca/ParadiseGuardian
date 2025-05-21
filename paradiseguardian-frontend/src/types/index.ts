// Tipos para autenticación
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Tipos de nivel de severidad para logs
export type SeverityLevel = 'info' | 'warning' | 'error' | 'critical' | 'low' | 'medium' | 'high';

// Tipos para logs de seguridad
export interface SecurityLog {
  id: number | string;
  timestamp: string;
  level?: SeverityLevel;
  severity?: SeverityLevel;
  source: string;
  message: string;
  // Enriched data fields
  ipAddress?: string;
  location?: string;
  country?: string;
  userAgent?: string;
  browser?: string;
  device?: string;
  os?: string;
  correlationId?: string;
  userId?: string;
  sessionId?: string;
  additionalData?: Record<string, unknown>;
  details?: Record<string, unknown>;
}

export interface LogsState {
  logs: SecurityLog[];
  filteredLogs: SecurityLog[];
  currentLog: SecurityLog | null;
  loading: boolean;
  error: string | null;
}