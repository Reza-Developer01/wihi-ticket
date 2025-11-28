const BASE_URL = "http://preview.kft.co.com/ticket/api";

const getFetch = async (url, headers = {}) => {
  const res = await fetch(`${BASE_URL}/${url}`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return await res.json();
};

const postFetch = async (url, body, headers = {}) => {
  const res = await fetch(`${BASE_URL}/${url}`, {
    cache: "no-store",
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to post: ${res.status}`);
  }

  return await res.json();
};

export { getFetch, postFetch };
