import { observable} from 'mobx';

export interface IFilterChecker {
    checked: boolean;
    label: string;
    filters: any[];
}
/**
 * filter that represnt a check - box in gui
 */
export default class FilterChecker implements IFilterChecker {
    @observable
    checked: boolean;

    label: string;

    filters: any[];

    constructor(label: string, valid: boolean, filters: any[]) {
      this.label = label;
      this.checked = valid;
      this.filters = filters;
    }
}
