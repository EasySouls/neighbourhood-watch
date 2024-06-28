import axios from 'axios';
import { Duty } from '../types';

export async function getActiveDuties(departmentId: string): Promise<Duty[]> {
  const res = await axios.get(`/duties/department/${departmentId}/active`);
  return res.data;
}

// TODO - implement an api endpoint for this
export async function getOwnActiveDuty(
  userId: string,
  departmentId: string
): Promise<Duty | null> {
  const res = await axios.get<Duty[]>(
    `/duties/department/${departmentId}/active`
  );
  const duties = res.data;
  return duties.find((duty) => duty.user_id === userId) || null;
}

export async function stopActiveDuty(dutyId: string) {
  await axios.post(`/duties/${dutyId}`);
}
