import Link from 'next/link';
import { draftMode } from 'next/headers';

import { Markdown } from '@/lib/markdown';
import {
  PublicationEntry,
  getAllPublicationsSlug,
  getAllCdbdSlugs,
  getPublication,
  getRelatedPublications,
} from '@/lib/api';
import { notFound } from 'next/navigation';
import Header from '@/lib/components/header';
import { Locale } from '@/i18n-config';
import ContentfulImage from '@/lib/contentful-image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Metadata, ResolvingMetadata } from 'next';
import { openGraph } from '@/app/shared-metadata';
import { obtainTextContent } from '@/lib/utils';
import React from 'react';
export const dynamic = 'force-static';
// export const dynamicParams = false;

export async function generateStaticParams() {
  const allPublications = await getAllPublicationsSlug(false);

  return allPublications.map((publication) => ({
    slug: publication.slug,
  }));
}

const text = {
  en: {
    seeAlso: 'See Also',
    previous: 'Newer',
    next: 'Older',
    home: 'Home',
    publications: 'Publications',
    writtenBy: 'Written by ',
  },
  zh: {
    seeAlso: '相关内容',
    previous: '较新',
    next: '较早',
    home: '主页',
    publications: '所有文章',
    writtenBy: '作者：',
  },
};

async function PublicationFoot({
  isCdbd,
  publication,
  lang,
}: {
  isCdbd: boolean;
  publication: PublicationEntry;
  lang: Locale;
}) {
  if (isCdbd) {
    const cdbdSlugs = await getAllCdbdSlugs();
    const index = cdbdSlugs.findIndex(
      (cdbdSlug) => cdbdSlug.slug === publication.slug,
    );

    return (
      <div className="text-md mt-6 flex justify-between text-button underline">
        {index < cdbdSlugs.length - 1 && (
          <Link
            href={`/${lang}/read/${cdbdSlugs[index + 1].slug}`}
            className="flex hover:text-button_hover"
          >
            <ChevronLeftIcon aria-hidden="true" className="block w-6" />
            {text[lang].next}
          </Link>
        )}
        {index > 0 ? (
          <Link
            href={`/${lang}/read/${cdbdSlugs[index - 1].slug}`}
            className="flex hover:text-button_hover"
          >
            {index > 0 && text[lang].previous}
            <ChevronRightIcon aria-hidden="true" className="block w-6" />
          </Link>
        ) : (
          <p></p>
        )}
      </div>
    );
  }

  return <></>;
}

async function Author({
  params,
}: {
  params: { author: string; authorAlt: string; isCdbd: boolean; lang: Locale };
}) {
  const { author, authorAlt, isCdbd, lang } = params;
  if (author) {
    return (
      <>
        <div className="text-md pt-2 italic text-gray-500">
          <p className="inline">{text[lang].writtenBy}</p>
          {isCdbd ? (
            <Link
              href={`/${lang}/cdbd/author/${author.split(' ').join('-')}`}
              className="underline hover:text-gray-700"
            >
              <p className="inline capitalize">{author}</p>
            </Link>
          ) : (
            <p className="inline capitalize">{author}</p>
          )}
        </div>
      </>
    );
  }
  if (authorAlt) {
    return (
      <div className="text-md pt-2 italic text-gray-500">
        <p className="capitalize">{authorAlt}</p>
      </div>
    );
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string; lang: Locale };
}) {
  const { isEnabled } = draftMode();
  const { slug, lang } = params;
  const publication = await getPublication(slug, lang, isEnabled);

  if (!publication) {
    notFound();
  }

  const relPublications = await getRelatedPublications(
    lang,
    publication.slug,
    3,
    publication.contentfulMetadata.tags.map((tag) => tag.id),
  );

  const relatedPublications =
    publication.relatedArticlesCollection?.items.concat(relPublications);

  let isCdbd = publication.contentfulMetadata.tags.some(
    (tag) => tag.id === 'categoryCdbd',
  );

  return (
    <>
      <div className="container mx-auto mb-8 mt-8 max-w-3xl px-6 sm:px-12">
        <Header
          title={publication.title}
          breadcrumbs={[
            { name: text[lang].home, href: `/${lang}` },
            { name: text[lang].publications, href: `/${lang}/read` },
            {
              name: publication.title,
              href: `${lang}/read/${publication.slug}`,
            },
          ]}
          className=""
        />
        <article>
          {publication.description && (
            <p className="text-md mt-1 text-gray-500">
              {publication.description}
            </p>
          )}
          <Author
            params={{
              author: publication.author,
              authorAlt: publication.authorAlt,
              isCdbd: isCdbd,
              lang: lang,
            }}
          />

          <time
            dateTime={publication.date}
            className="text-md mt-3 italic text-gray-500"
          >
            {new Intl.DateTimeFormat(`${lang}-SG`, {
              timeZone: 'Singapore',
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour12: true,
            }).format(new Date(publication.date))}
          </time>
          <ContentfulImage
            src={publication.image.url}
            height={publication.image.height}
            width={publication.image.width}
            alt={publication.image.description}
            className="w-full py-6"
          />

          <div className="prose mb-3 max-w-none">
            <Markdown content={publication.content} />
          </div>
        </article>

        <PublicationFoot
          isCdbd={isCdbd}
          publication={publication}
          lang={lang}
        />

        {relatedPublications.length > 0 && (
          <div>
            <h3 className="mt-8 text-nowrap text-lg font-semibold">
              {text[lang].seeAlso}
            </h3>
            {relatedPublications.map((relatedPublication) => (
              <div key={relatedPublication.slug} className="mt-2 block">
                <Link
                  href={relatedPublication.slug}
                  className=" font-medium text-gray-700 underline hover:text-button"
                >
                  {relatedPublication.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export async function generateMetadata(
  { params }: { params: { slug: string; lang: Locale } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const { slug, lang } = params;
  const publication = await getPublication(slug, lang, isEnabled);

  return {
    title: `${publication.title}`,
    description: `${
      publication.description !== null
        ? publication.description
        : `${obtainTextContent(publication.content).slice(0, 300)}...`
    }`,
    openGraph: {
      ...openGraph,
      title: `${publication.title} | True Jesus Church`,
      url: `https://tjc.sg/read/${slug}`,
      description: `${
        publication.description !== null
          ? publication.description
          : `${obtainTextContent(publication.content).slice(0, 300)}...`
      }`,
      images: [
        {
          url: publication.image.url,
          width: publication.image.width,
          height: publication.image.height,
          alt: publication.image.description,
        },
      ],
    },
  };
}
