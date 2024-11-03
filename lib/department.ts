import axios from 'axios';
import { Department } from '../types';

export async function fetchDepartmentInfo(
  departmentId: string,
): Promise<Department> {
  try {
    const response = await axios.get(`/departments/${departmentId}/info`);
    return response.data;
  } catch {
    throw new Error('Failed to fetch department info');
  }
}
