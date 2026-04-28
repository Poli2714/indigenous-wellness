import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContactLink from '../ContactLink';

describe('ContactLink', () => {
  it('renders a contact link with the default route', () => {
    render(<ContactLink />);

    const link = screen.getByRole('link', { name: 'Contact' });

    expect(link).toHaveAttribute('href', '/contact');
  });

  it('supports custom hrefs and labels', () => {
    render(<ContactLink href='/connect'>Get in touch</ContactLink>);

    const link = screen.getByRole('link', { name: 'Get in touch' });

    expect(link).toHaveAttribute('href', '/connect');
  });

  it('forwards link props and merges custom classes', () => {
    render(
      <ContactLink
        aria-current='page'
        className='custom-contact-link'
        prefetch={false}
      />,
    );

    const link = screen.getByRole('link', { name: 'Contact' });

    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveClass('custom-contact-link');
  });
});
