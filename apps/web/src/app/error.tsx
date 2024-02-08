"use client";

import GoAppCard from "~/components/go-app-card";

export default function ErrorPage({
  error,
}: {
  error: Error;
}) {
  return (
    <div className="pt-16 pb-4 px-8 flex flex-col h-svh">
      <h2 className="text-[28px] font-bold text-center">{error.message}</h2>
      <div className="mt-auto">
        <GoAppCard />
      </div>
    </div>
  );
}
