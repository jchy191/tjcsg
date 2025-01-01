import { Locale } from '@/i18n-config';
import Container from '@/lib/components/container';

import { openGraph } from '@/app/shared-metadata';
import { Metadata } from 'next';
import { getRichTextContent } from '@/lib/api';
import { Markdown } from '@/lib/markdown';
import ReList from './re-list';

const MAX_ITEMS_PER_PAGE = 8;

const text = {
  en: {
    title: 'Religious Education @ Home',
    text: 'Beyond classes in church, effective religious education begins at home. Here are some resources and articles that can aid us in setting up religious education at home. May God guide all our efforts to pass down the faith and may the next generation be rooted in the faith.',
  },
  zh: {
    title: '家庭的宗教教育',
    text: 'Beyond classes in church, effective religious education begins at home. Here are some resources and articles that can aid us in setting up religious education at home. May God guide all our efforts to pass down the faith and may the next generation be rooted in the faith.',
  },
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: { page: string };
}) {
  const { lang } = params;
  const resources = await getRichTextContent('re', lang, false);
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Container>
        <div className="max-w-screen-lg">
          <h1 className="mb-8 text-4xl font-bold">{text[lang].title}</h1>
          <p>{text[lang].text}</p>
          <div className="prose my-3 max-w-none">
            {resources && <Markdown content={resources.content} />}
          </div>
          <ReList
            lang={lang}
            currentPage={currentPage}
            maxItemsPerPage={MAX_ITEMS_PER_PAGE}
          />
        </div>
      </Container>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Religious Education @ Home',
  description: 'Raising the future generation of the church.',
  openGraph: {
    ...openGraph,
    title: 'RE @ Home | True Jesus Church',
    url: `https://tjc.sg/re`,
    description: 'Raising the future generation of the church.',
  },
};
