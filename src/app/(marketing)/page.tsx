"use client"; // Add this at the top

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  SignedIn,
  SignUpButton,
  SignInButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
const randomMovement = {
  y: [0, -80, 100, -30, 120, -60], // More random vertical movement
  x: [0, 50, -60, 100, -40, 0], // More random horizontal movement
  rotate: [0, 15, -15, 25, -40, 0], // Random rotation for dynamic effect
  transition: {
    duration: 15,
    repeat: Infinity,
    repeatType: "reverse" as "reverse", // Makes movement feel bouncy
    ease: "easeInOut",
  },
};

const wideSwing = {
  y: [100, -30, 120, -10], // Increased range for vertical motion
  x: [0, 80, -90, 120, -80, 0], // Wider horizontal swing
  rotate: [0, 25, -30, 40, -45, 0], // More dramatic rotation
  transition: {
    duration: 15,
    repeat: Infinity,
    repeatType: "reverse" as "reverse",
    ease: "easeInOut",
  },
};

const slowDrift = {
  y: [-15, 70, -30], // Increased variation in vertical drift
  x: [0, 30, -35, 45], // More varied horizontal drift
  rotate: [0, 10, -10, 20, -15, 0], // Subtle rotation for drift effect
  transition: {
    duration: 12,
    repeat: Infinity,
    repeatType: "reverse" as "reverse",
    ease: "easeInOut",
  },
};

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 -mt-20">
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="max-w-[480px] text-center text-2xl font-bold text-white lg:text-2xl z-[999]">
            Welcome To
          </h1>
          <Image
            src="/png/MemoReplay 3x.png"
            alt="MemoReplay"
            width={250}
            height={250}
            className="mt-2 mb-2 z-[999]"
          />
        </div>
        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full bg-[#9FD474] hover:bg-[#8bc262]"
                >
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button
                  size="lg"
                  variant="primaryOutline"
                  className="w-full z-[999]"
                >
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <img
              className="z-[999]"
              src="/Timeline 1.gif"
              alt="Loading animation"
            />
            <motion.img
              src="/Polygon 58.svg"
              alt="Shapes"
              className="hidden sm:flex w-32 h-auto object-contain absolute z-[-1]"
              animate={randomMovement}
              style={{
                top: "10%", // Positioned 10% from the top
                left: "10%", // Positioned 10% from the left
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Top-right corner (Mobile version) */}
            <motion.img
              src="/Rectangle 1729.svg"
              alt="Shapes"
              className="w-32 h-auto object-contain absolute z-[1] sm:hidden"
              animate={wideSwing}
              style={{
                top: "10%", // Positioned 10% from the top for mobile
                right: "10%", // Positioned 10% from the right for mobile
                transform: "translate(50%, -50%)", // Adjust position and center it
              }}
            />

            {/* Bottom-left corner (Mobile version) */}
            <motion.img
              src="/Rectangle 1729.svg"
              alt="Shapes"
              className="w-32 h-auto object-contain absolute z-[1] sm:hidden"
              animate={slowDrift}
              style={{
                bottom: "10%", // Positioned 10% from the bottom for mobile
                left: "10%", // Positioned 10% from the left for mobile
                transform: "translate(-50%, 50%)", // Adjust position and center it
              }}
            />

            {/* Bottom-right corner (Mobile version) */}
            <motion.img
              src="/Star 2.svg"
              alt="Shapes"
              className="w-32 h-auto object-contain absolute z-[1] sm:hidden"
              animate={randomMovement}
              style={{
                bottom: "10%", // Positioned 10% from the bottom for mobile
                right: "10%", // Positioned 10% from the right for mobile
                transform: "translate(50%, 50%)", // Adjust position and center it
              }}
            />

            {/* Center (Mobile version) */}
            <motion.img
              src="/Ellipse 1063.svg"
              alt="Shapes"
              className="w-32 h-auto object-contain absolute z-[1] sm:hidden"
              animate={wideSwing}
              style={{
                top: "40%", // Positioned at the center vertically for mobile
                left: "50%", // Positioned at the center horizontally for mobile
                transform: "translate(-50%, -50%)", // Center the element
              }}
            />

            {/* Desktop-specific version */}
            <motion.img
              src="/Rectangle 1729.svg"
              alt="Shapes"
              className="hidden sm:flex w-32 h-auto object-contain absolute z-[1]"
              animate={wideSwing}
              style={{
                top: "20%", // Positioned 10% from the top on desktop
                right: "30%", // Positioned 10% from the right on desktop
                transform: "translate(50%, -50%)", // Center it on desktop
              }}
            />

            <motion.img
              src="/Rectangle 1729.svg"
              alt="Shapes"
              className="hidden sm:flex w-32 h-auto object-contain absolute z-[1]"
              animate={slowDrift}
              style={{
                bottom: "10%", // Positioned 10% from the bottom on desktop
                left: "10%", // Positioned 10% from the left on desktop
                transform: "translate(-50%, 50%)", // Center it on desktop
              }}
            />

            <motion.img
              src="/Star 2.svg"
              alt="Shapes"
              className="hidden sm:flex w-32 h-auto object-contain absolute z-[1]"
              animate={randomMovement}
              style={{
                bottom: "10%", // Positioned 10% from the bottom on desktop
                right: "10%", // Positioned 10% from the right on desktop
                transform: "translate(50%, 50%)", // Center it on desktop
              }}
            />

            <motion.img
              src="/Ellipse 1063.svg"
              alt="Shapes"
              className="hidden sm:flex w-32 h-auto object-contain absolute z-[1]"
              animate={wideSwing}
              style={{
                top: "40%", // Positioned at the center vertically on desktop
                left: "70%", // Positioned at the center horizontally on desktop
                transform: "translate(-50%, -50%)", // Center it on desktop
              }}
            />

            <SignedIn>
              <Button
                size="lg"
                variant="secondary"
                className="w-10% z-[9999] top-[20px]" // High z-index and moved slightly higher
                asChild
              >
                <Link href="/learn">Continue Exploring</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
      <div className="absolute bottom-[-100px] lg:bottom-[-100px] h-[424px] w-[424px] lg:h-[424px] lg:w-[424px] sm:h-[300px] sm:w-[300px] z-[9]">
        <Image
          src="/png/mascot-spark.png"
          alt="Hero"
          loading="eager"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
}
