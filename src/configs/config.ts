export const config = {
    server: {
        apiURL: process.env.NEXT_PUBLIC_API_URL,
        siteURL: process.env.NEXT_PUBLIC_SITE_URL,
    },
} as const;
