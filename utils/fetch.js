import { cookies } from "next/headers";

const BASE_URL = "http://preview.kft.co.com/ticket/api";

const getFetch = async (url, headers = {}, isRetry = false) => {
  const fullUrl = `${BASE_URL}/${url}`;

  let res = await fetch(fullUrl, {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });

  if (res.status === 401 && !isRetry) {
    const newToken = await internalRefreshToken();

    if (newToken) {
      const { Authorization, ...restHeaders } = headers;
      return getFetch(
        url,
        { ...restHeaders, Authorization: `Bearer ${newToken}` },
        true
      );
    }
  }

  if (!res.ok) throw new Error(`Failed... ${res.status}`);
  return await res.json();
};

const postFetch = async (url, body, headers = {}, isRetry = false) => {
  const fullUrl = `${BASE_URL}/${url}`;

  let res = await fetch(fullUrl, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 401 && !isRetry) {
    const newToken = await internalRefreshToken();
    if (newToken) {
      const { Authorization, ...restHeaders } = headers;
      return postFetch(
        url,
        body,
        { ...restHeaders, Authorization: `Bearer ${newToken}` },
        true
      );
    }
  }

  if (!res.ok) throw new Error(`Failed... ${res.status}`);
  return await res.json();
};

async function internalRefreshToken() {
  try {
    const cookieStore = await cookies();
    const refresh = cookieStore.get("refresh_token")?.value;

    if (!refresh) {
      return null;
    }

    const response = await fetch(`${BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refresh }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const newToken = data.access || data.token;

    if (newToken) {
      return newToken;
    }

    return null;
  } catch (e) {
    console.error("--- [DEBUG] Error in internalRefreshToken:", e);
    return null;
  }
}

export { getFetch, postFetch };
