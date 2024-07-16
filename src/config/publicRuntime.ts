const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
     API_URL: 'http://localhost:8080',
    //API_URL: 'https://my-tutor-render.onrender.com',
};

export default publicRuntimeConfig;
