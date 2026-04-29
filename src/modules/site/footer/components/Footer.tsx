import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import SocialLinks, { type SocialLinkItem } from '../../components/SocialLinks';
import BackToTopLink from './BackToTopLink';
import BrandLink from '../../components/BrandLink';
import FooterNavItems from './FooterNavItems';
import SubscriptionForm from './SubscriptionForm';
import {
  defaultFooterData,
  type FooterData,
  type FooterLink,
} from '../data/footerDefaults';
import { getFooterData } from '../data/getFooterData';
import type { FooterNavItemProps } from './FooterNavItem';

type FooterProps = Omit<ComponentProps<'footer'>, 'children'>;

type FooterViewProps = FooterProps & {
  data?: FooterData;
};

function getNewTabProps({ newTab }: FooterLink) {
  return newTab
    ? {
        rel: 'noreferrer',
        target: '_blank',
      }
    : {};
}

function toFooterNavItem(link: FooterLink): FooterNavItemProps {
  return {
    ...getNewTabProps(link),
    href: link.href,
    label: link.label,
  };
}

function toSocialLink(link: FooterLink): SocialLinkItem {
  return {
    ...getNewTabProps(link),
    href: link.href,
    label: link.label,
  };
}

export function FooterView({
  className,
  data = defaultFooterData,
  ...props
}: FooterViewProps) {
  const { primaryNavigation, projectNavigation } = data;
  const projectNavigationSplitIndex = Math.ceil(
    projectNavigation.navItems.length / 2,
  );
  const firstProjectNavigationColumn = projectNavigation.navItems
    .slice(0, projectNavigationSplitIndex)
    .map(toFooterNavItem);
  const secondProjectNavigationColumn = projectNavigation.navItems
    .slice(projectNavigationSplitIndex)
    .map(toFooterNavItem);

  return (
    <footer
      className={cn(
        'flex w-full justify-center border-t border-t-border bg-base-950',
        className,
      )}
      {...props}
    >
      <div className='flex max-w-384 flex-col gap-y-[clamp(4rem,13.5dvw,8rem)] px-4 pt-[clamp(3rem,10dvw,6rem)] pb-[clamp(1.5rem,5dvw,3rem)] sm:px-6 md:px-8 lg:px-12'>
        <div className='grid gap-x-8 gap-y-16 lg:grid-cols-2'>
          <div className='flex flex-col gap-y-16 sm:flex-row sm:justify-between sm:gap-y-0 lg:flex-col'>
            <BrandLink className='text-base-200' />
            <BackToTopLink />
          </div>
          <div className='grid gap-x-10 gap-y-12 sm:max-w-5/6 sm:grid-cols-3 md:max-w-4/6 lg:max-w-none xl:gap-x-12'>
            <div className='grid gap-y-4 sm:grid-rows-[2rem_max-content] sm:gap-y-12 sm:border-t sm:border-t-base-400 sm:pt-4'>
              <h5 className='font-semibold text-base-400'>
                {primaryNavigation.title}
              </h5>
              <FooterNavItems
                navItems={primaryNavigation.navItems.map(toFooterNavItem)}
              />
            </div>
            <div className='grid gap-x-10 gap-y-3 sm:col-span-2 sm:grid-cols-2 xl:gap-x-12'>
              <div className='grid gap-y-4 sm:max-w-none sm:grid-rows-[2rem_max-content] sm:gap-y-12 sm:border-t sm:border-t-base-400 sm:pt-4'>
                <h5 className='font-semibold text-base-400'>
                  {projectNavigation.title}
                </h5>
                <FooterNavItems navItems={firstProjectNavigationColumn} />
              </div>
              <div className='grid sm:grid-rows-[2rem_max-content] sm:gap-y-12 sm:pt-4'>
                <FooterNavItems
                  className='sm:row-start-2'
                  navItems={secondProjectNavigationColumn}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='space-y-10 sm:space-y-12'>
          <div className='max-w-140 space-y-2.5'>
            <h6 className='text-sm font-semibold text-base-200'>
              {data.landAcknowledgement.title}
            </h6>
            <p className='text-sm text-base-400'>
              {data.landAcknowledgement.body}
            </p>
          </div>
          <div className='grid gap-x-8 gap-y-10 lg:grid-cols-2'>
            <div className='row-start-2 flex flex-col gap-y-3 lg:row-start-1'>
              <p className='max-w-140 text-sm text-base-400'>
                {data.attribution}
              </p>
              <SocialLinks
                onDarkBackgroundOnly
                socialLinks={data.socialLinks.map(toSocialLink)}
              />
            </div>
            <SubscriptionForm
              errorMessage={data.newsletter.errorMessage}
              label={data.newsletter.label}
              placeholder={data.newsletter.placeholder}
              successMessage={data.newsletter.successMessage}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

async function Footer(props: FooterProps = {}) {
  const data = await getFooterData();

  return <FooterView data={data} {...props} />;
}

export default Footer;
