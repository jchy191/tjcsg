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
import Link from 'next/link';

const MAX_ITEMS_PER_PAGE = 2;

const text = {
  en: {
    title: 'Religious Education @ Home',
    text: 'Beyond classes in church, effective religious education begins at home. Here are some resources and articles that can aid us in setting up religious education at home. May God guide all our efforts to pass down the faith and may the next generation be rooted in the faith.',
    devotional: 'Devotionals',
    devotional_description:
      'Published weekly, these devotionals have additional resources that you can use for RE@Home.',
    devotional_cta: 'Browse all our publications here',
  },
  zh: {
    title: '家庭的宗教教育',
    text: 'Beyond classes in church, effective religious education begins at home. Here are some resources and articles that can aid us in setting up religious education at home. May God guide all our efforts to pass down the faith and may the next generation be rooted in the faith.',
    devotional: 'Devotionals',
    devotional_description:
      'Published weekly, these devotionals have additional resources that you can use for RE@Home.',
    devotional_cta: 'Browse all our publications here',
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
          <h1 className="my-4 text-2xl font-bold capitalize sm:text-3xl lg:my-8 lg:text-4xl">
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

          <div className="my-8">
            <div className="prose">
              <h2 className="mb-4" id="devotionals">
                {text[lang].devotional}
              </h2>
            </div>
            <p className="mb-8 text-pretty">
              {text[lang].devotional_description}{' '}
              <Link
                href={`/${lang}/read`}
                className="text-button underline hover:text-button_hover"
              >
                {text[lang].devotional_cta}
              </Link>
              {lang === 'zh' ? '。' : '.'}
            </p>
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
