import { Locale } from '@/i18n-config';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { slug: string; lang: Locale };
}) {
  let { slug, lang } = params;

  redirect(`/${lang}/read/${slug}`);
}
