import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getAll } from '../../services/todo';
import styles from '../TodoList/TodoItem/TodoItem.module.scss';
import App from './App';

describe('TodoList', () => {
    test('renders initial state', () => {
        render(<App />);
        const titleElement = screen.getByText(/things to do/i);
        expect(titleElement).toBeInTheDocument();

        const counterElement = screen.getByTestId('counter');
        expect(counterElement).toHaveTextContent(/3 items left/i);

        const listElement = screen.getByTestId(/todo-list/i);
        const listScope = within(listElement);
        const itemElements = listScope.getAllByRole('listitem');
        expect(itemElements.length).toEqual(3);
        expect(itemElements[0].className).toContain(styles.TodoItem____done);
        expect(itemElements[1].className).not.toContain(styles.TodoItem____done);
        expect(itemElements[2].className).not.toContain(styles.TodoItem____done);

        const itemCheckboxes = listScope.getAllByRole('checkbox');
        expect(itemCheckboxes.length).toEqual(3);
        expect(itemCheckboxes[0]).toBeChecked();
        expect(itemCheckboxes[1]).not.toBeChecked();
        expect(itemCheckboxes[2]).not.toBeChecked();

        getAll().map(dataItem => {
            const element = screen.getByText(new RegExp(dataItem.text, 'i'));
            expect(element).toBeInTheDocument();
        });
    });

    test('toggles filter mode', () => {
        render(<App />);

        const listElement = screen.getByTestId(/todo-list/i);
        const listScope = within(listElement);
        let itemElements = listScope.getAllByRole('listitem');
        expect(itemElements.length).toEqual(3);

        let filterElement = screen.getByText(/active/i);
        userEvent.click(filterElement);
        itemElements = listScope.getAllByRole('listitem');
        expect(itemElements.length).toEqual(2);

        filterElement = screen.getByText(/done/i);
        userEvent.click(filterElement);
        itemElements = listScope.getAllByRole('listitem');
        expect(itemElements.length).toEqual(1);

        filterElement = screen.getByText(/all/i);
        userEvent.click(filterElement);
        itemElements = listScope.getAllByRole('listitem');
        expect(itemElements.length).toEqual(3);
    });

    test('toggles mode via keyboard', () => {
        render(<App />);

        let inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();

        const escapeMessage = 'Press `Esc` to cancel.';
        let infoElement = screen.getByText(new RegExp(escapeMessage, 'i'));
        expect(infoElement).toBeInTheDocument();

        userEvent.keyboard('{escape}');

        inputElement = screen.queryByRole('textbox');
        expect(inputElement).toBeNull();

        const addSearchMessage = 'Press `Shift + S` to search and `Shift + A` to create a new item'
        expect(infoElement).toHaveTextContent(addSearchMessage);

        userEvent.keyboard('{shift}{S}');
        inputElement = screen.getByPlaceholderText(/Search/i);
        expect(inputElement).toBeInTheDocument();
        expect(infoElement).toHaveTextContent(escapeMessage);

        userEvent.keyboard('{shift}{A}');
        inputElement = screen.getByPlaceholderText(/Add new/i);
        expect(inputElement).toBeInTheDocument();
        expect(infoElement).toHaveTextContent(escapeMessage);
    });

    test('toggles mode via UI elements', () => {
        render(<App />);

        const searchElement = screen.getByTestId(/action-search/i);
        expect(searchElement).toBeInTheDocument();
        userEvent.click(searchElement);

        let inputElement = screen.getByPlaceholderText(/Search/i);
        expect(inputElement).toBeInTheDocument();
        const escapeMessage = 'Press `Esc` to cancel.';
        let infoElement = screen.getByText(new RegExp(escapeMessage, 'i'));
        expect(infoElement).toBeInTheDocument();

        const addElement = screen.getByTestId(/action-add/i);
        expect(addElement).toBeInTheDocument();
        userEvent.click(addElement);

        inputElement = screen.getByPlaceholderText(/Add new/i);
        expect(inputElement).toBeInTheDocument();
        expect(infoElement).toBeInTheDocument();
        expect(infoElement).toHaveTextContent(escapeMessage);
    });

    test('adds new item', () => {
        render(<App />);

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();

        const itemToAdd = 'Learn Test Library';
        let newElement = screen.queryByText(new RegExp(itemToAdd, 'i'));
        expect(newElement).toBeNull();

        userEvent.type(inputElement, 'Learn Test Library');
        userEvent.keyboard('{enter}');

        newElement = screen.getByText(new RegExp(itemToAdd, 'i'));
        expect(newElement).toBeInTheDocument();
    });

    test('searches for an item', () => {
        render(<App />);

        userEvent.keyboard('{shift}{S}');

        let inputElement = screen.getByPlaceholderText(/Search/i);
        expect(inputElement).toBeInTheDocument();

        userEvent.type(inputElement, 'lear');

        let listElement = screen.getByTestId(/todo-list/i);
        let listScope = within(listElement);
        expect(listScope.getAllByRole('listitem').length).toEqual(2);

        userEvent.type(inputElement, 'n re');
        expect(listScope.getAllByRole('listitem').length).toEqual(1);

        userEvent.type(inputElement, 'act 123');
        expect(listElement).not.toBeInTheDocument();

        const infoElement = screen.getByText(/There are no items./i);
        expect(infoElement).toBeInTheDocument();

        userEvent.clear(inputElement);
        listElement = screen.getByTestId(/todo-list/i);
        listScope = within(listElement);
        expect(listScope.getAllByRole('listitem').length).toEqual(3);
        expect(infoElement).not.toBeInTheDocument();
    });

    test('checks/unchecks an item', () => {
        render(<App />);

        const todoElement = screen.getByText(/Learn React/i);
        expect(todoElement).toBeInTheDocument();
        const checkboxElement = within(todoElement).getByRole('checkbox');
        expect(checkboxElement).not.toBeChecked();

        const itemsList = screen.getByTestId(/todo-list/i);
        const listScope = within(itemsList);
        const listItem = listScope.getAllByRole('listitem')[1];
        expect(listItem.className).not.toContain(styles.TodoItem____done);

        userEvent.click(todoElement);
        expect(checkboxElement).toBeChecked();
        expect(listItem.className).toContain(styles.TodoItem____done);

        userEvent.click(checkboxElement);
        expect(checkboxElement).not.toBeChecked();
        expect(listItem.className).not.toContain(styles.TodoItem____done);
    });
});