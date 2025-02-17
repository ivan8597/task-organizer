import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

// Мокаем модуль api
jest.mock('./api');

// Создаем QueryClient для тестов
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Оборачиваем компонент в провайдер для тестов
const renderWithQueryClient = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    // Очищаем состояние QueryClient перед каждым тестом
    queryClient.clear();
  });

  test('renders Task Organizer title', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('Task Organizer')).toBeInTheDocument();
  });

  test('adds a new task', async () => {
    renderWithQueryClient(<App />);
    
    // Находим поле ввода и кнопку
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add Task');

    // Вводим текст и нажимаем кнопку
    fireEvent.change(input, { target: { value: 'New Test Task' } });
    fireEvent.click(addButton);

    // Проверяем, что задача появилась в списке
    await waitFor(() => {
      expect(screen.getByText('New Test Task')).toBeInTheDocument();
    });
  });

  test('edits existing task', async () => {
    renderWithQueryClient(<App />);
    
    // Добавляем задачу
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add Task');
    fireEvent.change(input, { target: { value: 'Task to Edit' } });
    fireEvent.click(addButton);

    // Нажимаем кнопку редактирования
    await waitFor(() => {
      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);
    });

    // Редактируем задачу
    const editInput = screen.getByDisplayValue('Task to Edit');
    fireEvent.change(editInput, { target: { value: 'Edited Task' } });
    
    // Сохраняем изменения
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Проверяем, что задача обновилась
    await waitFor(() => {
      expect(screen.getByText('Edited Task')).toBeInTheDocument();
    });
  });

  test('deletes a task', async () => {
    renderWithQueryClient(<App />);
    
    // Добавляем задачу
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add Task');
    fireEvent.change(input, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);

    // Ждем появления задачи и удаляем её
    await waitFor(() => {
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);
    });

    // Проверяем, что задача удалена
    await waitFor(() => {
      expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
    });
  });

  test('validates empty input', () => {
    renderWithQueryClient(<App />);
    
    // Пытаемся добавить пустую задачу
    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);

    // Проверяем, что пустая задача не добавилась
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
}); 