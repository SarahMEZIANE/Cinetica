import { renderHook, act } from '@testing-library/react-hooks';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { fetchPopularMovies } from '@/app/repository/PopularMovies';
import { vi } from 'vitest';

vi.mock('@/app/repository/PopularMovies');

describe('usePopularMovies', () => {
  it('fetches movies successfully', async () => {
    const moviesData = [{ id: 1, title: 'Test Movie' }];
    (fetchPopularMovies as jest.Mock).mockResolvedValueOnce(moviesData);

    const { result } = renderHook(() => usePopularMovies());

    await act(async () => {
      await result.current.fetchMovies();
    });

    expect(result.current.movies).toEqual(moviesData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    (fetchPopularMovies as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => usePopularMovies());

    await act(async () => {
      await result.current.fetchMovies();
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('An error occurred while fetching the movies');
  });
});