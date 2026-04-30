import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  defaultHomeHeroData,
  type HomeHeroData,
} from '../../data/homeHeroDefaults';
import HomeHero, { HomeHeroView } from '../HomeHero';

const homeHeroDataMock = vi.hoisted(() => ({
  getHomeHeroData: vi.fn(),
}));

vi.mock('../../data/getHomeHeroData', () => ({
  getHomeHeroData: homeHeroDataMock.getHomeHeroData,
}));

const cmsHomeHeroData: HomeHeroData = {
  description:
    'Custom research partnerships rooted in Indigenous wellness priorities.',
  images: [
    {
      alt: 'Community gathering',
      height: 900,
      url: '/media/community-gathering.jpg',
      width: 1200,
    },
    {
      alt: 'Research circle',
      height: 900,
      url: '/media/research-circle.jpg',
      width: 1200,
    },
    {
      alt: 'Team workshop',
      height: 1200,
      url: '/media/team-workshop.jpg',
      width: 960,
    },
  ],
  primaryAction: {
    href: '/our-work',
    label: 'Our work',
  },
  secondaryAction: {
    enabled: true,
    href: 'https://example.com/connect',
    label: 'Connect with us',
    newTab: true,
  },
  subtitle: 'Community-led health research',
  title: 'A custom home hero',
};

describe('HomeHero', () => {
  beforeEach(() => {
    homeHeroDataMock.getHomeHeroData.mockReset();
  });

  it('renders CMS-managed hero content and images', async () => {
    homeHeroDataMock.getHomeHeroData.mockResolvedValue(cmsHomeHeroData);

    const { container } = render(
      await HomeHero({ className: 'custom-home-hero' }),
    );

    expect(homeHeroDataMock.getHomeHeroData).toHaveBeenCalledTimes(1);
    expect(container.querySelector('section')).toHaveClass('custom-home-hero');
    expect(
      screen.getByRole('heading', { level: 1, name: 'A custom home hero' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Community-led health research'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Custom research partnerships rooted in Indigenous wellness priorities.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Our work' })).toHaveAttribute(
      'href',
      '/our-work',
    );

    const secondaryAction = screen.getByRole('link', {
      name: 'Connect with us',
    });

    expect(secondaryAction).toHaveAttribute(
      'href',
      'https://example.com/connect',
    );
    expect(secondaryAction).toHaveAttribute('target', '_blank');
    expect(secondaryAction).toHaveAttribute('rel', 'noreferrer');
    expect(
      screen.getByRole('img', { name: 'Community gathering' }),
    ).toHaveAttribute(
      'src',
      expect.stringContaining('community-gathering.jpg'),
    );
    expect(
      screen.getByRole('img', { name: 'Research circle' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Team workshop' }),
    ).toBeInTheDocument();
  });

  it('renders default content through the view', () => {
    render(<HomeHeroView />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: defaultHomeHeroData.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultHomeHeroData.subtitle)).toBeInTheDocument();
    expect(
      screen.getByText(defaultHomeHeroData.description),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: defaultHomeHeroData.primaryAction.label,
      }),
    ).toHaveAttribute('href', defaultHomeHeroData.primaryAction.href);
    expect(
      screen.getByRole('link', {
        name: defaultHomeHeroData.secondaryAction.label,
      }),
    ).toHaveAttribute('href', defaultHomeHeroData.secondaryAction.href);
  });

  it('can hide the secondary action', () => {
    render(
      <HomeHeroView
        data={{
          ...defaultHomeHeroData,
          secondaryAction: {
            ...defaultHomeHeroData.secondaryAction,
            enabled: false,
          },
        }}
      />,
    );

    expect(
      screen.queryByRole('link', {
        name: defaultHomeHeroData.secondaryAction.label,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: defaultHomeHeroData.primaryAction.label,
      }),
    ).toBeInTheDocument();
  });
});
