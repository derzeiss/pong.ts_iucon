export function readJson<T>(url: string, init?: RequestInit) {
  return fetch(url, init).then(parseJsonResponse) as Promise<T>;
}

export function postJson<TPost, TReturn>(url: string, data?: TPost, init?: RequestInit) {
  return fetch(url, getRequestInit(data, init)).then(parseJsonResponse) as Promise<TReturn>;
}

export const parseErrorIfJsonAsync = async (err: any) => {
  if (!err) return null;
  if (!err.body) return err;
  return await err.json();
};

const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const getRequestInit = (data: any, init?: RequestInit) => ({
  method: 'post',
  body: JSON.stringify(data),
  ...init,
  headers: Object.assign({}, getDefaultHeaders(), init?.headers),
});

const parseJsonResponse = (res: Response) => {
  if (res.ok && res.status !== 204 && res.body) return res.json();
  return Promise.reject(res);
};
