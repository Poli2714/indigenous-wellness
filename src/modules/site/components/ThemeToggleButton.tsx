'use client';

import { IconCircleFilled } from '@tabler/icons-react';
import { useEffect, useState, type ComponentProps } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

type ThemeToggleButtonProps = Omit<
  ComponentProps<typeof Button>,
  'aria-label' | 'aria-pressed' | 'children' | 'size' | 'type' | 'variant'
> & {
  darkLabel?: string;
  lightLabel?: string;
  label?: string;
};

function ThemeToggleButton({
  darkLabel = 'Switch to dark theme',
  disabled,
  label = 'Toggle color theme',
  lightLabel = 'Switch to light theme',
  onClick,
  ...props
}: ThemeToggleButtonProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const accessibleLabel = mounted ? (isDark ? lightLabel : darkLabel) : label;

  const handleClick: ComponentProps<typeof Button>['onClick'] = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      aria-label={accessibleLabel}
      aria-pressed={mounted ? isDark : undefined}
      disabled={disabled || !mounted}
      onClick={handleClick}
      size='icon'
      type='button'
      variant={null}
      {...props}
    >
      <IconCircleFilled
        aria-hidden='true'
        className='size-3.5 text-foreground'
        focusable='false'
      />
    </Button>
  );
}

export default ThemeToggleButton;
