import type {
  Field,
  GlobalAfterReadHook,
  GlobalBeforeValidateHook,
  GlobalConfig,
  TextFieldValidation,
} from 'payload';

import { defaultFooterData } from '../data/footerDefaults';

const validateHref: TextFieldValidation = (value) => {
  const href = value?.trim();

  if (!href) {
    return 'Enter a link URL.';
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return true;
  }

  try {
    const url = new URL(href);

    if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) {
      return true;
    }
  } catch {
    return 'Use a relative path, anchor, or full http(s), mailto, or tel URL.';
  }

  return 'Use a relative path, anchor, or full http(s), mailto, or tel URL.';
};

const linkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    admin: {
      description: 'The text to display for the link.',
    },
    required: true,
  },
  {
    name: 'href',
    type: 'text',
    admin: {
      description:
        'The URL or path the link points to. Use a relative path, anchor or full http(s), mailto or tel URL.',
    },
    required: true,
    validate: validateHref,
  },
  {
    name: 'newTab',
    type: 'checkbox',
    admin: {
      description: 'Whether the link should open in a new tab.',
    },
    defaultValue: false,
    label: 'Open in a new tab',
  },
];

const newsletterFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    admin: {
      description: 'Heading for the newsletter signup form.',
    },
    defaultValue: defaultFooterData.newsletter.label,
    required: true,
  },
  {
    name: 'placeholder',
    type: 'text',
    admin: {
      description: 'Placeholder text for the newsletter signup input.',
    },
    defaultValue: defaultFooterData.newsletter.placeholder,
    required: true,
  },
  {
    name: 'successMessage',
    type: 'text',
    admin: {
      description:
        'Message shown to the user after successfully signing up for the newsletter.',
    },
    defaultValue: defaultFooterData.newsletter.successMessage,
    required: true,
  },
  {
    name: 'errorMessage',
    type: 'text',
    admin: {
      description:
        'Message shown to the user if there is an error signing up for the newsletter.',
    },
    defaultValue: defaultFooterData.newsletter.errorMessage,
    required: true,
  },
];

function hasRows(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length > 0;
}

const withFooterDefaults = <TData extends Record<string, unknown>>(
  data: TData,
) => ({
  ...data,
  primaryNavigationItems: hasRows(data.primaryNavigationItems)
    ? data.primaryNavigationItems
    : defaultFooterData.primaryNavigation.navItems,
  primaryNavigationTitle:
    data.primaryNavigationTitle ?? defaultFooterData.primaryNavigation.title,
  projectNavigationItems: hasRows(data.projectNavigationItems)
    ? data.projectNavigationItems
    : defaultFooterData.projectNavigation.navItems,
  projectNavigationTitle:
    data.projectNavigationTitle ?? defaultFooterData.projectNavigation.title,
});

const populateFooterDefaultsBeforeValidate: GlobalBeforeValidateHook = ({
  data,
}) => {
  if (!data) {
    return data;
  }

  return withFooterDefaults(data);
};

const populateFooterDefaultsAfterRead: GlobalAfterReadHook = ({ doc }) => {
  return withFooterDefaults(doc);
};

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    description:
      'Controls footer navigation, acknowledgement text, social links and newsletter copy.',
    group: 'Site',
  },
  hooks: {
    afterRead: [populateFooterDefaultsAfterRead],
    beforeValidate: [populateFooterDefaultsBeforeValidate],
  },
  fields: [
    {
      name: 'primaryNavigationTitle',
      type: 'text',
      admin: {
        description: 'Heading for the first footer navigation group.',
      },
      label: 'Primary Navigation',
      defaultValue: defaultFooterData.primaryNavigation.title,
      required: true,
    },
    {
      name: 'primaryNavigationItems',
      type: 'array',
      admin: {
        description: 'Links in the first footer navigation group.',
        initCollapsed: true,
      },
      defaultValue: defaultFooterData.primaryNavigation.navItems,
      fields: linkFields,
      labels: {
        plural: 'Primary Navigation Items',
        singular: 'Primary Navigation Item',
      },
      minRows: 1,
      required: true,
    },
    {
      name: 'projectNavigationTitle',
      type: 'text',
      admin: {
        description: 'Heading for the project navigation group.',
      },
      label: 'Project Navigation',
      defaultValue: defaultFooterData.projectNavigation.title,
      required: true,
    },
    {
      name: 'projectNavigationItems',
      type: 'array',
      admin: {
        description: 'Project links shown across two footer columns.',
        initCollapsed: true,
      },
      defaultValue: defaultFooterData.projectNavigation.navItems,
      fields: linkFields,
      labels: {
        plural: 'Project Navigation Items',
        singular: 'Project Navigation Item',
      },
      minRows: 1,
      required: true,
    },
    {
      name: 'landAcknowledgement',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: defaultFooterData.landAcknowledgement.title,
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          defaultValue: defaultFooterData.landAcknowledgement.body,
          required: true,
        },
      ],
      label: 'Land Acknowledgement',
    },
    {
      name: 'attribution',
      type: 'text',
      defaultValue: defaultFooterData.attribution,
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      defaultValue: defaultFooterData.socialLinks,
      fields: linkFields,
      labels: {
        plural: 'Social Links',
        singular: 'Social Link',
      },
      maxRows: 8,
      required: true,
    },
    {
      name: 'newsletter',
      type: 'group',
      defaultValue: defaultFooterData.newsletter,
      fields: newsletterFields,
      label: 'Newsletter Form',
    },
  ],
};
