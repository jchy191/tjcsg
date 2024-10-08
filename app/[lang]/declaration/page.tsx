import { Locale } from '@/i18n-config';
import Container from '@/lib/components/container';
import Header from '@/lib/components/header';

const text = {
  en: { title: 'Declaration on Religious Harmony', home: 'Home' },

  zh: { title: 'Declaration on Religious Harmony', home: 'Home' },
};

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  return (
    <Container background="bg-white">
      <div className="block">
        <Header
          title={text[lang].title}
          breadcrumbs={[
            { name: text[lang].home, href: '/' },
            { name: text[lang].title, href: '.' },
          ]}
        />
        <p>
          We acknowledge that religious harmony is vital for peace, progress and
          prosperity in our multi-racial and multi-religious nation.
        </p>
        <br />
        <p>
          We are committed to preserve religious harmony through mutual
          tolerance, confidence, respect and understanding.
        </p>
        <br />
        <p>
          We shall always recognize the secular nature of our state, promote
          cohesion within our society, respect each other&apos;s freedom of
          religion, grow our common space while respecting our diversity, foster
          inter-religious communications, and thereby ensure that religion will
          not be abused to create conflict and disharmony in Singapore.
        </p>
      </div>
    </Container>
  );
}
