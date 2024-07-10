const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    // API_URL: 'http://localhost:8080',
    API_URL: 'https://my-tutor-render.onrender.com',
    GOOGLE_CLIENT_ID: import.meta.env.GOOGLE_CLIENT_ID,
};

export default publicRuntimeConfig;
