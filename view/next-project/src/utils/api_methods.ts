export const get = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const getWithToken = async (url: string, currentUser: any) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': currentUser?.accessToken || 'none',
      client: currentUser?.client || 'none',
      uid: currentUser?.uid || 'none',
    },
  });
  return await res.json();
};

export const post = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res;
};

export const put = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res
};

export const putWithToken = async (url: string, data: any, currentUser: any) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access-token': currentUser?.accessToken || 'none',
      client: currentUser?.client || 'none',
      uid: currentUser?.uid || 'none',
    },
    body: JSON.stringify(data),
  });
  return res
};

export const del = async (url: string) => {
  const res = await fetch(url, { method: 'DELETE' });
  return res;
};
