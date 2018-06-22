import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
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

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || null),
      });

      return forward(operation);
    });

    apollo.create({
      link: concat(authMiddleware, link),
      cache: new InMemoryCache(),
    });
  }
}
