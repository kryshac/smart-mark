import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    const http = httpLink.create({
      uri: 'https://api.graph.cool/simple/v1/cjim08vux2t0t0154qxci1vm1',
    });

    const ws = new WebSocketLink({
      uri: `wss://subscriptions.graph.cool/v1/cjim08vux2t0t0154qxci1vm1`,
      options: {
        reconnect: false,
      },
    });

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      ws,
      http,
    );

    const auth = setContext((_, { headers }) => {
      const token = localStorage.getItem('token');

      if (!token) {
        return {};
      }
      return { headers: headers.append('Authorization', `Bearer ${token}`) };
    });

    apollo.create({
      link: auth.concat(errorLink.concat(link)),
      cache: new InMemoryCache(),
    });
  }
}
