import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import MenuButton from '../MenuButton';

describe('MenuButton', () => {
  it('renders an icon-only button with an accessible name', () => {
    render(<MenuButton />);

    const button = screen.getByRole('button', { name: 'Open menu' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveAttribute('aria-expanded');
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('announces the controlled menu state when open', () => {
    render(<MenuButton controls='site-menu' open />);

    const button = screen.getByRole('button', { name: 'Close menu' });

    expect(button).toHaveAttribute('aria-controls', 'site-menu');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps forwarded button interactions intact', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<MenuButton onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
