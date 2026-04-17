export function generateMetadata({
    title,
    description,
    keywords = [],
    image = "/logo_colon_sin_fondo.png",
    type = "website",
  }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.clubcolonchivilcoy.com"
  
    return {
      title,
      description,
      keywords: keywords.join(", "),
      openGraph: {
        title,
        description,
        url: baseUrl,
        siteName: "Club Colon de Chivilcoy",
        images: [
          {
            url: `${baseUrl}${image}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`${baseUrl}${image}`],
      },
    }
  }
  
  