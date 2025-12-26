import { makeObservable, observable } from 'mobx';

export interface IFilterChecker {
    checked: boolean;
    label: string;
    disabled?: boolean;
    filters: number[];
}

/**
 * Filter that represents a checkbox in the GUI
 */
export default class FilterChecker implements IFilterChecker {
    checked: boolean;
    label: string;
    disabled?: boolean;
    filters: number[];

    constructor(label: string, valid: boolean, filters: number[], disabled = false) {
        this.label = label;
        this.checked = valid;
        this.filters = filters;
        this.disabled = disabled;

        // Apply makeObservable after properties are initialized
        makeObservable(this, {
            checked: observable,
            disabled: observable,
            label: false, // 'label' doesn't need to be observable if it doesn't change
            filters: false // Similarly, 'filters' can be non-observable if it doesn't change
        });
    }
}
