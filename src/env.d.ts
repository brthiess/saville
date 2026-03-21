/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DIRECTUS_URL: string
	readonly VITE_DIRECTUS_ADMIN_URL?: string
	readonly VITE_DIRECTUS_ENFORCE_MEMBER_ROLE?: string
	readonly VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
