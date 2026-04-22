const nextConfig = {
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "vercel-storage.com",
      "public.blob.vercel-storage.com",
      "media.clubcolonchivilcoy.com", // ✅ agregado
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "media.clubcolonchivilcoy.com", // ✅ agregado
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig