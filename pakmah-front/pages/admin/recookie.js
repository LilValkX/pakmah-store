import React from "react";
import { useForm } from "react-hook-form";
import { updateconfigurevipserver } from "../../services";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useRecookie() {
    const router = useRouter();

    const auth = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (d) => {
        updateconfigurevipserver({ ...d });
    };

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h3 className="text-xl font-medium text-gray-900 text-center">
                รีคุกกี้โรบัค
            </h3>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-col-1 md:grid-cols-2 gap-2 mt-3"
            >
                <input
                    placeholder="คุกกี้โรบ็อค"
                    className="px-5 py-3 mt-1 col-span-2 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition  text-sm outline-none"
                    {...register("cookie_roblox", {
                        required: {
                            value: true,
                            message: "โปรดกรอกคุกกี้โรบ็อค",
                        },
                    })}
                    name="cookie_roblox"
                // defaultValue={config.banner_website}
                />
                <p className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.cookie_roblox && errors.cookie_roblox.message}
                </p>
                <input
                    placeholder="ไอดีโรบ็อค"
                    type={"number"}
                    className="px-5 py-3 mt-1 col-span-2 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition  text-sm outline-none"
                    {...register("id_roblox", {
                        required: {
                            value: true,
                            message: "โปรดกรอกไอดีโรบ็อค",
                        },
                    })}
                    name="id_roblox"
                // defaultValue={config.banner_website}
                />
                <p className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.id_roblox && errors.id_roblox.message}
                </p>
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
