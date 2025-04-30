import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidationSchema } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";

// form schema goes out if the form

async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
  try {
    const newUser = await createUserAccount(values);
    console.log(newUser, "ali");

    if (!newUser) {
      // Optionally show user feedback here
      return;
    }

    // Proceed to navigate or show success
  } catch (error) {
    console.error("Sign-up failed", error);
    // Optionally show user feedback here
  }
}
const isLoading = true;
const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col border border-white  ">
          <img src="/assets/images/logo.svg" alt="" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create a new Account
          </h2>
          <p className="text-light-3 small-medium md:base-regular">
            To use snapgram , enter Account details
          </p>

          <form
            className="flex flex-col gap-5 w-full mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
            // className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
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
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader></Loader> Loading
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account ?
              <Link to="/signin" className="text-primary-500 ml-1">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
