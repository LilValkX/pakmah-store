import Link from "next/link";
import { fetchProducts } from "../../../services";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React from "react";

export default function useIndex() {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        fetchProducts().then((products) => setProducts(products));
    }, []);

    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                จัดการสินค้า
            </h3>
            <Link href={"product/create"}>
                <a className="px-4 py-3 rounded-xl text-blue-600 bg-blue-200 bg-opacity-50">
                    เพิ่มสินค้า
                </a>
            </Link>
            {products.length > 0 ? (
                <table className="w-full mt-4 text-gray-700 text-center">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อสินค้า</th>
                            <th>หมวดหมู่</th>
                            <th>รายระเอียด</th>
                            <th>ประเภท</th>
                            <th>ราคา</th>
                            <th>เมื่อ</th>
                            <th>เเอคชั่น</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr className="border-b" key={i}>
                                <td className="p-4">{i + 1}</td>
                                <td className="p-4">{p.name}</td>
                                <td className="p-4">{p.category?.name}</td>
                                <td className="p-4">{p.description}</td>
                                <td className="p-4">{p.type}</td>
                                <td className="p-4">{p.price} บาท</td>
                                <td className="p-4">
                                    {JSON.stringify(p.createdAt).slice(1, 11)}
                                </td>
                                <td className="p-4">
                                    <Link href={`product/${p._id}`} passHref>
                                        <button className="bg-blue-500 p-2 rounded-lg font-semibold text-white">
                                            เเก้ใขสินค้า
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-4">ไม่มีประวัติ</p>
            )}
        </div>
    );
}
