import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../src/lib/apollo-client";
import type { AppProps } from "next/app";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";
import ClientThemeWrapper from "../src/components/ClientThemeWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AppRouterCacheProvider>
      <ApolloProvider client={client}>
        {isClient ? (
          <ThemeProvider theme={theme}>
            <ClientThemeWrapper>
              <Component {...pageProps} />
            </ClientThemeWrapper>
          </ThemeProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </ApolloProvider>
    </AppRouterCacheProvider>
  );
}

export default MyApp;
