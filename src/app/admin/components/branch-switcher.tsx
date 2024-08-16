"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBranchModal } from "@/hooks/use-branch-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Branch } from "@prisma/client";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface BranchSwitcherProps extends PopoverTriggerProps {
  items: Branch[];
}

export default function BranchSwitcher({ className, items = [] }: BranchSwitcherProps) {
  const branchModal = useBranchModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentBranch = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onBranchSelect = (branch: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${branch.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a branch"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentBranch?.label || "Select a branch"}
          <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search branch..." />
            <CommandEmpty>No branch found.</CommandEmpty>
            <CommandGroup heading="Branches">
              {formattedItems.map((branch) => (
                <CommandItem
                  key={branch.value}
                  onSelect={() => onBranchSelect(branch)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {branch.label}
                  <Check
                    className={cn(
                      "ml-auto w-4 h-4",
                      currentBranch?.value === branch.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  branchModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 w-5 h-5" />
                Create New Branch
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
