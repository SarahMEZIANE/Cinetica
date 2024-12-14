import { describe, it, expect, vi } from 'vitest';
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
});