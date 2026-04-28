import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ThemeToggleButton from '../ThemeToggleButton';

const themeMock = vi.hoisted(() => ({
  resolvedTheme: 'light' as 'dark' | 'light' | undefined,
  setTheme: vi.fn(),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: themeMock.resolvedTheme,
    setTheme: themeMock.setTheme,
  }),
}));

describe('ThemeToggleButton', () => {
  beforeEach(() => {
    themeMock.resolvedTheme = 'light';
    themeMock.setTheme.mockClear();
  });

  it('renders a non-submit button that switches from light to dark', async () => {
    const user = userEvent.setup();

    render(<ThemeToggleButton />);

    const button = await screen.findByRole('button', {
      name: 'Switch to dark theme',
    });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(button.querySelector('svg')).toHaveClass('text-foreground');

    await user.click(button);

    expect(themeMock.setTheme).toHaveBeenCalledWith('dark');
  });

  it('switches from dark to light', async () => {
    const user = userEvent.setup();
    themeMock.resolvedTheme = 'dark';

    render(<ThemeToggleButton />);

    const button = await screen.findByRole('button', {
      name: 'Switch to light theme',
    });

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button.querySelector('svg')).toHaveClass('text-foreground');

    await user.click(button);

    expect(themeMock.setTheme).toHaveBeenCalledWith('light');
  });

  it('supports custom labels and forwarded button props', async () => {
    render(
      <ThemeToggleButton
        className='custom-theme-toggle'
        darkLabel='Use dark mode'
        disabled
      />,
    );

    const button = await screen.findByRole('button', { name: 'Use dark mode' });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('custom-theme-toggle');
  });

  it('calls forwarded click handlers before changing the theme', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ThemeToggleButton onClick={onClick} />);

    await user.click(
      await screen.findByRole('button', { name: 'Switch to dark theme' }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(themeMock.setTheme).toHaveBeenCalledWith('dark');
  });
});
