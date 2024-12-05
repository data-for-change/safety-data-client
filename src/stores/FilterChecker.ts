import { observable} from 'mobx';

export interface IFilterChecker {
    checked: boolean;
    label: string;
    filters: number[];
}
/**
 * filter that represnt a check - box in gui
 */
export default class FilterChecker implements IFilterChecker {
    @observable
    checked: boolean;

    label: string;

    filters: any[];

    constructor(label: string, valid: boolean, filters: number[]) {
      this.label = label;
      this.checked = valid;
      this.filters = filters;
    }
}
