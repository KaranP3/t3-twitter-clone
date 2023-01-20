import { useState } from "react";
import { trpc } from "../utils/trpc";
import { object, string } from "zod";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet text is required",
  })
    .min(10)
    .max(280),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync } = trpc.tweet.create.useMutation();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await tweetSchema.parse({ text });
    } catch (e) {
      setError(e.message);
    }

    if (text.length < 10) {
      return;
    }
    mutateAsync({ text });
  }

  return (
    <>
      {error && JSON.stringify(error)}
      <form className="relative" onSubmit={handleSubmit}>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Write a description..."
          defaultValue={""}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
