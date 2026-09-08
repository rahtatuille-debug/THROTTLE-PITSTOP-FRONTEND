const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

/**
 * Thin fetch wrapper for the Django API. Throws on non-2xx so callers
 * can decide how to handle errors (show empty state, log, etc.)
 */
async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Product data changes when you edit it in admin - don't cache stale results
    cache: "no-store",
  });

  if (!res.ok) {
    // Attach the parsed body (when present) so callers that need
    // field-level detail - e.g. checkout stock-validation errors - can
    // read it, without changing behavior for callers that just want
    // err.message.
    let body = null;
    try {
      body = await res.json();
    } catch (err) {
      // Response wasn't JSON - fine, body stays null.
    }
    const error = new Error(`API request to ${path} failed with status ${res.status}`);
    error.status = res.status;
    error.body = body;
    throw error;
  }

  return res.json();
}

export function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/products/${query ? `?${query}` : ""}`);
}

export function getProduct(slug) {
  return apiFetch(`/products/${slug}/`);
}

export function getCategories() {
  return apiFetch(`/categories/`);
}

export function createOrder(payload) {
  return apiFetch(`/orders/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getOrder(id) {
  return apiFetch(`/orders/${id}/`);
}
