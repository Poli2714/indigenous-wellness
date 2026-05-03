import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import CompletedProjects, {
  type CompletedProjectsData,
} from '../CompletedProjects';

beforeAll(() => {
  class IntersectionObserverMock {
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }

  class ResizeObserverMock {
    disconnect = vi.fn();
    observe = vi.fn();
    unobserve = vi.fn();
  }

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
  Object.defineProperty(window, 'IntersectionObserver', {
    configurable: true,
    value: IntersectionObserverMock,
  });
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    value: ResizeObserverMock,
  });
});

const completedProjectsData: CompletedProjectsData = {
  action: {
    href: '/projects/completed',
    label: 'View all',
  },
  description:
    'Past research projects that continue to inform community wellness work.',
  heading: 'Completed Projects',
  projects: [
    {
      completionYear: 2024,
      description:
        'A completed community-led research project with practical wellness outcomes.',
      logo: {
        alt: 'Completed Wellness logo',
        height: 300,
        url: '/api/media/file/completed-wellness-logo.png',
        width: 300,
      },
      title: 'Completed Wellness Project',
      url: '/projects/completed-wellness',
    },
    {
      completionYear: 2022,
      description: 'A completed land-based education and wellness project.',
      title: 'Land Learning Archive',
      url: '/projects/land-learning-archive',
    },
  ],
};

describe('CompletedProjects', () => {
  it('renders completed project section copy, action, carousel, and cards', () => {
    render(<CompletedProjects data={completedProjectsData} />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Completed Projects',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(completedProjectsData.description ?? ''),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View all' })).toHaveAttribute(
      'href',
      '/projects/completed',
    );
    expect(
      screen.getByRole('region', { name: 'Completed projects carousel' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Completed Wellness Project',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Land Learning Archive',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous slide' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next slide' }),
    ).toBeInTheDocument();
  });

  it('supports custom section props and card image options', () => {
    render(
      <CompletedProjects
        cardLogoSizes='4rem'
        className='custom-completed-projects'
        data={completedProjectsData}
        data-testid='completed-projects-section'
        priorityLogoCount={2}
      />,
    );

    const section = screen.getByTestId('completed-projects-section');
    const images = screen.getAllByRole('img');

    expect(section).toHaveClass('custom-completed-projects');
    for (const image of images) {
      expect(image).toHaveAttribute('sizes', '4rem');
    }
  });

  it('uses an accessible section label when no heading is provided', () => {
    const { container } = render(
      <CompletedProjects
        data={{
          action: null,
          description: null,
          heading: null,
          projects: [completedProjectsData.projects[0]],
        }}
      />,
    );

    expect(container.querySelector('section')).toHaveAttribute(
      'aria-label',
      'Completed projects',
    );
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Previous slide' }),
    ).not.toBeInTheDocument();
  });

  it('renders nothing when no completed projects are available', () => {
    const { container } = render(
      <CompletedProjects
        data={{
          ...completedProjectsData,
          projects: [],
        }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
