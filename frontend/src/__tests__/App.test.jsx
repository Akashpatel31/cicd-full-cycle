import { render, screen, waitFor } from '@testing-library/react';
import App from '../App'; // Adjust the path to your App component

// Mock fetch for testing
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Hello from Backend!' }),
  })
);

test('renders React frontend and displays backend message', async () => {
  render(<App />);

  // Wait for the static text to appear (this allows time for rendering)
  await waitFor(() => expect(screen.getByText(/React Frontend and it is too/i)).toBeInTheDocument());

  // Wait for the async fetch to complete and check for the backend message
  await waitFor(() => expect(screen.getByText(/Hello from Backend!/)).toBeInTheDocument());
});
