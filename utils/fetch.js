const BASE_URL = "http://preview.kft.co.com/ticket/api";

/**
 * Helper to safely read response body (try json, fallback to text)
 */
const readResponseBody = async (res) => {
  try {
    const json = await res.clone().json();
    return { type: "json", body: json };
  } catch (e) {
    try {
      const text = await res.clone().text();
      return { type: "text", body: text };
    } catch (err) {
      return { type: "empty", body: null };
    }
  }
};

const getFetch = async (url, headers = {}) => {
  const fullUrl = `${BASE_URL}/${url}`;
  const start = Date.now();

  // لاگ درخواست
  console.log("[getFetch] requesting:", {
    url: fullUrl,
    method: "GET",
    headers,
    timestamp: new Date().toISOString(),
  });

  let res;
  try {
    res = await fetch(fullUrl, {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
    });
  } catch (networkErr) {
    console.error("[getFetch] network error for", fullUrl, networkErr);
    throw networkErr; // bubble up
  }

  const duration = Date.now() - start;

  if (!res.ok) {
    const bodyInfo = await readResponseBody(res);
    console.error("[getFetch] response NOT OK:", {
      url: fullUrl,
      status: res.status,
      statusText: res.statusText,
      durationMs: duration,
      responseBodyType: bodyInfo.type,
      responseBody: bodyInfo.body,
      responseHeaders: Object.fromEntries(
        res.headers.entries ? res.headers.entries() : []
      ),
    });

    // پر کردن خطای دقیق برای caller
    throw new Error(
      `[getFetch] Failed to fetch ${fullUrl} - status: ${res.status} ${
        res.statusText
      } - body: ${
        bodyInfo.type === "json"
          ? JSON.stringify(bodyInfo.body)
          : String(bodyInfo.body)
      }`
    );
  }

  // موفقیت — لاگ خلاصه
  const successBody = await res
    .clone()
    .json()
    .catch(async () => {
      const t = await res
        .clone()
        .text()
        .catch(() => null);
      return t;
    });

  console.log("[getFetch] success:", {
    url: fullUrl,
    status: res.status,
    durationMs: duration,
    bodyPreview:
      typeof successBody === "string"
        ? successBody.slice(0, 200)
        : JSON.stringify(successBody).slice(0, 200),
  });

  return await res.json();
};

const postFetch = async (url, body, headers = {}) => {
  const fullUrl = `${BASE_URL}/${url}`;
  const start = Date.now();

  // لاگ درخواست (بدون لاگ کامل body اگر حساس باشه — اما الان لاگ می‌کنیم برای دیباگ)
  console.log("[postFetch] requesting:", {
    url: fullUrl,
    method: "POST",
    headers,
    bodyPreview:
      body && typeof body === "object"
        ? JSON.stringify(body).slice(0, 1000)
        : String(body).slice(0, 1000),
    timestamp: new Date().toISOString(),
  });

  let res;
  try {
    res = await fetch(fullUrl, {
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
  } catch (networkErr) {
    console.error("[postFetch] network error for", fullUrl, networkErr);
    throw networkErr;
  }

  const duration = Date.now() - start;

  if (!res.ok) {
    const bodyInfo = await readResponseBody(res);
    console.error("[postFetch] response NOT OK:", {
      url: fullUrl,
      status: res.status,
      statusText: res.statusText,
      durationMs: duration,
      requestBodyPreview:
        body && typeof body === "object"
          ? JSON.stringify(body).slice(0, 1000)
          : String(body),
      responseBodyType: bodyInfo.type,
      responseBody: bodyInfo.body,
      responseHeaders: Object.fromEntries(
        res.headers.entries ? res.headers.entries() : []
      ),
    });

    throw new Error(
      `[postFetch] Failed to post ${fullUrl} - status: ${res.status} ${
        res.statusText
      } - body: ${
        bodyInfo.type === "json"
          ? JSON.stringify(bodyInfo.body)
          : String(bodyInfo.body)
      }`
    );
  }

  // موفقیت
  const successBody = await res
    .clone()
    .json()
    .catch(async () => {
      const t = await res
        .clone()
        .text()
        .catch(() => null);
      return t;
    });

  console.log("[postFetch] success:", {
    url: fullUrl,
    status: res.status,
    durationMs: duration,
    bodyPreview:
      typeof successBody === "string"
        ? successBody.slice(0, 200)
        : JSON.stringify(successBody).slice(0, 200),
  });

  return await res.json();
};

export { getFetch, postFetch };
