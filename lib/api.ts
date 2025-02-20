import { Locale } from '@/i18n-config';
import { Books } from './bible-books';
import { Church } from './church-details';
import { TagIds } from './tags';

export type MarkdownType = {
  json: any;
  links: {
    assets: {
      block: [
        {
          sys: { id: string };
          url: string;
          description: string;
          width: number;
          height: number;
        },
      ];
    };
  };
};

const WEBCONTENT_GRAPHQL_FIELDS = `
  welcomeText
  homepageWorshipTrueGodText
  footerText
  aboutWhoweare {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
          width
          height
        }
      }
    }
  }
  aboutWhoweareIframe
  aboutWhywearehere {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
          width
          height
        }
      }
    }
  }
  aboutWhytrue {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
          width
          height
        }
      }
    }
  }
  worshipInpersonTitle
  worshipInpersonText
  worshipInpersonMedia {
    url
  }
  worshipHowtoprayTitle
  worshipHowtoprayText {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
          width
          height
        }
      }
    }
  }
  worshipHowtoprayMedia {
    url
  }
  livestreamGlobalTitle
  livestreamGlobalText
  livestreamGlobalMedia {
    url
  }
`;
type WebContent = {
  welcomeText: string;
  homepageWorshipTrueGodText: string;
  footerText: string;
  aboutWhoweareIframe: string;
  aboutWhoweare: MarkdownType;
  aboutWhywearehere: MarkdownType;
  aboutWhytrue: MarkdownType;
  worshipInpersonTitle: string;
  worshipInpersonText: string;
  worshipInpersonMedia: {
    url: string;
  };
  worshipHowtoprayTitle: string;
  worshipHowtoprayText: MarkdownType;
  worshipHowtoprayMedia: {
    url: string;
  };
  livestreamGlobalTitle: string;
  livestreamGlobalText: string;
  livestreamGlobalMedia: {
    url: string;
  };
  globalTjciaTitle: string;
  globalTjciaText: string;
  globalTjciaMedia: {
    url: string;
  };
};

const EVENTS_GRAPHQL_FIELDS = `
  slug
  title
  date
  duration
  title2
  date2
  duration2
  church
  ctaButtonText
  ctaButtonLink
  poster {
    url
    description
    width
    height
  }
  summary {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
          width
          height
        }
      }
    }
  }
`;

export type EventEntry = {
  slug: string;
  title: string;
  title2: string;
  date: string;
  duration: number;
  date2: string | null;
  duration2: number | null;
  church: 'adam' | 'tk' | 'sembawang' | 'serangoon';
  poster: {
    url: string;
    description: string;
    width: number;
    height: number;
  };
  summary: MarkdownType;
  ctaButtonText: string;
  ctaButtonLink: string;
};

// Need to separate out "content" because of the query complexity limit of 11000, and "content.links" has a complexity of 1000.
const PUBLICATION_GRAPHQL_FIELDS = `
  slug
  title
  author
  authorAlt
  date
  description
  image {
    url
    description
    width
    height
  }
  relatedArticlesCollection (limit: 5) {
    items {
      slug
      title
      content {
        json
      }
      description
      image {
        url
        description
        width
        height
      }
    }
  }
  contentfulMetadata {
    tags {
      id
      name
    }
  }
`;

export type PublicationEntry = {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorAlt: string;
  date: string;
  content: {
    json: any;
    links: {
      assets: {
        block: [
          {
            sys: { id: string };
            url: string;
            description: string;
            width: number;
            height: number;
          },
        ];
      };
    };
  };
  image: {
    url: string;
    description: string;
    width: number;
    height: number;
  };
  relatedArticlesCollection: {
    items: {
      slug: string;
      title: string;
      description: string;
      content: {
        json: any;
      };
      image: {
        url: string;
        description: string;
        width: number;
        height: number;
      };
    }[];
  };
  contentfulMetadata: {
    tags: {
      id: string;
      name: string;
    }[];
  };
};

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] },
    },
  );
  const result = await response.json();
  return result;
}

function extractPost(fetchResponse: any): EventEntry {
  return fetchResponse?.data?.eventsCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.eventsCollection?.items;
}

function extractWebContent(fetchResponse: any): WebContent {
  return fetchResponse?.data?.webContentCollection?.items?.[0];
}

function extractRichTextContent(fetchResponse: any): any {
  return fetchResponse?.data?.contentTypeRichTextCollection?.items?.[0];
}

