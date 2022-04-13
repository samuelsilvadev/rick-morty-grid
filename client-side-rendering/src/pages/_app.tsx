import { useRef } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "components/Layout";
import "styles/globals.css";

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: ONE_HOUR_IN_MILLISECONDS,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
