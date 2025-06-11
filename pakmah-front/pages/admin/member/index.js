import Link from "next/link";
import { fetchMembers } from "../../../services";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React from "react";

export default function useIndex() {
    const [members, setMembers] = React.useState([]);

    React.useEffect(() => {
        fetchMembers().then((members) => setMembers(members));
    }, []);

    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                จัดการเเมมเบอร์
            </h3>
            {members?.length > 0 ? (
                <table className="w-full mt-4 text-gray-700 text-center">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ</th>
                            <th>จำนวนพอย์</th>
                            <th>ยศ</th>
                            <th>เมื่อ</th>
                            <th>เเอคชั่น</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members?.map((p, i) => (
                            <tr className="border-b" key={i}>
                                <td className="p-4">{i + 1}</td>
                                <td className="p-4">{p?.name}</td>
                                <td className="p-4">{p?.point} บาท</td>
                                <td className="p-4">{p?.roles}</td>
                                <td className="p-4">
                                    {JSON.stringify(p.updatedAt).slice(1, 11)}
                                </td>
                                <td className="p-4">
                                    <Link href={`member/${p._id}`} passHref>
                                        <button className="bg-blue-500 p-2 rounded-lg font-semibold text-white">
                                            เเก้ใขเเมมเบอร์
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-4">ไม่มีเเมมเบอร์</p>
            )}
        </div>
    );
}
