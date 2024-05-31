
const BASE_URL: string = 'http://localhost:5000/api/v1';
export const getUrl = (relativeUrl: string): string => {
  return `${BASE_URL}/${relativeUrl}`;
};

export const getRequest = (verb: string, body?: any): RequestInit => {
  if (
    verb !== 'GET' &&
    verb !== 'PUT' &&
    verb !== 'POST' &&
    verb !== 'DELETE'
  ) {
    throw new Error('Dont give crap verb!');
  }
  if (verb === 'GET' && body) {
    throw new Error('How would a get request have a body?');
  }
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  let request: RequestInit = {
    method: verb,
    headers: headers,
  };
  if (body) {
    request.body = JSON.stringify(body);
  }
  return request;
};