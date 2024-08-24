
import { Button } from "@/components/ui/button";
import { validateRequest } from "./lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "./actions/auth.actions";

export default async function Home() {
  const {user} = await validateRequest()

  if(!user){
  return   redirect("/login")
  }

  return (
    <div>
      protected route 
      {JSON.stringify(user)}
      <div>
        <form action={signOut}>
        <Button type="submit">
          Logout
        </Button>
        </form>
      </div>
    </div>
    
  );
}
