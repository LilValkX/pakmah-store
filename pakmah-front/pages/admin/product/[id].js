import {
    fetchCategories,
    fetchProduct,
    updateProduct,
    createStock,
    deleteProduct,
} from "../../../services";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useSingleProduct() {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState();
    const router = useRouter();
    const auth = useSelector((state) => state.auth);
    const id = router.query.id;
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetchCategories().then((categories) => setCategories(categories));
        if (id) fetchProduct(id).then((product) => setProduct(product));
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
        if (d?.stock) {
            const toycode = d.stock.split(/\r\n|\r|\n/);
            let toycodes = []
            for (let i = 0; i < toycode.length; i++) {
                toycodes.push({ toycode: toycode[i], product_id: product?._id })
            }
            createStock({ toycodes: toycodes });
        }
        delete data.stock;
        updateProduct(product?._id, data);
        router.push("/product");
    };

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container max-w-2xl w-full py-8 px-5 mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800">
                อัพเดทสินค้าไอดี #{product?._id}
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

                <input
                    type="text"
                    placeholder="รายละเอียด"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="description"
                    {...register("description")}
                />

                <input
                    type="text"
                    placeholder="รูปภาพ"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="image"
                    {...register("image")}
                />

                <input
                    type="number"
                    placeholder="ราคา"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="price"
                    {...register("price")}
                />

                {product?.type === "อัตโนมัติ" && (
                    <textarea
                        name="stock"
                        className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                        placeholder="เพิ่มสต็อก (ไม่จำเป็น)"
                        {...register("stock")}
                    ></textarea>
                )}

                <div className="grid grid-cols-4 gap-4 mt-4 text-gray-700 w-full">
                    <div className="col-span-2">
                        <label className="text-sm">หมวดหมู่สินค้า</label>
                        <select
                            className="appearance-none w-full p-2"
                            {...register("category")}
                        >
                            <option
                                selected
                                disabled
                                hidden
                                value={product?.category?._id}
                            >
                                {product?.category?.name}
                            </option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">ประเภทสินค้า</label>
                        <select
                            className="appearance-none w-full p-2"
                            {...register("type")}
                        >
                            <option selected disabled hidden>
                                {product?.type}
                            </option>
                            <option>อัตโนมัติ</option>
                            <option>ไม่อัตโนมัติ</option>
                        </select>
                    </div>
                </div>

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
                        (deleteProduct(product?._id), router.push("/product"));
                }}
                className="py-2 mt-4 w-full rounded-md bg-red-500 text-white outline-none font-medium"
            >
                ลบสินค้าชิ้นนี้
            </button>
        </div>
    );
}
