![ci workflow](https://github.com/manoldonev/react-todo-app-css-modules/actions/workflows/main.yml/badge.svg)

Latest deployment available at https://manoldonev.github.io/react-todo-app-css-modules/

# React Todo App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and represents a basic JavaScript todo web app implemented with React.

## Infrastructure

- ESLint
- Prettier
- pre-commit hooks
- CI GitHub workflow

## UX

- Combination of Sass, CSS modules, and a modified BEM naming convention

## State Management

- Homegrown state reducer pattern (based on React Hooks and React Context)

## Data (Async State Management)

- None (hardcoded in-memory data)

## Testing

The app is pretty basic so testing is performed on the `App` component level (and not on the building blocks) and relies on a combination of Jest and the React Testing Library.
