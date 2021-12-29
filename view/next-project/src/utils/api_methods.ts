export const get = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const get_with_token = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token') || 'none',
      client: localStorage.getItem('client') || 'none',
      uid: localStorage.getItem('uid') || 'none',
    },
  });
  return response.json();
};

export const post = async (url: string, keys: Array<string>, values: Array<any>) => {
  const params = new URLSearchParams();
  keys.map((keys: string, idx: number) => {
    params.append(keys[idx], values[idx]);
    console.log(params);
  });
  console.log(params);
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: params,
  });
};
