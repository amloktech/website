import { tokensCSS } from '@/lib/brand';

export const dynamic = 'force-static';

export function GET() {
  return new Response(tokensCSS, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Content-Disposition': 'attachment; filename="amlok-tokens.css"',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
