import fetch from 'node-fetch'

export const get = async (url: string) => {
  await fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
};

export const get_with_token = async (url: string) => {
  await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": 'application/json',
      "access-token": localStorage.getItem("access-token") || "none",
    }
  })
};

export const post = async (url: string) => {
  await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    }
  })
};

