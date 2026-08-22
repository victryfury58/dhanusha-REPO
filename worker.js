// Minimal Worker: serve static assets, with SPA fallback handled by
// the `assets` binding's `not_found_handling: "single-page-application"` config.
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
