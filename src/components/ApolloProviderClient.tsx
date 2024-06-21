"use client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";
import Cookies from "js-cookie";

// Create an http link:
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // replace with your server URI
});

console.log("apollo is used here");
// Create a middleware for the headers:
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create the Apollo Client:
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProviderClient = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderClient;
