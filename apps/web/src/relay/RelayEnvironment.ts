import type { FetchFunction, GraphQLResponse, SubscribeFunction } from 'relay-runtime'
import { Environment, Network, Observable, RecordSource, Store } from 'relay-runtime'
import { createClient } from 'graphql-ws'

const HTTP_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? ''
const WS_ENDPOINT = import.meta.env.VITE_GRAPHQL_WS_ENDPOINT ?? ''

const fetchFunction: FetchFunction = async (params, variables) => {
  const response = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json, application/json',
    },
    body: JSON.stringify({
      query: params.text,
      operationName: params.name,
      variables,
    }),
    credentials: 'include',
  })
  return (await response.json()) as GraphQLResponse
}

const wsClient = createClient({
  url: WS_ENDPOINT,
  lazy: true,
})

const subscribeFunction: SubscribeFunction = (params, variables) =>
  Observable.create((sink) => {
    return wsClient.subscribe(
      {
        operationName: params.name,
        query: params.text ?? '',
        variables,
      },
      {
        next: (value) => sink.next(value as GraphQLResponse),
        error: (err) => sink.error(err instanceof Error ? err : new Error(String(err))),
        complete: () => sink.complete(),
      },
    )
  })

const RelayEnvironment = new Environment({
  network: Network.create(fetchFunction, subscribeFunction),
  store: new Store(new RecordSource()),
})

export default RelayEnvironment
