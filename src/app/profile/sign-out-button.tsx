import { signOutAction } from "@/server/sign-out";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="bg-blue-700 hover:bg-blue-500 duration-200 rounded-lg text-white p-2">
        Sign Out
      </button>
    </form>
  );
}
