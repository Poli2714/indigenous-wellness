import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import AppSearchButton from '../AppSearchButton';

describe('AppSearchButton', () => {
  it('renders a non-submit button with a stable accessible name', () => {
    render(<AppSearchButton />);

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAccessibleName('Search');
  });

  it('supports a custom accessible label', () => {
    render(<AppSearchButton label='Open site search' />);

    expect(
      screen.getByRole('button', { name: 'Open site search' }),
    ).toBeInTheDocument();
  });

  it('renders decorative visual affordances and a keyboard hint', () => {
    render(<AppSearchButton />);

    const button = screen.getByRole('button', { name: 'Search' });
    const shortcut = screen.getByText('⌘ K');

    expect(button.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(shortcut).toHaveAttribute('data-slot', 'kbd');
    expect(shortcut).toHaveAttribute('aria-hidden', 'true');

    for (const icon of button.querySelectorAll('svg')) {
      expect(icon).toHaveAttribute('focusable', 'false');
    }
  });

  it('keeps forwarded button interactions intact', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<AppSearchButton onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
