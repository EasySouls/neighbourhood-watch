if (!process.env.CONVEX_DEVELOPMENT_ISSUER_DOMAIN) {
  throw new Error('CONVEX_DEVELOPMENT_ISSUER_DOMAIN is not defined');
}

const config = {
  providers: [
    {
      domain: process.env.CONVEX_DEVELOPMENT_ISSUER_DOMAIN,
      applicationID: 'convex',
    },
  ],
};

export default config;
