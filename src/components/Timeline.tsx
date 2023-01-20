import { trpc } from "../utils/trpc";
import { CreateTweet } from "./CreateTweet";
import { Tweet } from "./Tweet";

export function Timeline() {
  const { data } = trpc.tweet.timeline.useQuery({});

  return (
    <div>
      <CreateTweet></CreateTweet>
      <div className="mt-8 flow-root">
        <ul role="list" className="-mb-8">
          {data?.tweets.map((tweet) => (
            <li key={tweet.id}>
              <Tweet tweet={tweet}></Tweet>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
