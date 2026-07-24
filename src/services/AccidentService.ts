
import { API_URL, API_ANYWAY_URL } from '../utils/globalEnvs';
import { GeoFilter } from "../types";
import axios from 'axios';

class AccidentService {
	apiUrl = API_URL || '';

	public fetchInvolvedList = async (
		filter: string, 
		geo: GeoFilter|null
	): Promise<any | undefined> => {
		// Default options are marked with *
		let url = `${API_ANYWAY_URL}/involved`;
		url += filter;
		const method = (geo == null)? 'GET' : 'POST';
		const response = await fetch(url, {
			method: method,
			mode: 'cors', 
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'include', 
			headers: {
				'Content-Type': 'application/json',
			},
			body: geo ? JSON.stringify(geo) : null,
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
		});
		if (!response.ok) {
			return [];
		}
		return await response.json(); // parses JSON response into native JavaScript objects
	};

	public fetchGroupBy = async (filter: string, geo: GeoFilter|null): Promise<Array<any> | undefined> => {
		// Default options are marked with *
		let url = `${API_ANYWAY_URL}/involved/groupby`;
		//let url = `${this.apiUrl}/api/v1/accident/groupby/`;
		url += filter;
		const method = (geo == null)? 'GET' : 'POST';
		// console.log(url);
		const response = await fetch(url, {
			method: method,
			mode: 'cors', 
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: geo ? JSON.stringify(geo) : null,
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
		});
		if (!response.ok) {
			return [];
		}
		return response.json(); // parses JSON response into native JavaScript objects
	};

	public getLatestCbsUpdateDate = async () => {
		// Default options are marked with *
		let url = `${API_ANYWAY_URL}/api/latest-cbs-update-date`;
		const response = await fetch(url, {
			method: 'GET',
			mode: 'cors', 
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'include', 
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
		});
		if (!response.ok) {
			return null;
		}
		return response.json();
	};

}
const AccidentServiceInstance = new AccidentService();
export default AccidentServiceInstance;
