"use client";

import React from "react";
import Image from "next/image";
import { loginFormSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { useSignUpMutation } from "@/store/services/loginApi";

const LoginForm = () => {
  const { push } = useRouter();
  // const [signUp, { isError }] = useSignUpMutation();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    console.log(data);
    push("/");
    sessionStorage.setItem("isLoggedIn", "true");
  };

  return (
    <div className="w-[566px] flex flex-col items-center gap-14 pt-42 pb-3 bg-gray-0 rounded-md">
      <Image
        src="/images/jawelianna-logo.svg"
        alt="Jawelianna logo"
        width={150}
        height={72}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6 w-[442px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" />
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
                <FormControl>
                  <Input {...field} placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="primary" size="primary">
            Login
          </Button>
        </form>

        <div className="flex gap-4">
          <span className="text-xs font-medium">Powered</span>
          <Image
            src="/images/accadia-logo.svg"
            alt="Accadia logo"
            width={78}
            height={18}
          />
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
