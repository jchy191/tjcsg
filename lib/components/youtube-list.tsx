'use-client';
import Link from 'next/link';

export default function YoutubeList({
  playlist,
  index,
  sizes = 'w-[24rem] xs:w-[30rem] sm:w-[35rem]',
}: {
  playlist: string;
  index: number[];
  sizes?: string;
}) {
  return (
    <div className={`flex overflow-x-scroll`}>
      <div className="shadow-gray-150 flex snap-x flex-nowrap gap-8 px-8 py-2 shadow-inner">
        {index.map((i) => (
          <div className={`${sizes} snap-center`} key={i}>
            <div className="relative inline-block w-full overflow-hidden pt-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed?listType=playlist&list=${playlist}&index=${i}&modestbranding=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
              ></iframe>
            </div>
          </div>
        ))}
        <div className={`${sizes} snap-center`}>
          <div className="flex h-full w-full items-center justify-center">
            <div className="block text-pretty text-center ">
              <Link
                href={`https://www.youtube.com/playlist?list=${playlist}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg leading-loose text-button underline hover:text-button_hover xs:text-xl sm:text-2xl"
              >
                Check out the full playlist on our YouTube channel!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
