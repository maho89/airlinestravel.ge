import React, { Suspense, useEffect, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import  TranslationProvider  from './services/translations/TranslationProvider';
import  EntryParametersProvider  from './services/entryParameters/EntryParametersProvider';
import  GeoProvider  from './services/geo/GeoProvider';
import  CurrenciesProvider  from './services/currencies/CurrenciesProvider';
import  PostMessagesProvider  from './services/postMessages/PostMessagesProvider';
import ErrorBoundary from './scenes/ErrorBoundary/index';
import constructClient from './services/apollo/construct';
import GlobalStyles from './styles/GlobalStyles';
import DeeplinkSyncProvider from './services/deeplinkSync';
import Basic from "src/scenes/Basic";
const getAffilid = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('affilid')) {
    return urlParams.get('affilid');
  } else {
    return 'malxazvardukazegmailcomtestw';
  }
};

export default() => {
  const client = useRef(constructClient(`featureName=BasicWidget&affilid=${getAffilid()}`));

  return (
      <ApolloProvider client={client.current}>
        <EntryParametersProvider>
          <DeeplinkSyncProvider>
            <GeoProvider>
              <PostMessagesProvider>
                <ErrorBoundary>
                  <TranslationProvider>
                    <CurrenciesProvider>
                      <GlobalStyles />
                        <Basic />
                    </CurrenciesProvider>
                  </TranslationProvider>
                </ErrorBoundary>
              </PostMessagesProvider>
            </GeoProvider>
          </DeeplinkSyncProvider>
        </EntryParametersProvider>
      </ApolloProvider>
  );
};
