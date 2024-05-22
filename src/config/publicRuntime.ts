const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    API_URL: import.meta.env.VITE_API_URL,
    // API_URL: 'abc:8080',
};

export default publicRuntimeConfig;
