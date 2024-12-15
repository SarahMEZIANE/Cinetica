import { renderHook, act } from '@testing-library/react-hooks';
import { usePopularShows } from '../hooks/usePopularShows';
import { fetchPopularShows } from '@/app/repository/PopularShows';

vi.mock('@/app/repository/PopularShows');

describe('usePopularShows', () => {
  it('fetches shows successfully', async () => {
    const showsData = [{ id: 1, name: 'Test Show' }];
    fetchPopularShows.mockResolvedValueOnce(showsData);

    const { result } = renderHook(() => usePopularShows());

    await act(async () => {
      await result.current.fetchShows();
    });

    expect(result.current.shows).toEqual(showsData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    fetchPopularShows.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => usePopularShows());

    await act(async () => {
      await result.current.fetchShows();
    });

    expect(result.current.shows).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('An error occurred while fetching the shows');
  });
});