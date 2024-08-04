import { DutyType } from '../types';

export function dutyTypeToString(dutyType: DutyType): string {
  switch (dutyType) {
    case DutyType.PATROL:
      return 'Járőrözés';
    default:
      return 'Ismeretlen';
  }
}
