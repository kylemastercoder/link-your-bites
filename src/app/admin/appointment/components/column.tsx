"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type AppointmentColumn = {
  id: string;
  case: string;
  description: string;
  branch: string;
  doctor: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<AppointmentColumn>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={row.original.status === 'Pending' ? 'secondary' : 'default'}>{row.original.status}</Badge>,
  },
  {
    accessorKey: "case",
    header: "Case",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
