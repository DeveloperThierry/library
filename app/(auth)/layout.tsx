import Image from "next/image";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-2">
            <Image src="/icons/logo.svg" alt="logo " height={37} width={37} />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
        src="/images/auth-illustration.png"
        alt="auth illustration"
        width={100}
        height={100}
        className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default layout;
