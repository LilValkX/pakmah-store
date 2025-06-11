import { fetchCategories, createProduct } from "../../../services";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        fetchCategories().then((categories) => setCategories(categories));
    }, []);

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
        createProduct(data);
        router.push("/product");
    };

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container max-w-2xl w-full py-8 px-5 mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800">
                เพิ่มสินค้า
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
                    {...register("name", {
                        required: {
                            value: true,
                            message: "โปรดกรอกชื่อสินค้า",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.name && errors.name.message}
                </a>

                <input
                    type="text"
                    placeholder="รายละเอียด"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="description"
                    {...register("description", {
                        required: {
                            value: true,
                            message: "โปรดกรอกรายละเอียดสินค้า",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.description && errors.description.message}
                </a>

                <input
                    type="text"
                    placeholder="รูปภาพ"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="image"
                    {...register("image", {
                        required: {
                            value: true,
                            message: "โปรดกรอกรูปภาพสินค้า",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.image && errors.image.message}
                </a>

                <input
                    type="number"
                    placeholder="ราคา"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="price"
                    {...register("price", {
                        required: {
                            value: true,
                            message: "โปรดกรอกราคาสินค้า",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.price && errors.price.message}
                </a>

                <div className="grid grid-cols-4 gap-4 mt-4 text-gray-700 w-full">
                    <div className="col-span-2">
                        <label className="text-sm">หมวดหมู่สินค้า</label>
                        <select
                            className="appearance-none w-full p-2"
                            name="category"
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "โปรดกรอกหมวดหมู่สินค้า",
                                },
                            })}
                        >
                            <option selected disabled hidden value={""}>
                                เลือก
                            </option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                            {errors.category && errors.category.message}
                        </a>
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">ประเภทสินค้า</label>
                        <select
                            className="appearance-none w-full p-2"
                            name="type"
                            {...register("type", {
                                required: {
                                    value: true,
                                    message: "โปรดกรอประภทสินค้า",
                                },
                            })}
                        >
                            <option selected disabled hidden value={""}>
                                เลือก
                            </option>
                            <option>อัตโนมัติ</option>
                            <option>ไม่อัตโนมัติ</option>
                        </select>
                        <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                            {errors.type && errors.type.message}
                        </a>
                    </div>
                </div>

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
