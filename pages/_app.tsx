import { ApolloProvider } from "@apollo/client";
import client from "../src/lib/apollo-client";
import "../src/app/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
