"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Separator } from "@/components/ui/separator";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function AddChannel() {
  const formSchema = z.object({
    channel_id: z.string().min(1),
    title: z.string().min(1),
    url: z.string(),
    banner_url: z.string().min(1).optional(),
    logo_url: z.string().min(1).optional(),
    runtime_type: z.string().min(1).optional(),
    opt: z.string().min(1).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mt-6">Youtube 찬양 채널 추가</SheetTitle>
        {/* <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription> */}
      </SheetHeader>
      <Separator />
      <Form {...form}>
        {/* <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-4"
        > */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mx-6 py-4"
        >
          <FormField
            control={form.control}
            name="channel_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="채널 아이디 ..."
                    disabled
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input placeholder="채널 제목 ..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>채널 url</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="채널 url ..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="banner_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>banner_url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="banner_url"
                    disabled
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>logo_url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="logo_url"
                    disabled
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="runtime_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>runtime_type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="runtime_type"
                    disabled
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="opt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>opt</FormLabel>
                <FormControl>
                  <Input placeholder="opt" disabled type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">
            Save Changes
          </Button>
        </form>
      </Form>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
