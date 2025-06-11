import React from "react";
import { useForm } from "react-hook-form";
import { updateconfigure } from "../../services";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useConfig() {
    const router = useRouter();

    const { register, handleSubmit } = useForm();
    const auth = useSelector((state) => state.auth);
    const onSubmit = (d) => {
        const data = clean(d);
        updateconfigure({
            ...data,
            banner_website: data.banner_website?.split(","),
        });
    };

    const clean = (obj) => {
        for (const p in obj) {
            if (obj[p] === null || obj[p] === "") {
                delete obj[p];
            }
        }
        return obj;
    };

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h3 className="text-xl font-medium text-gray-900 text-center">
                ตั้งค่าเว็บไซค์
            </h3>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-col-1 md:grid-cols-2 gap-2 mt-3"
            >
                <input
                    placeholder="ไตเติ้ลเว็บ"
                    className="px-5 py-3 mt-1 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                    name="title_website"
                    {...register("title_website")}
                    // defaultValue={config.title_website}
                />
                <input
                    placeholder="คีย์เวิดเว็บ"
                    className="px-5 py-3 mt-1 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                    name="keyword_website"
                    {...register("keyword_website")}
                    // defaultValue={config.keyword_website}
                />
                <input
                    placeholder="รายละเอียดเว็บ"
                    className="px-5 py-3 mt-1 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                    name="description_website"
                    {...register("description_website")}
                    // defaultValue={config.description_website}
                />
                <input
                    placeholder="โล้โก้เว็บ"
                    className="px-5 py-3 mt-1 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                    name="logo_website"
                    {...register("logo_website")}
                    // defaultValue={config.logo_website}
                />

                <input
                    placeholder="เรทโรบัค"
                    type="number"
                    className="px-5 py-3 mt-1 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                    {...register("rate_robux")}
                    name="rate_robux"
                    // defaultValue={config.rate_robux}
                />
                <input
                    placeholder="เบอร์คนรับตัง"
                    className="px-5 py-3 mt-1 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                    {...register("phone_wallet")}
                    name="phone_wallet"
                    // defaultValue={config.phone_wallet}
                />

                <input
                    placeholder="เเบนเนอร์เว็บ (คั้นด้วย , )"
                    className="px-5 py-3 mt-1 col-span-2 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition  text-sm outline-none"
                    {...register("banner_website")}
                    name="banner_website"
                    // defaultValue={config.banner_website}
                />
                <button
                    type="submit"
                    className="py-2 col-span-2 rounded-md bg-blue-500 text-white outline-none font-medium"
                >
                    ยืนยัน
                </button>
            </form>
        </div>
    );
}
