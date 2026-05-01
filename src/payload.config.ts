import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './payload/collections/users';
import { Media } from './payload/collections/media';
import { NewsTags } from './modules/news/payload/collections/newsTags';
import { Projects } from './modules/projects/payload/collection';
import { Footer } from '@/modules/site/footer/payload/global';
import { Header } from '@/modules/site/header/payload/global';
import { Home } from '@/modules/site/home/payload/global';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, NewsTags],
  globals: [Header, Footer, Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
});
