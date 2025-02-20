import { openGraph } from '@/app/shared-metadata';
import { Locale } from '@/i18n-config';
import {
  getAllPublicationTags,
  getLatestPublications,
  getTotalPublications,
} from '@/lib/api';
import PublicationCard from '@/lib/components/publication-card';
import Header from '@/lib/components/header';
import Pagination from '@/lib/components/pagination';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { tagDictionary, TagIds } from '@/lib/tags';
import { tagNameToText } from '@/lib/utils';
import PublicationsFilterDialog from './publications-filter-dialog';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

const MAX_ITEMS_PER_PAGE = 12;

const text = {
  en: {
    home: 'Home',
    publications: 'All Publications',
    browse: 'Browse All Our Publications',
    back: 'Back to all publications',
  },
  zh: {
    home: '主页',
    publications: '所有文字资源',
    browse: '阅读所有文字资源',
    back: '看回所有文字资源',
  },
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { page?: string; tags?: string };
}) {
  const { lang } = params;
  const tags = searchParams?.tags ? searchParams.tags.split(',') : [];

  const currentPage = Number(searchParams?.page) || 1;
  const totalItems = await getTotalPublications(lang, tags);
  const totalPages = Math.ceil(totalItems / MAX_ITEMS_PER_PAGE);

  if (currentPage > totalPages) {
    redirect('/read');
  }

  const allPublications = await getLatestPublications(
    lang,
    MAX_ITEMS_PER_PAGE,
    (currentPage - 1) * MAX_ITEMS_PER_PAGE,
    tags,
  );
  const allTags = await getAllPublicationTags();
  return (
    // <Container>
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-6 pt-8">
            <Header
              title={text[lang].browse}
              breadcrumbs={[
                { name: text[lang].home, href: `/${lang}` },
                { name: text[lang].publications, href: `/${lang}/read` },
              ]}
              className="mb-2 mt-2"
            />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 xl:grid-cols-6">
              <PublicationsFilterDialog lang={lang} tags={allTags} />

              <div className="lg:col-span-3 xl:col-span-5">
                {' '}
                <div className="grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {allPublications &&
                    allPublications.map((publication) => (
                      <PublicationCard
                        key={publication.slug}
                        lang={lang}
                        publication={publication}
                      />
                    ))}
                </div>
                <div className="mt-10 flex w-full justify-center lg:mt-16">
                  <Pagination totalPages={totalPages} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    // </Container>
  );
}

export const metadata: Metadata = {
  title: 'Publications',
  openGraph: {
    ...openGraph,
    title: 'Publications | True Jesus Church',
    url: `https://tjc.sg/read`,
  },
};
