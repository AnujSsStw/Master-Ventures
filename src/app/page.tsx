import { Ballot } from "@/components/ballot";
import { Submit } from "@/components/submit";
import Head from "next/head";

async function getBallots() {
  const res = await fetch("http://localhost:3000/api/ballots", {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const data = await res.json();
  return data as {
    items: Ballot[];
  };
}

export interface Ballot {
  title: string;
  id: string;
  items: Items[];
}

export type Items = {
  title: string;
  photoUrL: string;
  id: string;
};

export default async function Home() {
  const ballots = await getBallots();

  return (
    <div className="relative">
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-center text-4xl p-5">Award 2024</h1>

      <div className="p-8">
        {ballots.items.map((ballot) => (
          <div key={ballot.id}>
            <h2 className="text-center text-xl font-bold border-red-50 rounded-md p-2 bg-purple-600 border-2 mt-8 mb-8">
              {ballot.title}
            </h2>
            <ul className="flex sm:flex-col lg:flex-row gap-3 2xl:flex-wrap 2xl:justify-around">
              {ballot.items.map((item) => (
                <Ballot key={item.id} item={item} category={ballot.id} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Submit />
    </div>
  );
}