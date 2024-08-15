"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/ui/images-slider";
import {
  Calendar,
  Headphones,
  Map,
  ShieldCheck,
  Sliders,
  Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const perks = [
  {
    name: "24/7 Support",
    Icon: Headphones,
    description:
      "Our dedicated support team is available around the clock to assist you with any issues or inquiries.",
  },
  {
    name: "Secure Transactions",
    Icon: ShieldCheck,
    description:
      "Your safety is our priority. We use top-notch security measures to protect your personal and payment information.",
  },
  {
    name: "Customizable Options",
    Icon: Sliders,
    description:
      "Tailor our services to fit your needs with our wide range of customizable options.",
  },
  {
    name: "User-Friendly Interface",
    Icon: Smartphone,
    description:
      "Enjoy a seamless experience with our intuitive and easy-to-navigate platform.",
  },
];

const Home = () => {
  const images = [
    "/assets/images/auth-bg.jpg",
    "/assets/images/signin.jpg",
    "/assets/images/onboarding.jpg",
  ];
  return (
    <>
      {/* NAVBAR */}
      <div className="fixed z-10 bg-white top-0 py-3 inset-x-0 w-full">
        <header className="w-full flex items-center justify-between px-40">
          <div className="flex items-center gap-x-10">
            <Link href="/">
              <Image
                src="/assets/images/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
              />
            </Link>
            <div className="flex items-center gap-x-10">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/service">Services</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/vaccines">Vaccines</Link>
              <Link href="/faqs">FAQs</Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="primary">Make Appointment</Button>
            <Button variant="outline">Sign in</Button>
          </div>
        </header>
      </div>
      {/* HERO */}
      <ImagesSlider className="h-screen px-10 md:px-0" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-2xl md:text-6xl text-center text-white py-4">
            Booking Your Appointments
          </motion.p>
          <motion.p className="font-bold text-sm md:px-[500px] px-0 md:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            We provide specialized care and treatment for animal bites, ensuring
            your safety and well-being. Schedule your appointment with our
            expert team today for prompt and professional service.
          </motion.p>
          <Card className="mt-3 md:w-[1020px] w-full">
            <CardContent className="p-3">
              <div className="flex items-center justify-center gap-x-3">
                <div className="flex items-center border px-3 w-full">
                  <Map className="w-4 h-4" />
                  <Input
                    placeholder="Location"
                    className="flex-grow border-0 ring-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex items-center border px-3 w-full">
                  <Calendar className="w-4 h-4" />
                  <Input
                    placeholder="Date"
                    className="flex-grow border-0 ring-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button variant="primary">Search</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </ImagesSlider>
      {/* FEATURED */}
      <section className="p-20">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-amber-800 text-white">
                  {<perk.Icon className="w-1/3 h-1/3" />}
                </div>
              </div>

              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-semibold text-black">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ABOUT */}
      
    </>
  );
};

export default Home;
