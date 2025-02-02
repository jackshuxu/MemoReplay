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

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 -mt-20">
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="max-w-[480px] text-center text-2xl font-bold text-white lg:text-2xl">
            Welcome To
          </h1>
          <Image
            src="/png/MemoReplay 3x.png"
            alt="MemoReplay"
            width={250}
            height={250}
            className="mt-2 mb-2"
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
                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">Continue Exploring</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
      <div className="absolute bottom-[-100px] h-[424px] w-[424px] lg:h-[424px] lg:w-[424px]">
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
