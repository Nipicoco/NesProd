const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.simpleicons.org',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'i.scdn.co',
          pathname: '/**',
        },
      ],
      dangerouslyAllowSVG: true,
    },
  };
  
  export default nextConfig;