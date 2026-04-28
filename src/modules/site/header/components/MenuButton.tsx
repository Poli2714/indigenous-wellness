import { IconMenu } from '@tabler/icons-react';
import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';

type MenuButtonProps = Omit<
  ComponentProps<typeof Button>,
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-label'
  | 'children'
  | 'size'
  | 'type'
  | 'variant'
> & {
  controls?: string;
  closeLabel?: string;
  label?: string;
  open?: boolean;
  openLabel?: string;
};

function MenuButton({
  closeLabel = 'Close menu',
  controls,
  label,
  open,
  openLabel = 'Open menu',
  ...props
}: MenuButtonProps) {
  return (
    <Button
      aria-controls={controls}
      aria-expanded={open}
      aria-label={label ?? (open ? closeLabel : openLabel)}
      size='icon'
      type='button'
      variant='ghost'
      {...props}
    >
      <IconMenu aria-hidden='true' focusable='false' strokeWidth={1.33} />
    </Button>
  );
}

export default MenuButton;
