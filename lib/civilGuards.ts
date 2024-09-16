import axios from 'axios';
import { CivilGuard, CivilGuardComplete } from '../types';

export async function getCivilGuard(id: string): Promise<CivilGuard> {
  const res = await axios.get(`/civilguards/${id}`);
  return res.data;
}

export async function getCivilGuardComplete(
  id: string,
): Promise<CivilGuardComplete> {
  const res = await axios.get(`/civilguards/${id}?complete=true`);
  return res.data;
}
