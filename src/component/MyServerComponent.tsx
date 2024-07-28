import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignIn from "./Signin";
import Image from "next/image";
import axios from "axios";
import ProfileImage from "./ProfileImage";


 function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/api/auth/logout" });
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}

export default async function MyServerComponent() {
  const session = await auth();
  
  
  return (
    <header>
      <nav>
        <div className="flex flex-row">
          <Link href="/">
            <h1 className="font-serif">Your Logo</h1>
          </Link>
          <div>
            {session?.user ? (
              <div>
                hi!
                {session.user.name}
                <SignOut />
                <Link href="/profile">
                  <ProfileImage session = {session}/>
                  
                </Link>
              </div>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
