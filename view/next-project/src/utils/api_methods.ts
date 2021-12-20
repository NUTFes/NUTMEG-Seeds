import fetch from 'node-fetch'

type Url = {
  url?: URL 
}

const get = async (url: Url) => {
  await fetch(url, {
  })
};

export default get;
