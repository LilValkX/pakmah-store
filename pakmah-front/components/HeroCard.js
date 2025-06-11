import React from "react";

export default function HeroCard({ mmessage, smessage, logo, to }) {
    return (
        <a
            href={to}
            className="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6 text-center border-b-4 bg-white flex flex-col justify-center items-center transition
  "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-18 h-16 mb-2 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                {logo}
            </svg>
            <dd className="mt-1 text-2xl font-medium text-black tracking-wide sm:text-3xl">
                {mmessage}
            </dd>{" "}
            <dt className="text-sm font-medium text-gray-500 truncate  tracking-wide">
                {smessage}
            </dt>
        </a>
    );
}
