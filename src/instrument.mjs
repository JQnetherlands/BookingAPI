// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import { init } from "@sentry/node";

init({
  dsn: "https://4eb873d8ff0d388c41e5965648c85c57@o4510115802710016.ingest.de.sentry.io/4510397768663120",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
