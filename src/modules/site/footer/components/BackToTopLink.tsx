'use client';

import { IconArrowUp } from '@tabler/icons-react';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type BackToTopLinkProps = Omit<ComponentProps<'a'>, 'children' | 'href'> & {
  href?: `#${string}`;
  label?: string;
};

function getScrollBehavior() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return 'auto';
  }

  return 'smooth';
}

function getTargetID(href: `#${string}`) {
  return decodeURIComponent(href.slice(1));
}

function BackToTopLink({
  className,
  href = '#header',
  label = 'Back to top',
  onClick,
  ...props
}: BackToTopLinkProps) {
  const handleClick: ComponentProps<'a'>['onClick'] = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();

    const targetID = getTargetID(href);
    const target = targetID ? document.getElementById(targetID) : null;
    const behavior = getScrollBehavior();

    if (target) {
      target.scrollIntoView({ behavior, block: 'start' });
      return;
    }

    window.scrollTo({ behavior, top: 0 });
  };

  return (
    <a
      className={cn(
        'text-base-200 hover:text-base-400 flex max-w-max items-center gap-x-1 rounded-lg border border-transparent text-sm font-medium uppercase transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      href={href}
      onClick={handleClick}
      {...props}
    >
      <IconArrowUp aria-hidden='true' focusable='false' size={14} />
      {label}
    </a>
  );
}

export default BackToTopLink;
