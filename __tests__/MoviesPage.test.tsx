import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoviesPage from '../app/dashboard/movies/popular/page';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { usePage } from '../hooks/usePage';

// Mock the hooks
vi.mock('../hooks/usePopularMovies');
vi.mock('../hooks/usePage');

describe('MoviesPage', () => {
  const mockFetchMovies = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock implementation for usePopularMovies
    vi.mocked(usePopularMovies).mockReturnValue({
      movies: [
        {
          id: 1,
          title: 'Test Movie',
          overview: 'Test Overview',
          poster_path: '/test.jpg',
          release_date: '2023-01-01',
          vote_average: 8,
          popularity: 8,
          backdrop_path: 'img.png',
          cast: [],
          trailer:{id:1, key:'key',site:'youtube',type:'trailer'}
        },
      ],
      loading: false,
      error: null,
      fetchMovies: mockFetchMovies,
    });

    // Mock implementation for usePage
    vi.mocked(usePage).mockReturnValue({
      currentPage: 1,
      handlePageChange: vi.fn(),
    });
  });

  afterEach(() => {
    // Clean up DOM after each test
    cleanup();
  });

  it('renders the page title correctly', () => {
    render(<MoviesPage />);
    expect(screen.getByText('Popular Movies')).toBeInTheDocument();
  });

  it('displays pagination controls', () => {
    render(<MoviesPage />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<MoviesPage />);
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('shows loading state', () => {
    vi.mocked(usePopularMovies).mockReturnValue({
      movies: [],
      loading: true,
      error: null,
      fetchMovies: mockFetchMovies,
    });

    render(<MoviesPage />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    vi.mocked(usePopularMovies).mockReturnValue({
      movies: [],
      loading: false,
      error: 'Failed to fetch movies',
      fetchMovies: mockFetchMovies,
    });

    render(<MoviesPage />);
    expect(screen.getByText('Failed to fetch movies')).toBeInTheDocument();
  });
});
