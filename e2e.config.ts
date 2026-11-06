import { web } from "@e2e-dev/web";
import type { E2EConfig } from "e2e";

export default {
  targets: [
    {
      name: "chromium",
      engine: web(),
      app: {
        url: "http://127.0.0.1:3000",
        command: {
          executable: "pnpm",
          args: ["exec", "next", "start", "--hostname", "127.0.0.1"],
          log: ".e2e/logs/app.log",
        },
      },
    },
  ],
  workers: 1,
  retries: 0,
  reporters: ["list", "junit"],
  trace: "retain-on-failure",
  video: "retain-on-failure",
} satisfies E2EConfig;