function extractCdbdSchedule(fetchResponse: any): any {
  return fetchResponse?.data?.cdbdScheduleCollection?.items?.[0];
}

function extractPublicationEntries(fetchResponse: any): PublicationEntry[] {
  return fetchResponse?.data?.articleCollection?.items;
}

function extractPublication(fetchResponse: any): PublicationEntry {
  return fetchResponse?.data?.articleCollection?.items?.[0];
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      eventsCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${EVENTS_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

export async function getAllUpcomingEvents(
  locale: Locale,
  date: string,
  limit: number = 100,
  skip: number = 0,
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      eventsCollection(
        locale: "${locale}",
        order: date_ASC,
        limit: ${limit},
        skip: ${skip},
        where:{ OR: [{date_gt: "${date}"},{date2_gt:"${date}"} ]}
      ) {
        items {
          slug
          title
          title2
          date
          duration
          date2
          duration2
          church
          poster {
            url
            description
          }
        }
      }
    }`,
  );
  return extractPostEntries(entries);
}

export async function getAllPastEvents(
  locale: Locale,
  date: string,
  limit: number = 100,
  skip: number = 0,
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      eventsCollection(
        locale: "${locale}",
        order: date_DESC,
        limit: ${limit},
        skip: ${skip},
        where:{ OR: [{AND:[{date2_exists:false}, {date_lt: "${date}"}]},{date2_lt:"${date}"} ]}
      ) {
        items {
          slug
          title
          title2
          date
          duration
          date2
          duration2
          church
          poster {
            url
            description
          }
        }
      }
    }`,
  );
  return extractPostEntries(entries);
}

export async function getLatestEventFromChurch(
  locale: Locale,
  church: Church,
): Promise<any> {
  const entries = await fetchGraphQL(
    `query {
      eventsCollection(
        locale: "${locale}",
        order: date_DESC,
        limit: 1,
        where: { church: "${church}" }
      ) {
        items {
          slug
          title
          title2
          date
          duration
          date2
          duration2
          church
          poster {
            url
            description
          }
        }
      }
    }`,
  );
  return extractPost(entries);
}

