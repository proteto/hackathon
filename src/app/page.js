import { Button } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full h-full flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex flex-row justify-center items-center my-auto gap-4">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/muslim.png"
            alt="logo"
            width={100}
            height={100}
            className="w-44 h-44 select-none pointer-events-none"
          />
        </div>
        <div className="h-fit flex flex-col justify-between gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold py-1 uppercase">What is Alim ?</h1>
            <p className="text-md font-normal ">This is guide for new muslims</p>
          </div>
          <Button variant="contained" color="success" size="large" className="rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
