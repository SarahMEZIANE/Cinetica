import { renderHook, act } from '@testing-library/react';
import { usePopularMovies } from '../hooks/usePopularMovies';

describe('usePopularMovies', () => {
  it('fetches movies successfully', async () => {
    const { result } = renderHook(() => usePopularMovies());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.fetchMovies();
    });

    expect(result.current.movies).toHaveLength(1);
    expect(result.current.movies[0].title).toBe('Test Movie');
  });
});
