import { Locale } from '@/i18n-config';
import { getLatestArticles, getTotalArticles } from '@/lib/api';
import { bibleBooks, Book } from '@/lib/bible-books';
import ContentfulImage from '@/lib/contentful-image';
import { obtainTextContent } from '@/lib/utils';
import Link from 'next/link';
import Pagination from '../../../lib/components/pagination';
import { redirect } from 'next/navigation';

const text = {
  en: {
    cta: 'Read More',
  },
  zh: {
    cta: '阅读文章',
  },
};

export default async function ReList({
  lang,
  currentPage,
  maxItemsPerPage,
  tags = ['categoryRe'],
  redirectUrl = '/re',
  author = '',
}: {
  lang: Locale;
  currentPage: number;
  maxItemsPerPage: number;
  tags?: string[];
  redirectUrl?: string;
  author?: string;
}) {
  const totalItems = await getTotalArticles(lang, tags, author);
  const totalPages = Math.ceil(totalItems / maxItemsPerPage);

  if (currentPage > totalPages && currentPage != 1) {
    redirect(redirectUrl);
  }

  const allRe = await getLatestArticles(
    lang,
    maxItemsPerPage,
    (currentPage - 1) * maxItemsPerPage,
    tags,
    author,
  );

  return (
    <>
      {allRe &&
        allRe.map((article) => {
          return (
            <div key={article.slug} className="mb-12 flex flex-col md:flex-row">
              <div className="relative mb-4 aspect-[16/9] w-full flex-none md:mb-0 md:mr-8 md:max-w-72">
                <ContentfulImage
                  src={article.image.url}
                  alt=""
                  width={1152}
                  height={648}
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="">
                <time
                  dateTime={article.date}
                  className="mt-2 text-sm text-gray-500"
                >
                  {new Intl.DateTimeFormat(`${lang}-SG`, {
                    timeZone: 'Singapore',
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour12: true,
                  }).format(new Date(article.date))}
                </time>

                <Link href={`/${lang}/articles/${article.slug}`}>
                  <h1 className="mb-2 mt-2 text-xl font-bold">
                    {article.title}
                  </h1>
                </Link>
                <p className="text-md mb-1 line-clamp-3 text-gray-700">
                  {article.description !== null
                    ? article.description
                    : obtainTextContent(article.content)}
                </p>
                <Link
                  href={`/${lang}/articles/${article.slug}`}
                  className="mt-6 text-sm font-medium text-button underline hover:text-button_hover"
                >
                  {text[lang].cta}
                </Link>
              </div>
            </div>
          );
        })}
      {allRe.length > 0 && (
        <div className="flex w-full justify-center">
          <Pagination totalPages={totalPages} hrefId="devotionals" />
        </div>
      )}
    </>
  );
}
