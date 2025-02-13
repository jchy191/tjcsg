import ContentfulImage from '@/lib/contentful-image';
import { obtainTextContent } from '@/lib/utils';
import Image from 'next/image';

export default function RelatedPublications({
  relatedPublication: publication,
}: {
  relatedPublication: {
    title: string;
    slug: string;
    description: string;
    content: {
      json: any;
    };
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
}) {
  return (
    <article
      key={publication.slug}
      className="group relative isolate mt-4 flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 pb-4 pl-4 pr-8 pt-16"
    >
      <a href={publication.slug}>
        <ContentfulImage
          width={publication.image.width}
          height={publication.image.height}
          src={publication.image.url}
          className="absolute inset-0 -z-10 size-full transform object-cover transition-transform duration-300 group-hover:scale-110"
          alt={publication.title}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 transition-opacity duration-300 group-hover:opacity-50" />
        <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        <h3 className="truncate text-base font-semibold text-white underline md:text-lg">
          {publication.title}
        </h3>
        <p className="line-clamp-2 text-xs font-normal text-gray-100 md:text-sm">
          {publication.description !== null
            ? publication.description
            : obtainTextContent(publication.content)}
        </p>
      </a>
    </article>
  );
}
