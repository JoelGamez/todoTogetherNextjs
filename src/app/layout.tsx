import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { ReactNode } from "react";
import ApolloProviderClient from "../components/ApolloProviderClient";

import ClientThemeWrapper from "../components/ClientThemeWrapper";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <AppRouterCacheProvider>
          <ApolloProviderClient>
            <ThemeProvider theme={theme}> */}
        {/* <div
          style={{
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
          }}
        > */}
        <AppRouterCacheProvider>
          <ApolloProviderClient>
            <ThemeProvider theme={theme}>
              <ClientThemeWrapper>{children}</ClientThemeWrapper>
            </ThemeProvider>
          </ApolloProviderClient>
        </AppRouterCacheProvider>

        {/* </div> */}
        {/* </ThemeProvider>
          </ApolloProviderClient>
        </AppRouterCacheProvider> */}
      </body>
    </html>
  );
}
