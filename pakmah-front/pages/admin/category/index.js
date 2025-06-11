import Link from "next/link";
import { fetchCategories } from "../../../services";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React from "react";

export default function useIndex() {
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        fetchCategories().then((categories) => setCategories(categories));
    }, []);

    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                จัดการหมวดหมู่สินค้า
            </h3>
            <Link href={"category/create"}>
                <a className="px-4 py-3 rounded-xl text-blue-600 bg-blue-200 bg-opacity-50">
                    เพิ่มหมวดหมู่สินค้า
                </a>
            </Link>
            {categories.length > 0 ? (
                <table className="w-full mt-4 text-gray-700 text-center">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>หมวดหมู่</th>
                            <th>เมื่อ</th>
                            <th>เเอคชั่น</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c, i) => (
                            <tr className="border-b" key={i}>
                                <td className="p-4">{i + 1}</td>
                                <td className="p-4">{c.name}</td>
                                <td className="p-4">
                                    {JSON.stringify(c.createdAt).slice(1, 11)}
                                </td>
                                <td className="p-4">
                                    <Link href={`category/${c._id}`} passHref>
                                        <button className="bg-blue-500 p-2 rounded-lg font-semibold text-white">
                                            เเก้ใขหมวดหมู่สินค้า
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
