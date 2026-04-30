import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Paragraph from '../Paragraph';

describe('Paragraph', () => {
  it('renders children inside a paragraph with default text styles', () => {
    render(
      <Paragraph>Community priorities guide every partnership.</Paragraph>,
    );

    const paragraph = screen.getByText(
      'Community priorities guide every partnership.',
    );

    expect(paragraph.tagName).toBe('P');
    expect(paragraph).toHaveClass('leading-[1.4rem]', 'text-muted-foreground');
  });

  it('supports custom classes and native paragraph props', () => {
    render(
      <Paragraph
        className='custom-paragraph leading-7'
        data-testid='intro-copy'
        id='intro'
      >
        Research shaped by community knowledge.
      </Paragraph>,
    );

    const paragraph = screen.getByText(
      'Research shaped by community knowledge.',
    );

    expect(paragraph).toHaveAttribute('id', 'intro');
    expect(paragraph).toHaveAttribute('data-testid', 'intro-copy');
    expect(paragraph).toHaveClass('custom-paragraph', 'leading-7');
    expect(paragraph).not.toHaveClass('leading-[1.4rem]');
  });
});
