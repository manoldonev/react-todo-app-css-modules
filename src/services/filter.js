export const filterOptions = {
  all: 'all',
  active: 'active',
  done: 'done',
};

export function filter(items, filterMode) {
  if (filterMode === filterOptions.done) {
    return items.filter((item) => item.done);
  }

  if (filterMode === filterOptions.active) {
    return items.filter((item) => !item.done);
  }

  return [...items];
}

export function search(items, query) {
  const queryString = query.toLowerCase();
  if (query == null) {
    return [...items];
  }

  return items.filter((item) => item.text.toLowerCase().includes(queryString));
}
