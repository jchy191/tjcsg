import { Locale } from '@/i18n-config';
import Container from '@/lib/components/container';

import { openGraph } from '@/app/shared-metadata';
import { Metadata } from 'next';
import { getRichTextContent } from '@/lib/api';
import { Markdown } from '@/lib/markdown';
import ReList from './re-list';
import toysImage from '@/public/toys.jpg';
import reAtHomeImage from '@/public/reathome.jpg';
import ImageBanner from '@/lib/components/image-banner';
import Image from 'next/image';

const MAX_ITEMS_PER_PAGE = 2;

const text = {
  en: {
    title: 'Religious Education @ Home',
    text: 'Beyond classes in church, effective religious education begins at home. Here are some resources and articles that can aid us in setting up religious education at home. May God guide all our efforts to pass down the faith and may the next generation be rooted in the faith.',
    devotional: 'Devotionals',
  },
  zh: {
    title: '家庭的宗教教育',
    text: 'Beyond classes in church, effective religious education begins at home. Here are some resources and articles that can aid us in setting up religious education at home. May God guide all our efforts to pass down the faith and may the next generation be rooted in the faith.',
    devotional: 'Devotionals',
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
  const resources1 = await getRichTextContent('re-1', lang, false);
  const resources2 = await getRichTextContent('re-2', lang, false);
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ImageBanner
        src={toysImage}
        alt={'Picture of toys and coloured crayons.'}
      />
      <Container>
        <div className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-2xl font-bold capitalize sm:text-3xl lg:mb-8 lg:text-4xl">
            {text[lang].title}
          </h1>
          <p className="mb-8 text-pretty">{text[lang].text}</p>

          {/* <div className="flex w-full flex-col md:flex-row">
            <p className="mb-8 text-pretty md:mb-0 md:pr-8">
              {text[lang].text}
            </p>
            <div className="mx-auto w-full max-w-lg">
              <Image src={reAtHomeImage} alt={''} className="object-cover" />
            </div>
          </div> */}

          <div className="my-6">
            <div className="prose">
              <h2 className="mb-4" id="devotionals">
                {text[lang].devotional}
              </h2>
            </div>
            <ReList
              lang={lang}
              currentPage={currentPage}
              maxItemsPerPage={MAX_ITEMS_PER_PAGE}
            />
          </div>
          <div className="prose mt-12 max-w-none leading-snug text-black">
            {resources1 && <Markdown content={resources1.content} />}
          </div>
          <div className="prose mt-8 max-w-none leading-snug text-black md:mt-10">
            {resources2 && <Markdown content={resources2.content} />}
          </div>
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
