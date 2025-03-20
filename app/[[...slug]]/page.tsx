import { customComponents } from '@/builder-registry';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from '@builder.io/sdk-react';

// Builder Public API Key set in .env file
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!;

export default async function Page(props: any) {
  const urlPath = '/' + ((await props.params)?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    options: getBuilderSearchParams((await props.searchParams)),
    apiKey: PUBLIC_API_KEY,
    model: 'page',
    userAttributes: { urlPath },
  });

  const canShowContent = content || isPreviewing((await props.searchParams));

  if (!canShowContent) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1>404</h1>
        <p>Страница не найдена на сайте.</p>
      </div>
    );
  }

  return (
    <>
      <title>{content?.data?.title}</title>
      <meta name="description" content={content?.data?.description} />
      {process.env.NEXT_PUBLIC_DOMAIN === "https://uchitel.vercel.app" && <link rel="canonical" href={`https://uchitel.ru${urlPath}`} />}
      {!content?.data?.noHeader && <Header />}
      <Content
        content={content}
        apiKey={PUBLIC_API_KEY}
        model="page"
        customComponents={customComponents}
      />
      <Footer />
    </>
  )
}
