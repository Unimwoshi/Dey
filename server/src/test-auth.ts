// server/src/test-auth.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../../client/src/trpc/router';

let cookie = '';

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: 'http://localhost:5000/trpc',
    transformer: superjson,
    fetch: async (url, opts) => {
      const res = await fetch(url, { ...opts, headers: { ...opts?.headers, cookie } });
      const setCookie = res.headers.get('set-cookie');
      if (setCookie) cookie = setCookie.split(';')[0]; // grab just "token=..."
      return res;
    },
  })],
});

async function main() {
  const login = await client.auth.login.mutate({ email: 'test@example.com', password: 'password123' });
  console.log('Login result:', login);

  const me = await client.auth.me.query(); // uses the captured cookie
  console.log('Me:', me);
}

main().catch((err) => console.error('Auth test failed:', err));