import React from "react";
import HeroCard from "./HeroCard";
import { useSelector } from "react-redux";

export default function Hero() {
    const config = useSelector((state) => state.config);
    return (
        <div className="container mx-auto px-5 max-w-5xl">
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <HeroCard
                    mmessage={config.all_member + " คน"}
                    logo={
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    }
                    smessage={"สมาชิกทั้งหมด"}
                />
                <HeroCard
                    mmessage={config.sold_robux + " โรบัค"}
                    logo={
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    }
                    smessage={"โรบัคที่ขายไปเเล้ว"}
                />
                <HeroCard
                    mmessage={config.all_product + " ชิ้น"}
                    logo={
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    }
                    smessage={"สินค้าทั้งหมด"}
                />
                <HeroCard
                    mmessage={"สอนใช้งานเว็บ"}
                    logo={
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    }
                />
            </div>
        </div>
    );
}
