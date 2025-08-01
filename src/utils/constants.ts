// CDN Configuration
export const CDN_BASE_URL = 'https://extracrispe-pyrographics.com';

// Helper function to construct full CDN URLs
export const getCDNUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${CDN_BASE_URL}${normalizedPath}`;
};