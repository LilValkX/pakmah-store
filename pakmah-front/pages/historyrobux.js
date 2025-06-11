import { fetchHistoryRobux } from "../services";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useHistoryrobux() {
    const [history, setHistory] = useState([]);
    const member = useSelector((state) => state.auth.member);
    const router = useRouter();

    useEffect(() => {
        fetchHistoryRobux().then((history) => setHistory(history));
    }, []);

    if (!member?._id) typeof window !== "undefined" && router.replace("/");

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                ประวัติกดโรบัค
            </h3>
            {history?.length > 0 ? (
                <table className="w-full mt-4 text-gray-700 text-center">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อผู้สั่ง</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคา</th>
                            <th>สถานะสินค้า</th>
                            <th>ข้อความฝากมา</th>
                            <th>เมื่อ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history?.map((h, i) => (
                            <tr className="border-b" key={i}>
                                <td className="p-4">{i + 1}</td>
                                <td className="p-4">{h.member_id?.name}</td>
                                <td className="p-4">{h.product_id?.name}</td>
                                <td className="p-4">
                                    {h.product_id?.price} บาท
                                </td>
                                <td className="p-4">{h?.status}</td>
                                <td>
                                    {h.message ? h.message : "ไม่มีข้อความ"}
                                </td>
                                <td className="p-4">
                                    {JSON.stringify(h.createdAt).slice(1, 11)}
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
