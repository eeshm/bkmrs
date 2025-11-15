export interface PageMetadata {
  title: string;
  image: string | null;
  description: string | null;
  favicon: string | null;
}

export async function extractPageMetadata(url: string): Promise<PageMetadata> {
  try {
    // Use microlink API for metadata extraction - no CORS issues
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data.data) {
      return {
        title: data.data.title || new URL(url).hostname,
        image: data.data.image?.url || null,
        description: data.data.description || null,
        favicon: data.data.logo?.url || getFaviconUrl(url),
      };
    }
    
    throw new Error('No metadata found');
  } catch (error) {
    console.error('Metadata extraction failed, falling back to favicon:', error);
    return {
      title: new URL(url).hostname,
      image: null,
      description: null,
      favicon: getFaviconUrl(url),
    };
  }
}

export function getFaviconUrl(url: string): string {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}
