"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/app/types"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signIn } from "@/app/actions/auth.actions"




const Login = () => {
const router = useRouter()

    // 1. Define your form.
const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
    username: "",
    password: "",
    },
})

  // 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof LoginSchema>) {
const res = await signIn(values)
if(res.error){
    toast({

        variant: "destructive",
        description: res.error,
})
} else if (res.success){
    toast({
        title: "Success",
        description: "Welcome back ",
        variant: "success",
    });
    router.push('/') 
}


}
return (
    <div className="min-w-500">
    <Form {...form}>
                    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit">Sign In</Button>
                    </form>
                </Form>
                </div>
)
}

export default Login
