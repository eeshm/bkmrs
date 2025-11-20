import { EmLogoIcon } from '@/icons/logo';
import { BlurFade } from "@/components/ui/blur-fade";
interface EmptyStateProps {
  onAddClick: () => void;
  onImportClick?: () => void;
}

export function EmptyState({ onAddClick, onImportClick }: EmptyStateProps) {
  return (
    <div className="flex justify-center items-center pt-20">
      <div className=" p-4 sm:p-3 max-w-lg mx-auto text-xl sm:text-[16px] text-justify font-geist space-y-1 sm:space-y-1.5">
        <BlurFade delay={0.2}>
        <h2 className="font-semibold sm:text-[#edecec]">
          Stash
        </h2>
        </BlurFade >
        <BlurFade delay={0.2}>
        <p className="text-gray-500 sm:text-[#edecec]/60">
          A quiet home for your most valuable hyperlinks. You may, however, find more elegant solutions elsewhere.
        </p>
        </BlurFade>
        <BlurFade delay={0.3} >
        <h2 className="font-semibold mt-6 sm:text-[#edecec]">
          About
        </h2>
        </BlurFade>
        <BlurFade delay={0.4} >
        <p className="text-gray-500 sm:text-[#edecec]/60">
          Created for personal needs and refined to personal sensibilities. Intentionally minimal, almost austere. It recognizes input types, enriches links with metadata, and keeps the experience firmly keyboard-first. Animations are discreet; performance, swift — or so it claims. No onboarding, no tracking, and never any ads.
        </p>
        </BlurFade>
        <BlurFade delay={0.5} >
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={onAddClick}
            className="cursor-pointer sm:text-[#edecec] sm:hover:opacity-80 transition-all duration-300 underline underline-offset-4"
          >
            Start Stashing
          </button>
          {onImportClick && (
            <>
              <span className="text-gray-400">/</span>
              <button
                onClick={onImportClick}
                className="cursor-pointer sm:text-[#edecec] sm:hover:opacity-80 transition-all duration-300 underline underline-offset-4"
              >
                Import
              </button>
            </>
          )}
        </div>
        </BlurFade>        
        <BlurFade delay={0.6} >
        <p className="sm:text-[#edecec]/60  text-xs sm:text-xs mt-8 pt-4 border-t border-gray-200  flex items-center justify-between">
          <span>
            Inspired by{' '}
            <a 
              href="https://bmrks.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white  transition-colors"
            >
              Rauno's Bookmarks
            </a>
          </span>
          <a 
            href="https://eeshm.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <EmLogoIcon className='duration-300 transition-colors size-6 sm:size-6 fill-black sm:fill-[#edecec]/60 sm:hover:fill-white'/>
          </a>
        </p>
        </BlurFade>
      </div>
    </div>
  );
}
