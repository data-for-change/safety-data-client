const { MODE } = import.meta.env;

export const environment = {
	isLocalMode: MODE === 'dev_local',
};
