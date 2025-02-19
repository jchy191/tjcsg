import { openGraph } from '@/app/shared-metadata';
import { Locale } from '@/i18n-config';
import {
  getAllPublicationTags,
  getLatestPublications,
  getTotalPublications,
} from '@/lib/api';
import PublicationCard from '@/lib/components/publication-card';
import Container from '@/lib/components/container';
import Header from '@/lib/components/header';
import Pagination from '@/lib/components/pagination';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { tagDictionary, TagIds } from '@/lib/tags';
import { tagNameToText } from '@/lib/utils';

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
    <Container>
      <Header
        title={text[lang].browse}
        breadcrumbs={[
          { name: text[lang].home, href: `/${lang}` },
          { name: text[lang].publications, href: `/${lang}/read` },
        ]}
        className="mb-10 mt-2"
      />
      {tags.length > 0 && (
        <Link
          href={`/${lang}/read`}
          className="text-md flex items-center font-medium text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon
            aria-hidden="true"
            className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
          />
          {text[lang].back}
        </Link>
      )}

      <div className="mb-8 text-2xl">
        {tags.length > 0 && (
          <h2 className="inline">Showing all publications for </h2>
        )}
        {tags.map((tagid) => {
          let tagName = allTags.get(tagid) as string;
          return (
            <h2 key={tagid} className="inline capitalize">
              {`${tagDictionary[tagid as TagIds] ? tagDictionary[tagid as TagIds][lang] : tagNameToText(tagName)} `}
            </h2>
          );
        })}
      </div>

      <div className="grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </Container>
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
