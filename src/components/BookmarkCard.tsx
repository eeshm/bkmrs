import { type Bookmark } from '@/types/index';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: {bookmark: Bookmark}) {
  return (
    <div className="hover:shadow-md transition-shadow">
      <div className="p-4">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block space-y-1 group"
        >
          <h3 className="font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {bookmark.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {bookmark.url}
          </p>
        </a>
      </div>
    </div>
  );
}
