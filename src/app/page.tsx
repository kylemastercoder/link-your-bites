"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/ui/images-slider";
import {
  Brush,
  Calendar,
  Headphones,
  Map,
  Router,
  ShieldCheck,
  ShowerHead,
  Sliders,
  Smartphone,
  WashingMachine,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const services = [
  {
    name: "Some Title",
    Icon: Headphones,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laboriosam!",
  },
  {
    name: "Some Title",
    Icon: ShieldCheck,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laboriosam!",
  },
  {
    name: "Some Title",
    Icon: Sliders,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laboriosam!",
  },
  {
    name: "Some Title",
    Icon: Smartphone,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laboriosam!",
  },
  {
    name: "Some Title",
    Icon: ShowerHead,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laboriosam!",
  },
  {
    name: "Some Title",
    Icon: Brush,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laboriosam!",
  },
];

const Home = () => {
  const images = [
    "/assets/images/auth-bg.jpg",
    "/assets/images/signin.jpg",
    "/assets/images/onboarding.jpg",
  ];
  const router = useRouter();
  return (
    <>
      {/* NAVBAR */}
      <div className="fixed z-10 bg-white top-0 py-3 inset-x-0 w-full">
        <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-40">
          <div className="flex items-center gap-x-5">
            <Link href="/">
              <Image
                src="/assets/images/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
              />
            </Link>
            <div className="flex items-center gap-x-5">
              <Link href="#home">Home</Link>
              <Link href="#about">About</Link>
              <Link href="#services">Services</Link>
              <Link href="#contact">Contact Us</Link>
              <Link href="#faqs">FAQs</Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="primary">Make Appointment</Button>
            <Button onClick={() => router.push('/auth/onboarding')} variant="outline">Sign in</Button>
          </div>
        </header>
      </div>
      {/* HERO */}
      <ImagesSlider
        id="home"
        className="h-screen px-10 md:px-0"
        images={images}
      >
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
      <section className="p-20 max-w-7xl mx-auto border-b">
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
      <section id="about" className="p-20 max-w-7xl mx-auto mt-20">
        <div className="flex flex-col md:flex-row bg-white rounded-lg">
          <div className="flex-1">
            <p className="text-4xl font-bold text-zinc-800 mb-2">About Us</p>
            <p className="text-zinc-600 mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
              quisquam consequuntur asperiores alias perspiciatis beatae ratione
              non repellendus qui libero molestiae magni atque nam tempora at
              neque ducimus ad eum maxime repudiandae laboriosam, cumque quaerat
              laudantium veniam. Maiores possimus minima, hic provident
              distinctio quis corrupti asperiores tempore consequuntur totam
              aliquam!
            </p>
            <p className="text-zinc-600 mt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
              molestiae excepturi dolores eveniet impedit praesentium, minus
              illum deleniti qui quaerat.
            </p>
            <Button className="mt-4 inline-block" variant="primary">
              Read More
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <Image
                src="/assets/images/auth-bg.jpg"
                alt="Doctor with patient"
                className="rounded-lg shadow-md object-cover"
                width={200}
                height={300}
              />
              <Image
                src="/assets/images/signin.jpg"
                width={150}
                height={150}
                alt="Medicine"
                className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section id="services" className="p-20 max-w-7xl mx-auto mt-10 border-t">
        <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-center text-muted-foreground mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
          laboriosam!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="bg-card p-6 rounded-lg shadow-md">
              {<service.Icon className="w-7 h-7" />}
              <h3 className="text-lg font-semibold mt-4">{service.name}</h3>
              <p className="text-muted-foreground mb-2">
                {service.description}
              </p>
              <Link href="#" className="text-primary hover:underline">
                Read More &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* CONTACT US */}
      <section id="contact" className="p-20 max-w-7xl bg-background mx-auto">
        <h2 className="text-4xl font-bold text-center">Contact Us</h2>
        <p className="text-muted-foreground text-center mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, eum!
          Aspernatur
        </p>
        <div className="flex flex-col md:flex-row w-full gap-x-20">
          <div className="space-y-4">
            <div className="flex items-center gap-x-5">
              <div className="">
                <h3 className="text-lg font-semibold text-primary">
                  Branch Name
                </h3>
                <p className="text-muted-foreground">Branch Address</p>
                <iframe
                  className="mt-2"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123987.45684547404!2d122.86903025233215!3d13.80248708362265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a21b8e284fee85%3A0x6977ab12e020ed9d!2sSipocot%2C%20Camarines%20Sur!5e0!3m2!1sen!2sph!4v1723771321973!5m2!1sen!2sph"
                  width="400"
                  height="400"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <form className="space-y-4 w-full">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                className="mt-1 block w-full border border-border rounded-md shadow-sm p-2"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                className="mt-1 block w-full border border-border rounded-md shadow-sm p-2"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                type="text"
                className="mt-1 block w-full border border-border rounded-md shadow-sm p-2"
                placeholder="Enter subject"
                required
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                className="mt-1 block w-full border border-border rounded-md shadow-sm p-2"
                placeholder="Enter your message"
                required
              />
            </div>
            <Button variant="primary">Send Message</Button>
          </form>
        </div>
      </section>
      {/* FAQs */}
      <section id="faq" className="p-20 max-w-7xl bg-background mx-auto">
        <h2 className="text-4xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, eum!
          Aspernatur
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Question 3?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Question 4?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      {/* FOOTER */}
      <div className="w-full py-10 border-t">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between px-40">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold flex items-center">
              <Image
                src="/assets/images/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
              />
            </h2>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold">Other Links</h3>
            <ul className="list-none">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold">Branches</h3>
            <ul className="list-none">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Branch Name 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Branch Name 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Branch Name 3
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold">Contact us</h3>
            <p className="text-muted-foreground">contact@example.com</p>
            <p className="text-muted-foreground">09123456789</p>
            <a href="#" className="text-muted-foreground hover:text-primary">
              View on Google map
            </a>
          </div>
        </div>
        <div className="text-center mt-10 text-muted-foreground">
          <p>2024 © Santiago Animal Bite Center. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
