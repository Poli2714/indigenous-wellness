import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createRichTextFromParagraphs,
  defaultAboutSectionData,
  type AboutSectionData,
} from '../../data/aboutSectionDefaults';
import AboutSection, { AboutSectionView } from '../AboutSection';

const aboutSectionDataMock = vi.hoisted(() => ({
  getAboutSectionData: vi.fn(),
}));

vi.mock('../../data/getAboutSectionData', () => ({
  getAboutSectionData: aboutSectionDataMock.getAboutSectionData,
}));

const customAboutData: AboutSectionData = {
  action: {
    href: 'https://example.com/about',
    label: 'Read our story',
    newTab: true,
  },
  body: createRichTextFromParagraphs([
    'Custom paragraph one for the home page.',
    'Custom paragraph two for the home page.',
  ]),
  heading: 'About Pewaseskwan',
  image: {
    alt: 'Community members gathered around a table',
    height: 900,
    url: '/media/about-community.jpg',
    width: 1200,
  },
};

describe('AboutSection', () => {
  beforeEach(() => {
    aboutSectionDataMock.getAboutSectionData.mockReset();
  });

  it('renders CMS-managed about section content', async () => {
    aboutSectionDataMock.getAboutSectionData.mockResolvedValue(customAboutData);

    const { container } = render(
      await AboutSection({ className: 'custom-about-section' }),
    );

    expect(aboutSectionDataMock.getAboutSectionData).toHaveBeenCalledTimes(1);
    expect(container.querySelector('section')).toHaveClass(
      'custom-about-section',
    );
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'About Pewaseskwan',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Custom paragraph one for the home page.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Custom paragraph two for the home page.'),
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Read our story' });

    expect(link).toHaveAttribute('href', 'https://example.com/about');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    expect(
      screen.getByRole('img', {
        name: 'Community members gathered around a table',
      }),
    ).toHaveAttribute('src', expect.stringContaining('about-community.jpg'));
  });

  it('renders default content through the view', () => {
    render(<AboutSectionView />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: defaultAboutSectionData.heading,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute(
      'href',
      '/about',
    );
  });

  it('renders rich text formatting and links', () => {
    render(
      <AboutSectionView
        data={{
          ...customAboutData,
          body: {
            root: {
              children: [
                {
                  children: [
                    {
                      format: 1,
                      text: 'Bold opening',
                      type: 'text',
                    },
                    {
                      text: ' with ',
                      type: 'text',
                    },
                    {
                      children: [
                        {
                          text: 'an inline link',
                          type: 'text',
                        },
                      ],
                      fields: {
                        newTab: true,
                        url: 'https://example.com/research',
                      },
                      type: 'link',
                    },
                  ],
                  type: 'paragraph',
                },
              ],
              type: 'root',
              version: 1,
            },
          },
        }}
      />,
    );

    expect(screen.getByText('Bold opening').tagName).toBe('STRONG');
    expect(
      screen.getByRole('link', { name: 'an inline link' }),
    ).toHaveAttribute('href', 'https://example.com/research');
    expect(
      screen.getByRole('link', { name: 'an inline link' }),
    ).toHaveAttribute('target', '_blank');
  });

  it('supports custom section props and accessible labelling', () => {
    const { container } = render(
      <AboutSectionView
        aria-labelledby='custom-about-heading'
        className='custom-about-section'
        data={customAboutData}
        data-testid='about-section'
      />,
    );

    const section = container.querySelector('section');

    expect(section).toHaveAttribute('aria-labelledby', 'custom-about-heading');
    expect(section).toHaveAttribute('data-testid', 'about-section');
    expect(section).toHaveClass('custom-about-section');
    expect(
      screen.getByRole('heading', { name: 'About Pewaseskwan' }),
    ).toHaveAttribute('id', 'custom-about-heading');
  });
});
