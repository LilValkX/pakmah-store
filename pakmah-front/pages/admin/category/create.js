import { createCategory } from "../../../services";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function CreateCategory() {
    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const clean = (obj) => {
        for (const p in obj) {
            if (obj[p] === null || obj[p] === "") {
                delete obj[p];
            }
        }
        return obj;
    };

    const onSubmit = async (d, e) => {
        e.target.reset();
        const data = clean(d);
        createCategory(data);
        router.push("/product");
    };

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container max-w-2xl w-full py-8 px-5 mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800">
                เพิ่มหมวดหมู่สินค้า
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start justify-center"
            >
                <input
                    type="text"
                    placeholder="หมวดหมู่ชื่อสินค้า"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="name"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "โปรดกรอกหมวดหมู่ชื่อสินค้า",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.name && errors.name.message}
                </a>

                <button
                    type="submit"
                    className="py-2 mt-4 w-full rounded-md bg-blue-500 text-white outline-none font-medium"
                >
                    ยืนยัน
                </button>
            </form>
        </div>
    );
}
