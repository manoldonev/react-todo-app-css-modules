
export function getAll() {
    return [
        {
            id: '1',
            text: 'Learn JavaScript',
            completed: true
        },
        {
            id: '2',
            text: 'Learn React',
            completed: false
        },
        {
            id: '3',
            text: 'Build a React app',
            completed: false
        }
    ];
}

export function createNew({ id, text }) {
    return { id, text, completed: false };
}