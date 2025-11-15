import { type Bookmark } from '@/types';
import { getFaviconUrl } from '@/utils/extractMetadata';

export async function parseBookmarksFile(file: File): Promise<Bookmark[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const html = e.target?.result as string;
        const bookmarks = await extractBookmarksFromHTML(html);
        resolve(bookmarks);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

async function extractBookmarksFromHTML(html: string): Promise<Bookmark[]> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = doc.querySelectorAll('a');
  
  const bookmarks: Bookmark[] = [];
  
  for (let index = 0; index < links.length; index++) {
    const link = links[index];
    const url = link?.getAttribute('href');
    const title = link?.textContent || 'Untitled';
    
    if (url && url.startsWith('http')) {
      bookmarks.push({
        id: `bookmark_${Date.now()}_${index}`,
        title: title.trim(),
        url: url.trim(),
        favicon: getFaviconUrl(url),
        createdAt: new Date().toISOString(),
      });
    }
  }
  
  return bookmarks;
}
