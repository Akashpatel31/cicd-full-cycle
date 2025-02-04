import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';  // Adjust the path if necessary

// Mocking the fetch call globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Hello from Backend!' }),
  })
);

test('renders React frontend and displays backend message', async () => {
  render(<App />);

  // Check if the static text is rendered
  expect(screen.getByText(/React Frontend and it is too/i)).toBeInTheDocument();

  // Wait for the async fetch to complete and check for the message
  await waitFor(() => expect(screen.getByText(/Hello from Backend!/)).toBeInTheDocument());
});

afterEach(() => {
  jest.clearAllMocks();  // Reset mocks to avoid interference
});
