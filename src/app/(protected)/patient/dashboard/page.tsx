"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CircleGauge,
  Mail,
  Map,
  MapPin,
  PhoneCall,
  Pin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecentSales } from "../components/recent-sales";
import { Overview } from "../components/overview";
import { Calendar as MainCalendar } from "@/components/ui/calendar";

const Dashboard = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  if (user?.role === "staff") {
    router.replace("/staff/dashboard");
  }
  if (!user) {
    router.replace("/auth/sign-in");
  }
  return (
    <div className="flex-1 space-y-4 px-20 pt-6">
      <Card className="shadow-md">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-5">
              <Avatar>
                <AvatarFallback>KL</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <h1 className="font-bold text-2xl">Kyle Andre Lim</h1>
                  <Badge variant="success">New</Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-md">Age: 24</p>
                  <p>•</p>
                  <p className="text-md">Gender: Male</p>
                  <p>•</p>
                  <p className="text-md">Civil Status: Single</p>
                </div>
                <div className="flex items-center space-x-5 mt-2">
                  <div className="flex items-center gap-x-2">
                    <Calendar className="w-4 h-4" />
                    <p className="text-sm">Joined on July 29, 2024</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CircleGauge className="w-4 h-4" />
                    <p className="text-sm">
                      Status: <Badge variant="secondary">In Progress</Badge>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-x-3 border rounded-md px-3 py-1">
                  <PhoneCall className="w-4 h-4" />
                  <p className="text-sm font-semibold">0912 345 6789</p>
                </div>
                <div className="flex items-center gap-x-3 border rounded-md px-3 py-1">
                  <Mail className="w-4 h-4" />
                  <p className="text-sm font-semibold">someone@example.com</p>
                </div>
                <div className="flex items-center gap-x-3 border rounded-md px-3 py-1">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm font-semibold">
                    Sipocot, Camarines Sur
                  </p>
                </div>
              </div>
              <Button className="float-right" variant="primary">
                View Documents &rarr;
              </Button>
              <Button className="float-right mr-3" variant="outline">
                Book Appointment &rarr;
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-start w-full gap-x-5">
        <Card className="w-[80%]">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>
              You made 2 appointments this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
        <Card className="w-[20%]">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <MainCalendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="flex items-center"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
