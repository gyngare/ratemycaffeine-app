import { Button } from "@/components/ui/button";

export default function Login() {
  const signin = () => {
    console.log("test");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="flex-1 p-10 flex flex-col justify-center">
        <div className="shadow-lg max-w-[500px] ml-20 p-8 bg-[#2c2c2c] rounded-lg">
          <div className="text-xl font-medium">
            Hi, Welcome to ratemycaffeine.com!
          </div>
          <div className="mt-4">
            <Button className="bg-white text-black hover:bg-gray-200 hover:cursor-pointer">
              <img src="/assets/google.svg" alt="" />
              Sign up with Google
            </Button>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 p-4">
        <img
          src="/assets/login-bg.png"
          alt=""
          className="h-full w-full object-cover shadow-lg rounded-xl"
        />
      </div>
    </div>
  );
}
