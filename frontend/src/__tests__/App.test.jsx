import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock API calls
beforeEach(() => {
  global.fetch = jest.fn().mockImplementation((url, options) => {
    if (url.endsWith('/interactions') && options?.method === 'POST') {
      return Promise.resolve({
        json: () => Promise.resolve({ user: 'Alice', action: 'clicked button' })
      });
    }

    return Promise.resolve({
      json: () => Promise.resolve([{ user: 'Alice', action: 'clicked button' }])
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Frontend Tests', () => {
  it('should render the header', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /React Frontend/i })).toBeInTheDocument();
  });

  it('should fetch and display user interactions', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Alice clicked button/i)).toBeInTheDocument();
    });
  });

  it('should allow user input and trigger an API call', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/enter your name/i);
    const button = screen.getByText(/submit/i);

    fireEvent.change(input, { target: { value: 'Bob' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/interactions'), expect.objectContaining({ method: 'POST' }));
      expect(screen.getByText(/Alice clicked button/i)).toBeInTheDocument();
      expect(screen.getByText(/Bob clicked button/i)).toBeInTheDocument();
    });
  });
});
