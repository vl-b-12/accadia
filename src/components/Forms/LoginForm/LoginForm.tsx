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
import { useSignUpMutation } from "@/store/services/loginApi";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/slices/CartSlice/cartSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [signUp, { isLoading, isError }] = useSignUpMutation();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    const response = await signUp(data).unwrap();

    if (response.accessToken && response.refreshToken) {
      sessionStorage.setItem("access_token", response.accessToken);
      sessionStorage.setItem("refresh_token", response.refreshToken);
      dispatch(clearCart());
      push("/catalog");
    }
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
                  <Input
                    {...field}
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              size="primary"
              disabled={isLoading}
            >
              Login
            </Button>
            {isError && (
              <div className="self-center text-red-600">
                Wrong email or password
              </div>
            )}
          </div>
        </form>

        <div className="flex gap-4">
          <span className="text-xs font-medium">Powered by</span>
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
