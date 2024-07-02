export interface Duty {
  created_at: string;
  description: string | null;
  ended_at: string | null;
  id: string;
  name: string;
  plate_num: string;
  started_at: string;
  type: DutyType;
  user_id: string | null;
}

export enum DutyType {
  Patrol = 'Patrol',
  Traffic = 'Traffic',
  Desk = 'Desk',
  Other = 'Other',
}

export interface Profile {
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  phone: string;
  pumpsz: number;
  updated_at: string;
}

export enum Role {
  ADMIN = 'Admin',
  DEP_HEAD = 'DEP_HEAD',
  CIVIL_GUARD = 'CivilGuard',
}

export interface Account {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeConfirmResponse {
  isValid: boolean;
  name: string | null;
}

export interface SignUpResponse {
  error: string | null;
  account: Account | null;
}
