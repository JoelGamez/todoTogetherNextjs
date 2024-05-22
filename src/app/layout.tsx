// src/app/layout.tsx
import { ReactNode } from 'react';
import ApolloProviderClient from '../components/ApolloProviderClient';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderClient>
          {children}
        </ApolloProviderClient>
      </body>
    </html>
  );
}