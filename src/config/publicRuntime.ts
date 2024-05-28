const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    API_URL: import.meta.env.VITE_API_URL,
    GOOGLE_CLIENT_ID: import.meta.env.GOOGLE_CLIENT_ID
};

export default publicRuntimeConfig;
