import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type ParagraphProps = ComponentProps<'p'>;

function Paragraph({ children, className, ...props }: ParagraphProps) {
  return (
    <p
      className={cn('leading-[1.4rem] text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export default Paragraph;
