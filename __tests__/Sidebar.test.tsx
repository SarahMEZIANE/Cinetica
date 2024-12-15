import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../app/dashboard/Sidebar';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}));

describe('Sidebar', () => {
  const defaultProps = {
    sidebarOpen: true,
    toggleSidebar: vi.fn(),
    active: '',
    setActive: vi.fn(),
    handleSignOut: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all navigation sections', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
  });

  it('handles sidebar toggle', () => {
    render(<Sidebar {...defaultProps} />);
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(defaultProps.toggleSidebar).toHaveBeenCalled();
  });

  it('applies active styles to selected item', () => {
    render(<Sidebar {...defaultProps} active="movies-popular" />);
    const popularMoviesButton = screen.getByText('popular');
    expect(popularMoviesButton.closest('button')).toHaveClass('bg-[#fec04b]');
  });

  it('calls handleSignOut when logout button is clicked', () => {
    render(<Sidebar {...defaultProps} />);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(defaultProps.handleSignOut).toHaveBeenCalled();
  });

  it('navigates to the correct path when a nav item is clicked', () => {
    render(<Sidebar {...defaultProps} />);
    const moviesButton = screen.getByText('Movies');
    fireEvent.click(moviesButton);
    expect(defaultProps.setActive).toHaveBeenCalledWith('main-Movies');
    expect(defaultProps.toggleSidebar).toHaveBeenCalled();
  });

  it('renders the sidebar with the correct initial state', () => {
    render(<Sidebar {...defaultProps} />);
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('translate-x-0');
  });

  it('renders the sidebar with the correct closed state', () => {
    render(<Sidebar {...defaultProps} sidebarOpen={false} />);
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('-translate-x-full');
  });

  it('navigates to the correct movie path when a movie nav item is clicked', () => {
    render(<Sidebar {...defaultProps} />);
    const movieNavItem = screen.getByText('popular');
    fireEvent.click(movieNavItem);
    expect(defaultProps.setActive).toHaveBeenCalledWith('movies-popular');
    expect(defaultProps.toggleSidebar).toHaveBeenCalled();
  });

  it('navigates to the correct show path when a show nav item is clicked', () => {
    render(<Sidebar {...defaultProps} />);
    const showNavItem = screen.getByText('popular');
    fireEvent.click(showNavItem);
    expect(defaultProps.setActive).toHaveBeenCalledWith('shows-popular');
    expect(defaultProps.toggleSidebar).toHaveBeenCalled();
  });

  it('renders the correct number of main nav items', () => {
    render(<Sidebar {...defaultProps} />);
    const mainNavItems = screen.getAllByRole('button', { name: /Movies|TV Shows/ });
    expect(mainNavItems).toHaveLength(2);
  });

  it('renders the correct number of movie nav items', () => {
    render(<Sidebar {...defaultProps} />);
    const movieNavItems = screen.getAllByRole('button', { name: /popular|top rated|now playing/ });
    expect(movieNavItems).toHaveLength(3);
  });

  it('renders the correct number of show nav items', () => {
    render(<Sidebar {...defaultProps} />);
    const showNavItems = screen.getAllByRole('button', { name: /popular|top rated|on the air/ });
    expect(showNavItems).toHaveLength(3);
  });
});