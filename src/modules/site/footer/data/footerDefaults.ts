export type FooterLink = {
  href: string;
  label: string;
  newTab?: boolean | null;
};

export type FooterNavigationGroup = {
  navItems: FooterLink[];
  title: string;
};

export type FooterData = {
  attribution: string;
  landAcknowledgement: {
    body: string;
    title: string;
  };
  newsletter: {
    errorMessage: string;
    label: string;
    placeholder: string;
    successMessage: string;
  };
  primaryNavigation: FooterNavigationGroup;
  projectNavigation: FooterNavigationGroup;
  socialLinks: FooterLink[];
};

export const defaultFooterData: FooterData = {
  attribution:
    '@Pewaseskwan (the Indigenous Wellness Research Group). All rights reserved.',
  landAcknowledgement: {
    body: 'Most of our team lives and works on Treaty 6 territory and the Homeland of the Métis. The original peoples of these lands are the Cree, Saulteaux, Dene, Dakota, Lakota, Nakota, and Métis. Others are based in Vancouver, on the unceded lands of the xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish) and səlilwətaʔɬ (Tsleil-Waututh) peoples. We encourage everyone, wherever they are, to learn about the Indigenous people of the lands on which they live and work. We seek to become engaged allies together. In the spirit of truth and reconciliation, we respect the self-determination of First Nations, Métis and Inuit - in their cultures, languages and their pursuit of wellness.',
    title: 'LAND ACKNOWLEDGEMENT',
  },
  newsletter: {
    errorMessage: 'Unable to subscribe right now. Please try again.',
    label: 'Get notified about our newsletters',
    placeholder: 'Email address',
    successMessage: 'Thanks. You are subscribed.',
  },
  primaryNavigation: {
    navItems: [
      {
        href: '/about',
        label: 'About',
      },
      {
        href: '/projects',
        label: 'Projects',
      },
      {
        href: '/news',
        label: 'News',
      },
      {
        href: '/publications',
        label: 'Publications',
      },
      {
        href: '/team',
        label: 'Team',
      },
      {
        href: '/gallery',
        label: 'Gallery',
      },
      {
        href: '/career',
        label: 'Careers',
      },
      {
        href: '/contact',
        label: 'Contact',
      },
    ],
    title: 'PEWASESKWAN',
  },
  projectNavigation: {
    navItems: [
      {
        href: '#',
        label: '7-Directions Summit',
      },
      {
        href: '#',
        label: 'Apihkatatan',
      },
      {
        href: '#',
        label: 'Butterfly Project',
      },
      {
        href: '#',
        label: 'CheckUp!',
      },
      {
        href: '#',
        label: 'DRUM & SASH',
      },
      {
        href: '#',
        label: 'Health for People Who Use Drugs',
      },
      {
        href: '#',
        label: 'Hope Through Strength',
      },
      {
        href: '#',
        label: "Kennedy's Disease",
      },
      {
        href: '#',
        label: 'Kiskemisowin',
      },
      {
        href: '#',
        label: 'Mitewekan',
      },
      {
        href: '#',
        label: 'Miyo-pimâtisiwin',
      },
      {
        href: '#',
        label: 'Peers For Wellness',
      },
      {
        href: '#',
        label: 'Muskwa Lake',
      },
      {
        href: '#',
        label: 'Stamsh Slhanay Lhawat II',
      },
      {
        href: '#',
        label: 'Virtual Cascade of Care Cohort study',
      },
      {
        href: '#',
        label: 'Waniska',
      },
    ],
    title: 'PROJECTS',
  },
  socialLinks: [
    { href: '#', label: 'Facebook' },
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'YouTube' },
    { href: '#', label: 'LinkedIn' },
  ],
};
