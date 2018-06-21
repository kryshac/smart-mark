import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    // Create an http link:
    const http = httpLink.create({
      uri: 'https://api.graph.cool/simple/v1/cjim08vux2t0t0154qxci1vm1',
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `wss://subscriptions.graph.cool/v1/cjim08vux2t0t0154qxci1vm1`,
      options: {
        reconnect: false,
      },
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        // const { kind, operation } = getMainDefinition(query);
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
