const DEFAULT_BUILDER_CDN_HOST = "https://cdn.uchitel.ru";
const DEFAULT_BUILDER_API_HOST = "https://api.uchitel.ru";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const BUILDER_CDN_HOST = trimTrailingSlash(
  process.env.NEXT_PUBLIC_BUILDER_CDN_HOST || DEFAULT_BUILDER_CDN_HOST,
);

export const BUILDER_API_HOST = trimTrailingSlash(
  process.env.NEXT_PUBLIC_BUILDER_API_HOST || DEFAULT_BUILDER_API_HOST,
);

const BUILDER_HOST_REPLACEMENTS = [
  ["https://cdn.builder.io", BUILDER_CDN_HOST],
  ["http://cdn.builder.io", BUILDER_CDN_HOST],
  ["https://api.builder.io", BUILDER_API_HOST],
  ["http://api.builder.io", BUILDER_API_HOST],
] as const;

export const rewriteBuilderUrl = (value: string) =>
  BUILDER_HOST_REPLACEMENTS.reduce(
    (url, [from, to]) => url.replaceAll(from, to),
    value,
  );

export function rewriteBuilderUrls<T>(value: T): T {
  if (typeof value === "string") {
    return rewriteBuilderUrl(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => rewriteBuilderUrls(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        rewriteBuilderUrls(item),
      ]),
    ) as T;
  }

  return value;
}
