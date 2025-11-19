import { EmLogoIcon } from '@/icons/logo';
import { BlurFade } from "@/components/ui/blur-fade";
interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className=" p-4 sm:p-3 max-w-lg mx-auto text-lg sm:text-[15px]  text-justify font-geist space-y-2 sm:space-y-1.5">
        <BlurFade delay={0.2}>
        <h2 className="font-semibold ">
          Stash
        </h2>
        </BlurFade >
        <BlurFade delay={0.2}>
        <p className="text-gray-500 ">
          A quiet home for your most valuable hyperlinks. You may, however, find more elegant solutions elsewhere
        </p>
        </BlurFade>
        <BlurFade delay={0.3} >
        <h2 className="font-semibold mt-6 ">
          About
        </h2>
        </BlurFade>
        <BlurFade delay={0.4} >
        <p className="text-gray-500 ">
          Created for personal needs and refined to personal sensibilities. Intentionally minimal, almost austere. It recognizes input types, enriches links with metadata, and keeps the experience firmly keyboard-first. Animations are discreet; performance, swift — or so it claims. No onboarding, no tracking, and never any ads.
        </p>
        </BlurFade>
        <BlurFade delay={0.5} >
        <button
          onClick={onAddClick}
          className="cursor-pointer mt-6  text-gray-900  hover:text-gray-600  transition-colors duration-300 underline underline-offset-2"
        >
          Start Stashing 
        </button>
        </BlurFade>        
        <BlurFade delay={0.6} >
        <p className="text-gray-400   text-sm sm:text-xs mt-8 pt-4 border-t border-gray-200  flex items-center justify-between">
          <span>
            Inspired by{' '}
            <a 
              href="https://bmrks.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-600  transition-colors"
            >
              Rauno's Bookmarks
            </a>
          </span>
          <a 
            href="https://eeshm.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 duration-300 transition-opacity cursor-pointer"
          >
            <EmLogoIcon className='size-8 sm:size-6 stroke-gray-100 '/>
          </a>
        </p>
        </BlurFade>
      </div>
    </div>
  );
}
