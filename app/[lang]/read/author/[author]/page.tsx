import { Locale } from '@/i18n-config';
import Container from '@/lib/components/container';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import CdbdList from '../../../cdbd/cdbd-list';
import PublicationCard from '@/lib/components/publication-card';
import Pagination from '@/lib/components/pagination';
import { getLatestPublications, getTotalPublications } from '@/lib/api';
import { redirect } from 'next/navigation';

const MAX_ITEMS_PER_PAGE = 8;

const text = {
  en: {
    back: 'Back to All Publications',
    all: 'All Publications by',
    cta: 'Read More',
  },
  zh: {
    back: '返回查看所有的文章',
    all: '所写的文章',
    cta: '阅读文章',
  },
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { lang: Locale; author: string };
  searchParams?: {
    page?: string;
  };
}) {
  const { lang, author } = params;
  let author_Text = author.split('-').join(' ');
  author_Text = author_Text[0].toUpperCase() + author_Text.slice(1);
  const currentPage = Number(searchParams?.page) || 1;
  const totalItems = await getTotalPublications(lang, [], author_Text);
  const totalPages = Math.ceil(totalItems / MAX_ITEMS_PER_PAGE);

  if (currentPage > totalPages && currentPage != 1) {
    redirect('/read');
  }

  if (totalItems < 1) {
    redirect('/read');
  }

  const allPublications = await getLatestPublications(
    lang,
    MAX_ITEMS_PER_PAGE,
    (currentPage - 1) * MAX_ITEMS_PER_PAGE,
    [],
    author_Text,
  );

  return (
    <Container>
      <div className="block w-full max-w-screen-lg">
        <nav aria-label="Back" className="mb-4">
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
        </nav>

        <h1 className="mb-8 text-3xl font-bold">
          {lang === 'en'
            ? `${text[lang].all} ${author
                .split('-')
                .map((string) => string[0].toUpperCase() + string.slice(1))
                .join(' ')}`
            : `${author
                .split('-')
                .map((string) => string[0].toUpperCase() + string.slice(1))
                .join(' ')} ${text[lang].all} `}
        </h1>

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
      </div>
    </Container>
  );
}
