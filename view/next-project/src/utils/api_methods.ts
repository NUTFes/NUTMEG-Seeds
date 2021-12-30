export const get = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const get_with_token = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token') || 'none',
      client: localStorage.getItem('client') || 'none',
      uid: localStorage.getItem('uid') || 'none',
    },
  });
  return await res.json();
};

export const post = async (url: string, data: any) => {
  console.log(data);
  console.log(JSON.stringify(data));
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const oldPost = async (url: string, keys: Array<string>, values: Array<any>) => {
  const params = new URLSearchParams();
  keys.map((keys: string, idx: number) => {
    params.append(keys[idx], values[idx]);
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: params,
  });
  return await res.json();
};
