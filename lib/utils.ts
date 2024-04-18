import { DutyType } from '../types';

export function dutyTypeToString(dutyType: DutyType): string {
  switch (dutyType) {
    case DutyType.Patrol:
      return 'Járőrözés';
    default:
      return 'Ismeretlen';
  }
}
