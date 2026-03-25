import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders the site name', () => {
    render(<Nav />);
    expect(screen.getByText("Robin's Nest Rescue")).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
  });

  it('renders the donate CTA button', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /donate/i })).toBeInTheDocument();
  });

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByLabelText(/toggle menu/i);

    // Menu links container should be hidden initially (has hidden class)
    const navLinks = screen.getByRole('navigation');
    expect(navLinks).toHaveAttribute('data-open', 'false');

    await user.click(toggle);
    expect(navLinks).toHaveAttribute('data-open', 'true');

    await user.click(toggle);
    expect(navLinks).toHaveAttribute('data-open', 'false');
  });

  it('highlights the active link based on currentPath', () => {
    render(<Nav currentPath="/about" />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });
});
