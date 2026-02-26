/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import posthog from 'posthog-js';

export const onClientEntry = () => {
  posthog.init(process.env.GATSBY_POSTHOG_KEY, {
    api_host: process.env.GATSBY_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: ph => {
      if (process.env.NODE_ENV === 'development') {ph.debug();}
    },
  });
};

export const onRouteUpdate = ({ location }) => {
  posthog.capture('$pageview', { path: location.pathname });
};
