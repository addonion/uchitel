"use client";

import { useLayoutEffect } from "react";
import { rewriteBuilderUrl } from "@/lib/builder-proxy";

declare global {
  interface Window {
    __uchitelBuilderFetchProxy?: boolean;
  }
}

const rewriteFetchInput = (input: Parameters<typeof fetch>[0]) => {
  if (typeof input === "string") {
    return rewriteBuilderUrl(input);
  }

  if (input instanceof URL) {
    return new URL(rewriteBuilderUrl(input.href));
  }

  if (input instanceof Request) {
    const url = rewriteBuilderUrl(input.url);
    return url === input.url ? input : new Request(url, input);
  }

  return input;
};

export function BuilderFetchProxy() {
  useLayoutEffect(() => {
    if (window.__uchitelBuilderFetchProxy) {
      return;
    }

    const originalFetch = window.fetch.bind(window);

    window.fetch = (input, init) => originalFetch(rewriteFetchInput(input), init);
    window.__uchitelBuilderFetchProxy = true;
  }, []);

  return null;
}
