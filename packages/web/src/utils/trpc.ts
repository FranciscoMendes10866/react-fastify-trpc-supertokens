import { createTRPCReact } from "@trpc/react";

import type { IRouter } from "@monorepo/api";

export const trpc = createTRPCReact<IRouter>();
