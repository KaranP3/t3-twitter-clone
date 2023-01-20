import Image from "next/image";
import type { RouterOutputs } from "../utils/trpc";
import dayjs from "dayjs";

export function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
  return (
    <>
      <div className="border-slate relative mb-8 border-b border-solid pb-8 ">
        <div className="relative flex items-start space-x-3">
          <div className="relative ">
            {tweet.author.image && (
              <Image
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                src={tweet.author.image}
                alt={`${tweet.author.name} profile`}
                width={48}
                height={48}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div>
              <div className="text-sm">
                <a href={""} className="font-medium text-gray-900">
                  {tweet.author.name}
                </a>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                {dayjs(tweet.createdAt).toString()}
              </p>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <p>{tweet.text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
