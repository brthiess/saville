type QueryParamValue = string | number | boolean
export type QueryParams = Record<string, QueryParamValue | undefined | null>

interface DirectusItemsResponse<T> {
  data: T[]
}

interface DirectusErrorResponse {
  errors?: Array<{
    message?: string
  }>
}

export interface DirectusRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  params?: QueryParams
  body?: unknown
  token?: string
  fallbackErrorMessage?: string
}

export const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055'

function buildUrl(path: string, params: QueryParams = {}): URL {
  const url = new URL(path, `${DIRECTUS_URL.replace(/\/$/, '')}/`)

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  }

  return url
}

function createHeaders(token?: string, hasBody = false): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (hasBody) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

async function readDirectusErrorMessage(
  response: Response,
  fallbackErrorMessage: string,
): Promise<string> {
  try {
    const payload = (await response.json()) as DirectusErrorResponse
    const directusMessage = payload.errors?.[0]?.message

    if (directusMessage) {
      return directusMessage
    }
  } catch {
    // Ignore JSON parsing issues for error payloads.
  }

  return `${fallbackErrorMessage} (${response.status})`
}

export async function directusRequest<T>(
  path: string,
  options: DirectusRequestOptions = {},
): Promise<T> {
  const {
    method = 'GET',
    params,
    body,
    token,
    fallbackErrorMessage = 'Directus request failed',
  } = options

  const response = await fetch(buildUrl(path, params), {
    method,
    headers: createHeaders(token, body !== undefined),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error(await readDirectusErrorMessage(response, fallbackErrorMessage))
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()

  if (!text) {
    return undefined as T
  }

  return JSON.parse(text) as T
}

export async function fetchDirectusItems<T>(
  collection: string,
  params?: QueryParams,
): Promise<T[]> {
  const payload = await directusRequest<DirectusItemsResponse<T>>(`items/${collection}`, {
    params,
    fallbackErrorMessage: `Failed to fetch ${collection}`,
  })

  return Array.isArray(payload.data) ? payload.data : []
}
