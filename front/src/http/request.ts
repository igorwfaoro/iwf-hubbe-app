// interface RequestParams {
//   method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
//   params: any;
//   headers: any;
//   body: any;
// }

// export const request = async <T>(
//   url: string,
//   { method = 'GET', params, headers, body }: Partial<RequestParams> = {}
// ): Promise<T> => {
//   try {
//     const queryParams: any = {};
//     if (params)
//       Object.entries(params).map(
//         ([key, value]) => (queryParams[String(key)] = String(value))
//       );

//     const response = await fetch(
//       `${url}${params ? '?' + new URLSearchParams(queryParams) : ''}`,
//       {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           ...headers
//         },
//         body: JSON.stringify(body) || undefined
//       }
//     );

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// };

import axios, { AxiosError } from 'axios';
import { createStorageService } from '../services/storage.service';

const storage = createStorageService();

export const httpRequest = () =>
  axios.create({
    headers: {
      Authorization: `Bearer ${storage.getData().token}`
    }
  });

export const mapHttpError = (error: AxiosError) => {
  console.log({ error });
  return (
    (error.response?.data as any).message ||
    error.response?.statusText ||
    'Unknown Error'
  );
};
