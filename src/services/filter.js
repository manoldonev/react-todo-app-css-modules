
export const filterOptions = {
    all: 'all',
    active: 'active',
    done: 'done'
};

export function applyFilter(items, filter) {
    if (filter === filterOptions.done) {
        return items.filter(item => item.done === true);
    }

    if (filter === filterOptions.active) {
        return items.filter(item => item.done === false);
    }

    return [...items];
}

export function search(items, query) {
    const queryString = query.toLowerCase();
    if (query == null) {
        return [...items];
    }

    return items.filter(item => item.text.toLowerCase().indexOf(queryString) !== -1);
}
