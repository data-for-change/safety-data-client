const resolveApiBase = (envValue: string | undefined): string => {
	const base = envValue ?? '';
	if (import.meta.env.DEV && (base.includes('localhost') || base.includes('127.0.0.1'))) {
		return '';
	}
	return base;
};

export const API_URL = resolveApiBase(import.meta.env.VITE_API_URL as string | undefined);
export const API_ANYWAY_URL = resolveApiBase(import.meta.env.VITE_API_ANYWAY_URL as string | undefined);
