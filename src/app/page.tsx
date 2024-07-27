import { createClient } from "@/util";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.from("users_profile").select();
  return (
    <>
      <div className="flex flex-col gap-4">
        {data?.map((thing, index) => (
          <>
            <div key={index}>{JSON.stringify(thing)}</div>
            <div></div>
          </>
        ))}
      </div>
    </>
  );
}
