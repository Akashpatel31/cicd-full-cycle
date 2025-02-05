import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  // Mock the global fetch function to simulate API responses
  global.fetch = jest.fn((url, options) => {
    // Mock response for the GET request to fetch the message
    if (url.endsWith('/')) {
      return Promise.resolve({
        json: () => Promise.resolve({ message: 'Hello from backend' }),
      });
    }

    // Mock response for the POST request to submit data
    if (url.endsWith('/data') && options?.method === 'POST') {
      return Promise.resolve({
        json: () => Promise.resolve(['Alice clicked button', 'Bob clicked button']),
      });
    }

    // Mock response for the GET request to fetch existing data
    return Promise.resolve({
      json: () => Promise.resolve(['Alice clicked button']),
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Frontend Tests', () => {
  it('should display the message from the backend on load', async () => {
    render(<App />);

    // Wait for the message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Hello from backend')).toBeInTheDocument();
    });
  });

  it('should submit the form and update the data list', async () => {
    render(<App />);

    // Simulate form input and submission
    const input = screen.getByPlaceholderText('Enter something...');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: 'Bob clicked button' } });
    fireEvent.click(submitButton);

    // Wait for the updated data to appear
    await waitFor(() => {
      expect(screen.getByText('Alice clicked button')).toBeInTheDocument();
      expect(screen.getByText('Bob clicked button')).toBeInTheDocument();
    });
  });

  it('should not submit empty input', async () => {
    render(<App />);

    // Simulate submitting an empty input
    const input = screen.getByPlaceholderText('Enter something...');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(submitButton);

    // Wait for the form to not update the list with empty data
    await waitFor(() => {
      expect(screen.queryByText('No data available')).not.toBeInTheDocument();
    });
  });

  global.fetch = jest.fn((url, options) => {
    if (url.endsWith('/data')) {
      return Promise.resolve({
        json: () => Promise.resolve(['Alice clicked button']),
      });
    }
  
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });  
});
