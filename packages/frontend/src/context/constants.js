export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5001'
        : 'https://mern-v-social-media.onrender.com'

export const clientUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5002'
        : 'https://v-social-media.netlify.app'