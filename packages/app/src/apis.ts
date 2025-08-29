import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
  githubAuthApiRef,
  discoveryApiRef,
  oauthRequestApiRef,
} from '@backstage/core-plugin-api';

import { GithubAuth } from '@backstage/core-app-api';


export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  ScmAuth.createDefaultApiFactory(),
];
  createApiFactory({
    api: githubAuthApiRef,
    deps: { discoveryApi: discoveryApiRef, oauthRequestApi: oauthRequestApiRef },
    factory: ({ discoveryApi, oauthRequestApi }) =>
      GithubAuth.create({
        discoveryApi,
        oauthRequestApi,
        // escopos mínimos p/ pegar nome/email
        defaultScopes: ['read:user', 'user:email'],
      }),
  })
