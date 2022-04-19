import "styles/globals.css";
import Script from "next/script";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const setPageView = (url: string) => {
  window.gtag?.(
    "config",
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID,
    {
      page_path: url,
    }
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", setPageView);

    return () => {
      router.events.off("routeChangeComplete", setPageView);
    };
  }, [router.events]);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default MyApp;
