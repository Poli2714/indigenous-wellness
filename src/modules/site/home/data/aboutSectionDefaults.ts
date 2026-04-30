export type AboutSectionLink = {
  href: string;
  label: string;
  newTab?: boolean | null;
};

export type AboutSectionImage = {
  alt: string;
  height?: number | null;
  url: string;
  width?: number | null;
};

export type AboutSectionRichTextNode = {
  children?: AboutSectionRichTextNode[];
  [key: string]: unknown;
  fields?: {
    linkType?: 'custom' | 'internal';
    newTab?: boolean | null;
    url?: string | null;
  };
  format?: number | string;
  text?: string;
  type?: string;
};

export type AboutSectionRichText = {
  root: {
    children: AboutSectionRichTextNode[];
    direction?: 'ltr' | 'rtl' | null;
    format?: string;
    indent?: number;
    type: 'root';
    version: number;
  };
};

export type AboutSectionData = {
  action: AboutSectionLink;
  body: AboutSectionRichText;
  heading: string;
  image?: AboutSectionImage | null;
};

function createTextNode(text: string): AboutSectionRichTextNode {
  return {
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  };
}

function createParagraphNode(text: string): AboutSectionRichTextNode {
  return {
    children: [createTextNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
    type: 'paragraph',
    version: 1,
  };
}

export function createRichTextFromParagraphs(
  paragraphs: string[],
): AboutSectionRichText {
  return {
    root: {
      children: paragraphs.map(createParagraphNode),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}

export const defaultAboutSectionData: AboutSectionData = {
  action: {
    href: '/about',
    label: 'Learn more',
  },
  body: createRichTextFromParagraphs([
    'Pewaseskwan works with Indigenous communities, organizations, and health leaders to support research that reflects local priorities and lived experience.',
    'Our team brings together community knowledge, academic methods, and practical tools to help turn evidence into action for Indigenous wellness.',
  ]),
  heading: 'Community-led research rooted in relationship',
  image: null,
};
