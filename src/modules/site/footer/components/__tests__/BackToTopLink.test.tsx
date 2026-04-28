import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import BackToTopLink from '../BackToTopLink';

describe('BackToTopLink', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
      }),
    });

    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });

    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('renders a real hash link with a stable accessible name', () => {
    render(<BackToTopLink />);

    const link = screen.getByRole('link', { name: 'Back to top' });

    expect(link).toHaveAttribute('href', '#header');
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(link.querySelector('svg')).toHaveAttribute('focusable', 'false');
  });

  it('scrolls to the target element every time it is clicked', async () => {
    const user = userEvent.setup();

    render(
      <>
        <header id='header'>Header</header>
        <BackToTopLink />
      </>,
    );

    const link = screen.getByRole('link', { name: 'Back to top' });

    await user.click(link);
    await user.click(link);

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
    expect(Element.prototype.scrollIntoView).toHaveBeenLastCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('falls back to the top of the window when the target is missing', async () => {
    const user = userEvent.setup();

    render(<BackToTopLink href='#missing' />);

    await user.click(screen.getByRole('link', { name: 'Back to top' }));

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    });
  });

  it('respects reduced-motion preferences', async () => {
    const user = userEvent.setup();

    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
    } as MediaQueryList);

    render(<BackToTopLink href='#missing' />);

    await user.click(screen.getByRole('link', { name: 'Back to top' }));

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: 'auto',
      top: 0,
    });
  });

  it('calls forwarded click handlers before handling the scroll', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<BackToTopLink href='#missing' onClick={onClick} />);

    await user.click(screen.getByRole('link', { name: 'Back to top' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
