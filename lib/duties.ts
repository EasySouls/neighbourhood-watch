import axios from 'axios';
import { CreateDuty, Duty } from '../types';

export async function fetchActiveDuties(departmentId: string): Promise<Duty[]> {
  try {
    const res = await axios.get(`/duties/department/${departmentId}/active`);
    return res.data;
  } catch (error) {
    console.error('🚀 ~ getActiveDuties ~ error:', error);
    return [];
  }
}

/**
 * Fetches the user's active duty, if there is one.
 * Doesn't need parameters, since it relies on the jwt token.
 * @returns The active duty of the current user or null if there is no active duty
 */
export async function fetchOwnActiveDuty(): Promise<Duty | null> {
  try {
    const res = await axios.get<Duty>(`/duties/active`);
    return res.data;
  } catch (error) {
    console.error('🚀 ~ getOwnActiveDuty ~ error:', error);
    return null;
  }
}

export async function startDuty(createDutyReq: CreateDuty) {
  console.log('🚀 ~ startDuty ~ createDutyReq:', createDutyReq);
  try {
    await axios.post(`/duties`, createDutyReq);
  } catch (error) {
    console.error('🚀 ~ startDuty ~ error:', error);
  }
}

export async function stopActiveDuty(dutyId: string) {
  try {
    await axios.post(`/duties/${dutyId}`);
  } catch (error) {
    console.error('🚀 ~ stopActiveDuty ~ error:', error);
  }
}

export async function fetchDuty(dutyId: string): Promise<Duty | null> {
  try {
    const duty = await axios.get(`duties/${dutyId}`);
    return duty.data;
  } catch (error) {
    console.error('🚀 ~ stopActiveDuty ~ error:', error);
    return null;
  }
}
