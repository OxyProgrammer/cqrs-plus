import { Post } from '@/models/models';

const BASE_URL: string = 'http://localhost:5000/api/v1';
export const getUrl = (relativeUrl: string): string => {
  return `${BASE_URL}/${relativeUrl}`;
};

export const getGETRequest = (): RequestInit => {
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  let request: RequestInit = {
    method: 'GET',
    headers: headers,
  };
  return request;
};




