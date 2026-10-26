import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './router'; // import type — erased at build

export const trpc = createTRPCReact<AppRouter>();