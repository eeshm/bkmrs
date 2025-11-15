export interface PageMetadata {
  title: string;
  image: string | null;
  description: string | null;
  favicon: string | null;
}

export async function extractPageMetadata(url: string): Promise<PageMetadata> {
  try {
    // Validate URL first
    new URL(url);
    
    // Use microlink API for metadata extraction
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    
    const data = await response.json();
    
    if (data.data) {
      return {
        title: data.data.title || new URL(url).hostname,
        image: data.data.image?.url || null,
        description: data.data.description || null,
        favicon: data.data.logo?.url || getFaviconUrl(url),
      };
    }
    
    // Fallback if no data
    return {
      title: new URL(url).hostname,
      image: null,
      description: null,
      favicon: getFaviconUrl(url),
    };
  } catch (error) {
    console.error('Metadata extraction failed:', error);
    // Always return favicon as fallback
    try {
      return {
        title: new URL(url).hostname,
        image: null,
        description: null,
        favicon: getFaviconUrl(url),
      };
    } catch {
      return {
        title: 'Bookmark',
        image: null,
        description: null,
        favicon: null,
      };
    }
  }
}

export function getFaviconUrl(url: string): string {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}
