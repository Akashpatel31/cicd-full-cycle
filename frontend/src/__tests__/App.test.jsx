import '@testing-library/jest-dom';  // This is necessary for .toBeInTheDocument matcher
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  // Mock fetch globally using jest.spyOn
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ message: 'Hello from Backend!' })
  });
});

test('renders React frontend and displays backend message', async () => {
  // Render the component
  render(<App />);

  // Wait for the static text to appear (this allows time for rendering)
  await waitFor(() => expect(screen.getByText(/React Frontend and it is too/i)).toBeInTheDocument());

  // Wait for the async fetch to complete and check for the backend message
  await waitFor(() => expect(screen.getByText(/Hello from Backend!/)).toBeInTheDocument());

  // Optionally check if the fetch was called once
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith("https://cicd-backend.onrender.com/");  // Ensure it's making the correct API call
});

// Reset mocks after each test to avoid interference
afterEach(() => {
  jest.restoreAllMocks(); // This will restore the fetch mock to its original state
});
