import { ArrowBigRight } from 'lucide-react';
import React from 'react';
import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';
import { ArrowBigRightDash } from 'lucide-react';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string;
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    statusCode = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error terjadi';
  }

  return (
    <section
      id="404"
      className="relative bg-slate-950 text-slate-100 w-full h-screen">
      <div className="flex flex-col justify-center items-center space-y-6 w-full h-full">
        <h1 className="font-semibold text-[clamp(3rem,5vw,5rem)] text-4xl text-neutral-100 leading-[110%] tracking-[-4%]">
          404
        </h1>
        <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-neutral-100 leading-[170%] tracking-[-2%] text-center">
          Ooops! Terjadi Kesalahan {errorMessage}
        </p>
        <Link
          to="/"
          className="px-8 py-[0.78125rem] lg:py-4.25 h-15 w-64.5 border text-neutral-10 bg-amber-500 text-slate-950 text-[1.125rem] font-semibold rounded-[2.5rem] text-left cursor-pointer active:translate-y-0 active:scale-95 active:shadow-inner group relative transition-transform duration-300 ease-in-out hover:scale-110">
          <span className=" absolute inset-0 rounded-[2.5rem] bg-brand-50 opacity-0 group-active:animate-ping group-active:opacity-50 transition-all duration-300"></span>
          Kembali ke Beranda
          <span className="w-10 h-10 absolute right-2 top-2 rounded-full bg-neutral-10 flex items-center justify-center">
            <ArrowBigRightDash className="text-neutral-100 group-hover:animate-spin duration-300" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
