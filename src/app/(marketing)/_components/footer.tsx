import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/png/bunny.png"
            alt="bunny"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/png/doggy.png"
            alt="doggy"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/png/dinny.png"
            alt="dinny"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/png/puppy.png"
            alt="puppy"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/png/bunny.png"
            alt="bunny"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
        </Button>
      </div>
    </footer>
  );
};
