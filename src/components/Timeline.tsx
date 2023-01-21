import { trpc } from "../utils/trpc";
import { CreateTweet } from "./CreateTweet";
import { Tweet } from "./Tweet";

export function Timeline() {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const tweets = data?.pages?.flatMap((page) => page.tweets) ?? [];

  return (
    <div>
      <CreateTweet></CreateTweet>
      <div className="mt-8 flow-root">
        <ul role="list" className="-mb-8">
          {tweets.map((tweet) => (
            <li key={tweet.id}>
              <Tweet tweet={tweet}></Tweet>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <button
            className="inline-flex items-center rounded-md border border-slate-500 bg-white px-4 py-2 text-sm font-medium text-slate-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetching}
          >
            Load more tweets
          </button>
        </div>
      </div>
    </div>
  );
}
