'use client';

import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return (
    <>
      <header>ssss</header>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            form
            <button onClick={() => signIn('github', { callbackUrl })}>
              signIn
            </button>
            <button onClick={() => signIn('google')}>
              google
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
