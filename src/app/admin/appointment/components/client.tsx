"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { AppointmentColumn, columns } from "./column";
import { Heading } from "@/components/ui/heading";

interface AppointmentClient {
  data: AppointmentColumn[];
}

const AppointmentClient: React.FC<AppointmentClient> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Appointments (${data.length})`}
          description="Check and filter all your appointments here."
        />
        <Button
          onClick={() => router.push(`/appointment/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          New Appointment
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="case" columns={columns} data={data} />
    </>
  );
};

export default AppointmentClient;
