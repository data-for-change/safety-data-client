/**
 * Feature Flags Utility
 * This utility manages the visibility of new or experimental features.
 */

// Check if we are running in production
const isProd = import.meta.env.PROD;

export enum FeatureFlags {
	RISK_MODEL = 'RISK_MODEL',
	AUTH = 'AUTH',
}

export const FEATURE_FLAGS = {
	/**
	 * Risk Hotspot Model feature
	 * Disabled in production for now.
	 */
	RISK_MODEL: true,

	/**
	 * New Redirect-based Authentication flow
	 * Disabled in production for now.
	 */
	AUTH: true,
};

/**
 * Helper to check if a specific feature is enabled.
 * Usage: if (isFeatureEnabled('RISK_MODEL')) { ... }
 */
export const isFeatureEnabled = (feature: FeatureFlags): boolean => {
	return FEATURE_FLAGS[feature] ?? false;
};
