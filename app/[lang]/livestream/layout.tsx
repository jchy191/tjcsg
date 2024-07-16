import Container from '@/lib/components/container';
import SpecialEvents from '../special-events';
import GlobalLivestream from './global-livestream';
import { Locale } from '@/i18n-config';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  return (
    <>
      {children}
      <Container background="bg-white">
        <SpecialEvents lang={lang} />
      </Container>
      <GlobalLivestream lang={lang} background="bg-stone-50" />
    </>
  );
}
