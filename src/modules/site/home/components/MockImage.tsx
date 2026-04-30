import { IconLivePhoto } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

type MockImageProps = {
  className?: string;
};

function MockImage({ className }: MockImageProps) {
  return (
    <div className={cn('relative rounded-sm bg-muted', className)}>
      <IconLivePhoto
        className='absolute top-[calc(50%-16px)] left-[calc(50%-16px)] animate-spin text-base-400 animation-duration-5000 dark:text-base-500'
        size={32}
        strokeWidth={1}
      />
    </div>
  );
}

export default MockImage;
