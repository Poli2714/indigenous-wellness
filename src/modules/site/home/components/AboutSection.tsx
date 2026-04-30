import { IconLivePhoto } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type ComponentProps, type ReactNode } from 'react';

import ArrowLink from '../../components/ArrowLink';
import Paragraph from '../../components/Paragraph';
import Section from '../../components/Section';
import SectionHeading from '../../components/SectionHeading';
import {
  defaultAboutSectionData,
  type AboutSectionData,
  type AboutSectionImage,
  type AboutSectionLink,
  type AboutSectionRichText,
  type AboutSectionRichTextNode,
} from '../data/aboutSectionDefaults';
import { getAboutSectionData } from '../data/getAboutSectionData';

type AboutSectionProps = Omit<ComponentProps<typeof Section>, 'children'> & {
  data?: AboutSectionData;
};

type AboutImageProps = {
  image?: AboutSectionImage | null;
};

const textFormats = {
  bold: 1,
  italic: 1 << 1,
  strikethrough: 1 << 2,
  underline: 1 << 3,
};

function getNewTabProps({ newTab }: AboutSectionLink) {
  return newTab
    ? {
        target: '_blank',
      }
    : {};
}

function renderTextNode(node: AboutSectionRichTextNode, key: string) {
  let children: ReactNode = node.text ?? '';
  const format = typeof node.format === 'number' ? node.format : 0;

  if (format & textFormats.bold) {
    children = <strong>{children}</strong>;
  }

  if (format & textFormats.italic) {
    children = <em>{children}</em>;
  }

  if (format & textFormats.strikethrough) {
    children = <span className='line-through'>{children}</span>;
  }

  if (format & textFormats.underline) {
    children = <span className='underline'>{children}</span>;
  }

  return <Fragment key={key}>{children}</Fragment>;
}

function renderRichTextChildren(nodes: AboutSectionRichTextNode[] = []) {
  return nodes.map((node, index) => renderRichTextNode(node, String(index)));
}

function renderRichTextNode(
  node: AboutSectionRichTextNode,
  key: string,
): ReactNode {
  if (node.type === 'text') {
    return renderTextNode(node, key);
  }

  if (node.type === 'linebreak') {
    return <br key={key} />;
  }

  if (node.type === 'paragraph') {
    const children = renderRichTextChildren(node.children);

    if (children.length === 0) {
      return null;
    }

    return <Paragraph key={key}>{children}</Paragraph>;
  }

  if (node.type === 'link' || node.type === 'autolink') {
    const href = node.fields?.url ?? '#';
    const newTab = node.fields?.newTab ?? false;

    return (
      <Link
        className='font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary'
        href={href}
        key={key}
        rel={newTab ? 'noreferrer noopener' : undefined}
        target={newTab ? '_blank' : undefined}
      >
        {renderRichTextChildren(node.children)}
      </Link>
    );
  }

  if (node.children) {
    return (
      <Fragment key={key}>{renderRichTextChildren(node.children)}</Fragment>
    );
  }

  return null;
}

function RichTextBody({ body }: { body: AboutSectionRichText }) {
  return <>{renderRichTextChildren(body.root.children)}</>;
}

function AboutImage({ image }: AboutImageProps) {
  const className =
    'relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-muted sm:aspect-16/8';

  if (!image) {
    return (
      <div aria-hidden='true' className={className}>
        <IconLivePhoto
          className='size-9 text-base-400 sm:size-12 dark:text-base-500'
          focusable='false'
          strokeWidth={1}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        alt={image.alt}
        className='object-cover'
        fill
        sizes='(min-width: 1536px) 1536px, 100vw'
        src={image.url}
      />
    </div>
  );
}

export function AboutSectionView({
  className,
  data = defaultAboutSectionData,
  ...props
}: AboutSectionProps) {
  const headingID = props['aria-labelledby'] ?? 'about-heading';

  return (
    <Section aria-labelledby={headingID} className={className} {...props}>
      <div className='space-y-8'>
        <SectionHeading id={headingID}>{data.heading}</SectionHeading>
        <div className='flex lg:justify-end'>
          <div className='max-w-140 space-y-8'>
            <div className='space-y-4'>
              <RichTextBody body={data.body} />
            </div>
            <ArrowLink href={data.action.href} {...getNewTabProps(data.action)}>
              {data.action.label}
            </ArrowLink>
          </div>
        </div>
      </div>
      <AboutImage image={data.image} />
    </Section>
  );
}

async function AboutSection(props: AboutSectionProps = {}) {
  const data = props.data ?? (await getAboutSectionData());

  return <AboutSectionView {...props} data={data} />;
}

export default AboutSection;
