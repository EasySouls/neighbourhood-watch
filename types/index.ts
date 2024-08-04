export interface Duty {
  created_at: string;
  description: string | null;
  ended_at: string | null;
  id: string;
  name: string;
  plate_num: string;
  started_at: string;
  type: DutyType;
  userId: string | null;
}

// The creating Civil Guard's id is not required, since it will be read from the jwt token
export interface CreateDuty {
  name: string;
  description?: string;
  plateNumber: string;
  type: DutyType;
}

export enum DutyType {
  PATROL = 'Patrol',
  TRAFFIC = 'Traffic',
  DESK = 'Desk',
  OTHER = 'Other',
}

export interface CivilGuard {
  id: string;
  name: string;
  roles: Role[];
  accountId?: string;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CivilGuardComplete {
  id: string;
  name: string;
  roles: Role[];
  account: Account;
  department: Department;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ADMIN = 'ADMIN',
  DEP_HEAD = 'DEP_HEAD',
  CIVIL_GUARD = 'CIVIL_GUARD',
}

export interface Account {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
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
