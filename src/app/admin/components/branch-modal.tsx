"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

import { useBranchModal } from "@/hooks/use-branch-modal";
import { Modal } from "@/components/ui/modal";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const formSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  branchHead: z.string().min(1, "Branch head is required"),
  branchAddress: z.string().min(1, "Branch address is required"),
});

export const BranchModal = () => {
  const branchModal = useBranchModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchName: "",
      branchHead: "",
      branchAddress: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/store`, values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Create New Branch"
      description="Add a new branch to manage all appointments and other informations"
      isOpen={branchModal.isOpen}
      onClose={branchModal.onClose}
    >
      <div>
        <div className="py-2 pb-4">
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="branchName"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of your Branch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branchHead"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Head</FormLabel>
                    <FormControl>
                      <Input placeholder="Head of your Branch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branchAddress"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address of your Branch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={branchModal.onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      Submitting
                      <Loader size={20} className="animate-spin ml-2" />
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
