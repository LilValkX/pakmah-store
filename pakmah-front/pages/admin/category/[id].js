import {
    fetchCategory,
    updateCategory,
    deleteCategory,
} from "../../../services";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function useSingleProduct() {
    const [category, setCategory] = useState();
    const router = useRouter();
    const auth = useSelector((state) => state.auth);
    const id = router.query.id;
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (id) fetchCategory(id).then((category) => setCategory(category));
    }, [id]);

    const clean = (obj) => {
        for (const p in obj) {
            if (obj[p] === null || obj[p] === "") {
                delete obj[p];
            }
        }
        return obj;
    };

    const onSubmit = async (d) => {
        const data = clean(d);
        updateCategory(category?._id, data);
        router.push("/product");
    };

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container max-w-2xl w-full py-8 px-5 mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800">
                อัพเดทหมวดหมู่สินค้าไอดี #{category?._id}
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start justify-center"
            >
                <input
                    type="text"
                    placeholder="ชื่อ"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="name"
                    {...register("name")}
                />

                <button
                    type="submit"
                    className="py-2 mt-4 w-full rounded-md bg-blue-500 text-white outline-none font-medium"
                >
                    ยืนยัน
                </button>
            </form>
            <button
                onClick={() => {
                    confirm("เเน่ใจอ่อ") &&
                        (deleteCategory(category?._id),
                        router.push("/product"));
                }}
                className="py-2 mt-4 w-full rounded-md bg-red-500 text-white outline-none font-medium"
            >
                ลบสินค้าชิ้นนี้
            </button>
        </div>
    );
}
