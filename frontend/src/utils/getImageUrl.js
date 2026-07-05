export const getImageUrl = (path) => {
  if (!path) return '/placeholder.png';
  if (path.startsWith('http')) return path; // already absolute (e.g. Cloudinary later)
  return `${import.meta.env.VITE_SERVER_URL}${path}`;
};