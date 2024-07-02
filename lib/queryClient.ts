import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const initAxios = () => {
  axios.defaults.baseURL = process.env.EXPO_PUBLIC_BACKEND_URL;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';

  // Add a request interceptor if needed

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (Array.isArray(error?.response?.data?.message)) {
        return Promise.reject({
          ...error.response.data,
          message: error.response.data.message.join(', '),
        });
      }
      if (error?.response?.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});
