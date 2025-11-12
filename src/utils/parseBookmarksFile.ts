import { type Bookmark } from '@/types';

export async function parseBookmarksFile(file: File): Promise<Bookmark[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const html = e.target?.result as string;
        const bookmarks = extractBookmarksFromHTML(html);
        resolve(bookmarks);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

function extractBookmarksFromHTML(html: string): Bookmark[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = doc.querySelectorAll('a');
  
  const bookmarks: Bookmark[] = [];
  
  links.forEach((link, index) => {
    const url = link.getAttribute('href');
    const title = link.textContent || 'Untitled';
    
    if (url && url.startsWith('http')) {
      bookmarks.push({
        id: `bookmark_${Date.now()}_${index}`,
        title: title.trim(),
        url: url.trim(),
        createdAt: new Date().toISOString(),
      });
    }
  });
  
  return bookmarks;
}
