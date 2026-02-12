import { customComponents } from '@/builder-registry';
import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from '@builder.io/sdk-react';
import type { Metadata } from 'next';

// Builder Public API Key set in .env file
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!;

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const urlPath = '/' + (params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    options: getBuilderSearchParams(searchParams),
    apiKey: PUBLIC_API_KEY,
    model: 'page',
    userAttributes: { urlPath },
  });

  return {
    title: content?.data?.title || 'Страница',
    description: content?.data?.description || '',
    ...(process.env.NEXT_PUBLIC_DOMAIN === "https://uchitel.vercel.app" && {
      alternates: {
        canonical: `https://uchitel.ru${urlPath}`
      }
    })
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const urlPath = '/' + (params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    options: getBuilderSearchParams(searchParams),
    apiKey: PUBLIC_API_KEY,
    model: 'page',
    userAttributes: { urlPath },
  });

  const canShowContent = content || isPreviewing(searchParams);

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
