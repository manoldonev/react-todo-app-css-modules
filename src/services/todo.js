
export function getAll() {
    return [
        {
            id: '1',
            text: 'Learn JavaScript',
            done: true
        },
        {
            id: '2',
            text: 'Learn React',
            done: false
        },
        {
            id: '3',
            text: 'Build a React app',
            done: false
        }
    ];
}

export function createNew({ id, text }) {
    return { id, text, done: false };
}