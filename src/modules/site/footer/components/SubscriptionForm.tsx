'use client';

import { IconArrowUpRight } from '@tabler/icons-react';
import { toast } from 'sonner';
import {
  useForm,
  type FieldErrors,
  type Resolver,
  type SubmitHandler,
} from 'react-hook-form';
import { useId, useState, type ComponentProps } from 'react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

export const subscriptionFormSchema = z.strictObject({
  email: z
    .string()
    .trim()
    .min(1, { error: 'Enter your email address.' })
    .pipe(z.email({ error: 'Enter a valid email address.' })),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

type SubscriptionFormProps = Omit<
  ComponentProps<'form'>,
  'children' | 'onSubmit'
> & {
  errorMessage?: string;
  label?: string;
  onSubscribe?: (values: SubscriptionFormValues) => Promise<void> | void;
  placeholder?: string;
  successMessage?: string;
};

const subscriptionFormResolver: Resolver<SubscriptionFormValues> = async (
  values,
) => {
  const result = subscriptionFormSchema.safeParse(values);

  if (result.success) {
    return {
      errors: {},
      values: result.data,
    };
  }

  const emailIssue = result.error.issues.find(
    (issue) => issue.path[0] === 'email',
  );
  const errors: FieldErrors<SubscriptionFormValues> = {
    email: {
      message: emailIssue?.message ?? 'Enter a valid email address.',
      type: emailIssue?.code ?? 'validation',
    },
  };

  return {
    errors,
    values: {},
  };
};

function SubscriptionForm({
  className,
  errorMessage = 'Unable to subscribe right now. Please try again.',
  label = 'Get notified about our newsletters',
  onSubscribe,
  placeholder = 'Email address',
  successMessage = 'Thanks. You are subscribed.',
  ...props
}: SubscriptionFormProps) {
  const emailID = useId();
  const emailErrorID = useId();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  );
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<SubscriptionFormValues>({
    resolver: subscriptionFormResolver,
    defaultValues: {
      email: '',
    },
  });

  const handleValidSubmit: SubmitHandler<SubscriptionFormValues> = async (
    values,
  ) => {
    setSubmitErrorMessage(null);

    try {
      await onSubscribe?.(values);
      reset();
      toast.success(successMessage);
    } catch {
      setSubmitErrorMessage(errorMessage);
    }
  };

  const emailError = errors.email;
  const emailRegistration = register('email', {
    onChange: () => {
      if (submitErrorMessage) {
        setSubmitErrorMessage(null);
      }
    },
  });

  return (
    <form
      className={cn('flex flex-col justify-end gap-y-3', className)}
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
      {...props}
    >
      <Field data-invalid={Boolean(emailError || submitErrorMessage)}>
        <FieldLabel className='max-w-max text-base-200' htmlFor={emailID}>
          {label}
        </FieldLabel>
        <div className='flex items-center gap-x-4'>
          <input
            aria-describedby={
              emailError || submitErrorMessage ? emailErrorID : undefined
            }
            aria-invalid={Boolean(emailError)}
            autoComplete='email'
            className='flex h-9 w-full max-w-sm min-w-0 border-b border-transparent py-1 text-sm text-base-200 transition-colors outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-base-500 hover:border-b-base-600 hover:placeholder:text-base-400 focus-visible:border-base-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'
            data-slot='input'
            id={emailID}
            inputMode='email'
            placeholder={placeholder}
            type='email'
            {...emailRegistration}
          />
          <Button
            aria-label='Subscribe'
            className='text-base-600 hover:text-base-400 has-[>svg]:p-1.5'
            disabled={isSubmitting}
            type='submit'
            variant={null}
          >
            <IconArrowUpRight
              aria-hidden='true'
              className='size-6'
              focusable='false'
            />
          </Button>
        </div>
        <FieldError
          className='text-base-400'
          errors={[emailError]}
          id={emailErrorID}
        >
          {submitErrorMessage}
        </FieldError>
      </Field>
    </form>
  );
}

export default SubscriptionForm;
