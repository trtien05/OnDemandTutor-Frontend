// const publicRuntimeConfig = {
//     NODE_ENV: import.meta.env.NODE_ENV || 'production',
//     API_URL: import.meta.env.VITE_API_URL,
// };

// export default publicRuntimeConfig;
const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    // API_URL: import.meta.env.VITE_API_URL,
    API_URL: 'http://localhost:8080',
    GOOGLE_CLIENT_ID: '92240285120-dfrisse6lpbab4csku63gvjib7scpi0r.apps.googleusercontent.com',
};

export default publicRuntimeConfig;