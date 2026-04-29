/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import posthog from 'posthog-js';

let posthogEnabled = false;

export const onClientEntry = () => {
  const key = process.env.GATSBY_POSTHOG_KEY;
  if (!key) {
    return;
  }
  posthogEnabled = true;
  posthog.init(key, {
    api_host: process.env.GATSBY_POSTHOG_HOST || 'https://app.posthog.com',
    // Gatsby is an SPA: we send $pageview from onRouteUpdate only (avoids double counts).
    capture_pageview: false,
    loaded: ph => {
      if (process.env.NODE_ENV === 'development') {
        ph.debug();
      }
    },
  });
};

export const onRouteUpdate = ({ location }) => {
  if (!posthogEnabled) {
    return;
  }
  posthog.capture('$pageview', { path: location.pathname });
};
