import axios from 'axios';
import { CreateDuty, Duty, DutyType } from '../types';

export async function getActiveDuties(departmentId: string): Promise<Duty[]> {
  try {
    const res = await axios.get(`/duties/department/${departmentId}/active`);
    return res.data;
  } catch (error) {
    console.log('🚀 ~ getActiveDuties ~ error:', error);
    return [];
  }
}

// TODO - implement an api endpoint for this
export async function getOwnActiveDuty(
  userId: string,
  departmentId: string
): Promise<Duty | null> {
  try {
    const res = await axios.get<Duty[]>(
      `/duties/department/${departmentId}/active`
    );
    const duties = res.data;
    return duties.find((duty) => duty.userId === userId) || null;
  } catch (error) {
    console.log('🚀 ~ getOwnActiveDuty ~ error:', error);
    return null;
  }
}

export async function startDuty(createDutyReq: CreateDuty) {
  console.log('🚀 ~ startDuty ~ createDutyReq:', createDutyReq);
  try {
    await axios.post(`/duties`, createDutyReq);
  } catch (error) {
    console.log('🚀 ~ startDuty ~ error:', error);
  }
}

export async function stopActiveDuty(dutyId: string) {
  try {
    await axios.post(`/duties/${dutyId}`);
  } catch (error) {
    console.log('🚀 ~ stopActiveDuty ~ error:', error);
  }
}
