/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        API:'https://jobifybackend.vercel.app/api/v1'
    },
    images:{
        domains:['res.cloudinary.com']
    }
};

export default nextConfig;
