import React from "react";
import Link from "next/link";
export default function AdminNav() {
  return (
    <>
      <div className="flex flex-col items-start mr-5 ml-2">
        <Link
          href="/admin/dashboard/portfolio"
          className="flex min-w-16 min-h-8 align-bottom items-center pt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="pl-2 text-blue-500 font-semibold underline underline-offset-4 decoration-indigo-200 decoration-2 hover:decoration-indigo-300 hover:text-blue-700">
            Portfolio
          </p>
        </Link>
        <button className="flex min-w-16 min-h-8 align-bottom items-center pt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Zm0 4.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM10 9a.75.75 0 0 1 .75.75v2.546l.943-1.048a.75.75 0 1 1 1.114 1.004l-2.25 2.5a.75.75 0 0 1-1.114 0l-2.25-2.5a.75.75 0 1 1 1.114-1.004l.943 1.048V9.75A.75.75 0 0 1 10 9Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="pl-2 text-blue-500 font-semibold underline underline-offset-4 decoration-indigo-200 decoration-2 hover:decoration-indigo-300 hover:text-blue-700">
            Sketchbook
          </p>
        </button>
        <button className="flex min-w-16 min-h-8 align-bottom items-center pt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="pl-2 text-blue-500 font-semibold underline underline-offset-4 decoration-indigo-200 decoration-2 hover:decoration-indigo-300 hover:text-blue-700">
            Shop
          </p>
        </button>
      </div>
    </>
  );
}