export async function getAllEventsSlug(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      eventsCollection(order: date_DESC, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          slug
        }
      }
    }`,
    isDraftMode,
  );
  return extractPostEntries(entries);
}

export async function getEvent(slug: string, preview: boolean, locale: string) {
  const entry = await fetchGraphQL(
    `query {
      eventsCollection(where: { slug: "${slug}" }, preview: ${
        preview ? 'true' : 'false'
      }, limit: 1, locale:"${locale}") {
        items {
          ${EVENTS_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return {
    event: extractPost(entry),
  };
}

export async function getTotalPastEvents(date: string): Promise<number> {
  const entry = await fetchGraphQL(
    `query {
        eventsCollection(limit:1000, where:{ OR: [{AND:[{date2_exists:false}, {date_lt: "${date}"}]},{date2_lt:"${date}"} ]}) {
        total
      }
    }`,
  );
  return entry?.data?.eventsCollection?.total;
}

export async function getWebContent(locale: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      webContentCollection(limit: 1, locale:"${locale}"){
        items {
          ${WEBCONTENT_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractWebContent(entry);
}

export async function getRichTextContent(
  slug: string,
  locale: string,
  preview: boolean,
) {
  const entry = await fetchGraphQL(
    `query {
      contentTypeRichTextCollection (where: { slug: "${slug}" }, limit: 1, locale:"${locale}"){
        items {
          slug
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  description
                  width
                  height
                }
              }
            }
          }
        }
      }
    }`,
    preview,
  );
  return extractRichTextContent(entry);
}

export async function getCDBDSchedule(preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      cdbdScheduleCollection(limit: 1, order:month_DESC){
        items{
          schedule {
            url
          }
        }
      }
    }`,
    preview,
  );
  return extractCdbdSchedule(entry);
}

export async function getAllPublicationsSlug(
  isDraftMode: boolean,
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      articleCollection(preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          slug
        }
      }
    }`,
    isDraftMode,
  );
  return extractPublicationEntries(entries);
}

export async function getLatestPublications(
  locale: Locale,
  limit: number = 100,
  skip: number = 0,
  tags: string[] = [],
  author: string = '',
): Promise<PublicationEntry[]> {
  const entry = await fetchGraphQL(
    `query {
        articleCollection(
          limit: ${limit},
          skip: ${skip},
          locale:"${locale}",
          order: date_DESC
          where: {
            ${author ? `author: "${author}"` : ``}
            contentfulMetadata: { tags: { id_contains_all: [ ${tags.length > 0 ? `"${tags.join('","')}"` : ``} ] } }
          }
          
        ) {
        items {
          ${PUBLICATION_GRAPHQL_FIELDS}
            content {
              json
            }
        }
      }
    }`,
  );
  return extractPublicationEntries(entry);
}
export async function getRelatedPublications(
  locale: Locale,
  currSlug: string,
  limit: number = 100,
  currTags: string[] = [],
): Promise<PublicationEntry[]> {
  const entry = await fetchGraphQL(
    `query {
        articleCollection(
          limit: ${limit},
          locale:"${locale}",
          order: date_DESC
          where: {
            contentfulMetadata: { tags: { id_contains_some: [ ${currTags.length > 0 ? `"${currTags.join('","')}"` : ``} ] } },
            slug_not: "${currSlug}"
          }
          
        ) {
        items {
          ${PUBLICATION_GRAPHQL_FIELDS}
            content {
              json
            }
        }
      }
    }`,
  );

  return extractPublicationEntries(entry);
}

export async function getTotalPublications(
  locale: Locale,
  tags: string[] = [],
  author: string = '',
): Promise<number> {
  const entry = await fetchGraphQL(
    `query {
        articleCollection(
          locale:"${locale}",
          order: date_DESC,
          where: {
            ${author ? `author: "${author}"` : ``}
            contentfulMetadata: { tags: { id_contains_all: [ ${tags.length > 0 ? `"${tags.join('","')}"` : ``} ] } }
          }
          
        ) {
        total
      }
    }`,
  );
  return entry?.data?.articleCollection?.total;
}

function extractPublicationTags(fetchResponse: any): TagIds[] {
  const tags = new Set<TagIds>();

  fetchResponse?.data?.articleCollection?.items?.forEach((item: any) => {
    item.contentfulMetadata.tags?.forEach(
      (tag: { name: string; id: TagIds }) => {
        if (!tags.has(tag.id)) {
          tags.add(tag.id);
        }
      },
    );
  });
  return Array.from(tags);
}

export async function getAllPublicationTags(): Promise<TagIds[]> {
  const entry = await fetchGraphQL(
    `query {
      articleCollection(limit: 1000) {
        items {
          contentfulMetadata {
            tags {
              id
              name
            }
          } 
        }
      }
    }`,
  );
  return extractPublicationTags(entry);
}

export async function getPublication(
  slug: string,
  locale: Locale,
  preview: boolean,
): Promise<PublicationEntry> {
  const entry = await fetchGraphQL(
    `query {
      articleCollection(where: { slug: "${slug}" }, locale: "${locale}", preview: ${
        preview ? 'true' : 'false'
      }, limit: 1) {
        items {
          ${PUBLICATION_GRAPHQL_FIELDS}
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    description
                    width
                    height
                  }
                }
              }
            }
        }
      }
    }`,
    preview,
  );
  return extractPublication(entry);
}

function extractCdbdBooks(fetchResponse: any): any {
  const books = new Set();

  fetchResponse?.data?.articleCollection?.items?.forEach((item: any) => {
    let book = item.contentfulMetadata.tags
      .find((tag: any) => tag.id.startsWith('book'))
      ?.name.split('-');
    book.shift();
    books.add(book.join('-'));
  });
  return Array.from(books);
}

export async function getAllCdbdBooks(): Promise<Books[]> {
  const entry = await fetchGraphQL(
    `query {
      articleCollection(
        where: {contentfulMetadata: { tags: { id_contains_all: [ "categoryCdbd" ] } } }
      ) {
        items {
          contentfulMetadata {
            tags {
              id
              name
            }
          }
        }
      }
    }`,
  );
  return extractCdbdBooks(entry);
}

export async function getAllCdbdSlugs(): Promise<{ slug: string }[]> {
  const entry = await fetchGraphQL(
    `query {
      articleCollection(
        order: date_DESC,
        limit:1000, 
        where: {contentfulMetadata: { tags: { id_contains_all: [ "categoryCdbd" ] } } }
      ) {
        items {
          slug
        }
      }
    }`,
  );
  return entry?.data?.articleCollection?.items;
}
