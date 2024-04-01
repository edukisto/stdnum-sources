// @ts-check

/**
 * @see {@link https://nextjs.org/docs/pages/building-your-application/deploying/static-exports}
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '/stdnum',
  distDir: 'out',
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
