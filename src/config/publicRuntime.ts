const publicRuntimeConfig = {
    NODE_ENV: import.meta.env.NODE_ENV || 'production',
    API_URL: 'http://localhost:8080',
    GOOGLE_CLIENT_ID: import.meta.env.GOOGLE_CLIENT_ID,
    FIREBASE_API_KEY:import.meta.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN:import.meta.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID:import.meta.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET:import.meta.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID:import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID:import.meta.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID:import.meta.env.FIREBASE_MEASUREMENT_ID,
    SYNCFUSION_LICENSE_KEY:import.meta.env.SYNCFUSION_LICENSE_KEY,
};

export default publicRuntimeConfig;
