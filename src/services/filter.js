
export const FILTER_ALL = 'all';
export const FILTER_ACTIVE = 'active';
export const FILTER_DONE = 'done';

export function getOptions() {
    return {
        [FILTER_ALL]: FILTER_ALL,
        [FILTER_ACTIVE]: FILTER_ACTIVE,
        [FILTER_DONE]: FILTER_DONE
    };
}

export function applyFilter(items, filter) {
    if (filter === FILTER_DONE) {
        return items.filter(item => item.done === true);
    }

    if (filter === FILTER_ACTIVE) {
        return items.filter(item => item.done === false);
    }

    return [...items];
}
