import './globals.css';
import {
  Rock_Salt,
  Source_Sans_3,
  ZCOOL_KuaiLe,
  Noto_Sans_SC,
} from 'next/font/google';
import localFont from 'next/font/local';
import { type Locale } from '../../i18n-config';
import NavBar from './navbar';
import Link from 'next/link';
import Socials from '@/lib/components/socials';
import { Metadata } from 'next';
import { openGraph } from '../shared-metadata';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: {
    template: '%s | True Jesus Church Singapore',
    default: 'True Jesus Church Singapore',
  },
  description:
    "We're True Jesus Church, a global Bible-based church. We welcome you to join God's loving family. Our goal is simple: transform lives and make disciples of Christ through preaching God's full truth of salvation.",
  keywords: [
    'Church',
    'Christianity',
    'Bible',
    'Truth',
    'Gospel',
    'God',
    'Jesus Christ',
  ],
  metadataBase: new URL('https://tjc.sg/'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      zh: '/zh',
    },
  },
  manifest: 'https://tjc.sg/manifest.json',
  category: 'christianity',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    apple: { url: '/apple-touch-icon.png', sizes: '120x120' },
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#007da4',
    },
  },
  openGraph: {
    ...openGraph,
    title: 'Landing Page | True Jesus Church',
  },
};

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto_sans_SC',
  subsets: ['latin'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  variable: '--font-source_sans',
  subsets: ['latin'],
  display: 'swap',
});
const zCOOL_KuaiLe = ZCOOL_KuaiLe({
  variable: '--font-zcool_kuaile',
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
});

const rockSalt = Rock_Salt({
  variable: '--font-rock_salt',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

const text = {
  en: {
    name: 'True Jesus Church Singapore',
    explore: 'Explore',
    legal: 'Legal',
    copyright: '© 2024 True Jesus Church Singapore. All Rights Reserved.',
    footer:
      "👋🏼 Hello, we're True Jesus Church, a global Bible-based church. We welcome you to join God's loving family.  📌 Our goal is simple: transform lives and make disciples of Christ through preaching God's full truth of salvation.",
  },
  zh: {
    name: '新加坡真耶稣教会',
    explore: '寻找',
    legal: '法律',
    copyright: '版权所有 © 2024 新加坡真耶穌教会',
    footer:
      '👋🏼 您好，我们是真耶稣教会，一间全球性的以圣经为根基的教会。我们欢迎您加入充满爱的神的大家庭。📌 我们的目标很简单：通过传扬神救恩的完整真理，改变生命并使人成为基督的门徒。',
  },
};

const learnmore = [
  {
    en: 'TJC International Assembly',
    zh: '真耶稣教会联总',
    href: 'https://tjc.org/',
  },
  {
    en: 'Sermon Archive (Members)',
    zh: '证道（信徒）',
    href: 'https://elibrary.tjc.sg',
  },
  { en: 'Our Stories', zh: '本会的故事', href: 'https://tjc.org/our-stories/' },
  {
    en: 'Our Basic Beliefs',
    zh: '信仰简介',
    href: 'https://tjc.org/intro-to-basic-beliefs/',
  },
  {
    en: 'Complete Gospel',
    zh: '全备福音',
    href: 'https://tjc.org/blog/the-complete-gospel/',
  },
  { en: 'FAQ', zh: '信仰问答', href: 'https://tjc.org/seek/' },
];

const legal = [
  { en: 'Terms & Conditions', zh: '条款与条件', href: '#' },
  {
    en: 'Declaration on Religious Harmony',
    zh: '宗教和谐声明',
    href: '/declaration',
  },
  {
    en: 'Personal Data Protection Policy',
    zh: '个人资料保护政策',
    href: 'https://github.com/tjcscb/pdpp',
  },
];

function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="bg-lightblue pt-2">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 basis-1/2 md:mb-0">
            <Link href={`/${lang}`} className="mb-2 flex items-center">
              <span className="self-center whitespace-nowrap text-base font-semibold text-gray-900 hover:text-gray-500 xs:text-lg lg:text-xl">
                {text[lang].name}
              </span>
            </Link>
            <p className="mb-2 pr-6 text-xs text-gray-600 xs:text-sm lg:text-base">
              {text[lang].footer}
            </p>
          </div>
          <div className="grid basis-1/2 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 xs:text-base lg:text-lg">
                {text[lang].explore}
              </h2>
              <ul className="font-medium text-gray-500">
                {learnmore.map((item) => (
                  <li
                    key={item.en}
                    className="mb-2 text-xs text-gray-600 xs:text-sm lg:text-base"
                  >
                    <Link href={`${item.href}`} className="hover:underline">
                      {item[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 xs:text-base lg:text-lg">
                {text[lang].legal}
              </h2>
              <ul className="font-medium text-gray-500">
                {legal.map((item) => (
                  <li
                    key={item.en}
                    className="mb-2 text-xs text-gray-600 xs:text-sm lg:text-base"
                  >
                    <Link href={`${item.href}`} className="hover:underline">
                      {item[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 " />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs text-gray-600 xs:text-sm sm:text-center lg:text-base">
            {text[lang].copyright}
          </span>
          <Socials
            size={5}
            style="mt-4 flex sm:mt-0 sm:justify-center md:pr-12 lg:pr-24"
          />
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  return (
    <html
      lang={params.lang}
      className={`scroll-smooth ${sourceSans.variable} ${rockSalt.variable} ${notoSansSC.variable} ${zCOOL_KuaiLe.variable}`}
    >
      <Script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></Script>
      <body>
        <section className="flex h-[calc(100dvh)] min-h-[calc(100dvh)] flex-col">
          <NavBar lang={lang} />
          <main className="overflow relative mb-auto block">
            <div className="mb-8 md:mb-12 lg:mb-16">
              {children}
              <SpeedInsights />
              <Analytics />
            </div>
          </main>
          <Footer lang={lang} />
        </section>
      </body>
    </html>
  );
}
