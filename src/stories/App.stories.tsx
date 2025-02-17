import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';

const queryClient = new QueryClient();

const meta = {
  title: 'App/TaskOrganizer',
  component: App,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTasks: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/tasks',
        method: 'GET',
        status: 200,
        response: [
          {
            id: 1,
            title: 'Первая задача',
            completed: false
          },
          {
            id: 2,
            title: 'Вторая задача',
            completed: true
          }
        ]
      }
    ]
  }
}; 