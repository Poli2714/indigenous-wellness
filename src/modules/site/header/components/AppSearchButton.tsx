import { IconSearch } from '@tabler/icons-react';
import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

type AppSearchButtonProps = Omit<
  ComponentProps<typeof Button>,
  'aria-label' | 'children' | 'type' | 'variant'
> & {
  label?: string;
};

function AppSearchButton({
  className,
  label = 'Search',
  ...props
}: AppSearchButtonProps) {
  return (
    <Button
      aria-label={label}
      className={cn(
        'justify-between gap-1.5 px-3 text-muted-foreground shadow-none xl:w-64 xl:gap-2 xl:px-4',
        className,
      )}
      type='button'
      variant='outline'
      {...props}
    >
      <span className='flex items-center gap-x-2' aria-hidden='true'>
        <IconSearch className='size-3.5' focusable='false' strokeWidth={1.33} />
        <span className='hidden xl:block'>Search...</span>
      </span>
      <Kbd aria-hidden='true' className='bg-border dark:bg-background'>
        ⌘ K
      </Kbd>
    </Button>
  );
}

export default AppSearchButton;
