import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SubscriptionForm from '../SubscriptionForm';

const toastMock = vi.hoisted(() => ({
  success: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: toastMock.success,
  },
}));

describe('SubscriptionForm', () => {
  beforeEach(() => {
    toastMock.success.mockClear();
  });

  it('renders a labelled email field and submit button', () => {
    render(<SubscriptionForm />);

    const input = screen.getByLabelText('Get notified about our newsletters');
    const button = screen.getByRole('button', { name: 'Subscribe' });

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveAttribute('placeholder', 'Email address');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(button.querySelector('svg')).toHaveAttribute('focusable', 'false');
  });

  it('validates email input before submitting', async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn();

    render(<SubscriptionForm onSubscribe={onSubscribe} />);

    await user.type(
      screen.getByLabelText('Get notified about our newsletters'),
      'not-an-email',
    );
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(
      await screen.findByText('Enter a valid email address.'),
    ).toBeInTheDocument();
    expect(onSubscribe).not.toHaveBeenCalled();
  });

  it('submits a trimmed email value and resets the field', async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn();

    render(<SubscriptionForm onSubscribe={onSubscribe} />);

    const input = screen.getByLabelText('Get notified about our newsletters');

    await user.type(input, '  hello@example.com  ');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    await waitFor(() => {
      expect(onSubscribe).toHaveBeenCalledWith({
        email: 'hello@example.com',
      });
    });
    expect(input).toHaveValue('');
    expect(toastMock.success).toHaveBeenCalledWith(
      'Thanks. You are subscribed.',
    );
  });

  it('supports custom copy and form props', () => {
    render(
      <SubscriptionForm
        aria-label='Newsletter signup'
        className='custom-subscription-form'
        label='Join the newsletter'
        placeholder='you@example.com'
        submitLabel='Join'
      />,
    );

    const form = screen.getByRole('form', { name: 'Newsletter signup' });
    const input = screen.getByLabelText('Join the newsletter');

    expect(form).toHaveClass('custom-subscription-form');
    expect(input).toHaveAttribute('placeholder', 'you@example.com');
    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument();
  });

  it('shows a submit error when subscription fails', async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn().mockRejectedValue(new Error('Failed'));

    render(
      <SubscriptionForm
        errorMessage='Subscription failed.'
        onSubscribe={onSubscribe}
      />,
    );

    await user.type(
      screen.getByLabelText('Get notified about our newsletters'),
      'hello@example.com',
    );
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(await screen.findByText('Subscription failed.')).toBeInTheDocument();
  });
});
