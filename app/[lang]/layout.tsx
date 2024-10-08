import './globals.css';
import { Noto_Sans } from 'next/font/google';
import { type Locale } from '../../i18n-config';
import NavBar from './navbar2';
import Link from 'next/link';
import { getWebContent } from '@/lib/api';
import Socials from '@/lib/components/socials';

export const metadata = {
  title: 'True Jesus Church Singapore',
  description: '',
};

const noto_sans = Noto_Sans({
  variable: '--font-noto_sans',
  subsets: ['latin'],
  display: 'swap',
});

const text = {
  en: {
    name: 'True Jesus Church Singapore',
    resource: 'Resources',
    legal: 'Legal',
    copyright: '© 2024 True Jesus Church Singapore. All Rights Reserved.',
  },
  zh: {
    name: '新加坡真耶稣教会',
    resource: '本会简介',
    legal: '法律',
    copyright: '版权所有 © 2024 新加坡真耶穌教会',
  },
};

const learnmore = [
  {
    en: 'TJC International Assembly',
    zh: 'TJC International Assembly',
    href: 'https://tjc.org/',
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
  { en: 'Terms & Conditions', zh: '条规和隐私权方针', href: '#' },
  {
    en: 'Declaration on Religious Harmony',
    zh: '宗教和谐宣言',
    href: '/declaration',
  },
  {
    en: 'Personal Data Protection Policy',
    zh: '个人资料保护法令',
    href: 'https://github.com/tjcscb/pdpp',
  },
];

async function Footer({ lang }: { lang: Locale }) {
  const contentfulText = await getWebContent(lang, false);

  return (
    <footer className="bg-lightblue pt-2">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 basis-1/2 md:mb-0">
            <Link href={`/${lang}`} className="mb-2 flex items-center">
              <span className="text-md self-center whitespace-nowrap font-semibold text-gray-900">
                {text[lang].name}
              </span>
            </Link>
            <p className="mb-2 pr-6 text-xs text-gray-500">
              {contentfulText.footerText}
            </p>
          </div>
          <div className="grid basis-1/2 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900">
                {text[lang].resource}
              </h2>
              <ul className="font-medium text-gray-500">
                {learnmore.map((item) => (
                  <li key={item.en} className="mb-2 text-xs">
                    <Link href={`${item.href}`} className="hover:underline">
                      {item[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900">
                {text[lang].legal}
              </h2>
              <ul className="font-medium text-gray-500">
                {legal.map((item) => (
                  <li key={item.en} className="mb-2 text-xs">
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
          <span className="text-xs text-gray-500 sm:text-center">
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
    <html lang={params.lang} className={noto_sans.variable}>
      <body>
        <section className="flex h-screen min-h-screen flex-col">
          <NavBar lang={lang} />
          <main className="mb-auto block">{children}</main>
          <Footer lang={lang} />
        </section>
      </body>
    </html>
  );
}
