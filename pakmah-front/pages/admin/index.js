import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
    fetchIncomeMoneyforMonth,
    fetchIncomeMoneyTopup,
} from "../../services";
import React from "react";

export default function useIndex() {
    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    const [icomeMonth, setIncomeMonth] = React.useState([]);
    const [icomeTopup, setIncomeTopup] = React.useState([]);

    React.useEffect(() => {
        fetchIncomeMoneyforMonth().then((income) => setIncomeMonth(income));
        fetchIncomeMoneyTopup().then((income) => setIncomeTopup(income));
    }, []);

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    const menus = [
        {
            path: "admin/product",
            name: "จัดการสินค้า",
        },
        {
            path: "admin/category",
            name: "จัดการหมวดหมู่สินค้า",
        },
        {
            path: "admin/member",
            name: "จัดการเเมมเบอร์",
        },
        {
            path: "admin/queue",
            name: "จัดการคิว",
        },
        {
            path: "admin/config",
            name: "ตั้งค่าเว็บไซต์",
        },
        {
            path: "admin/recookie",
            name: "รีคุกกี้โรบัค",
        },
    ];

    return (
        <div className="container mt-5 mx-auto px-5 max-w-2xl">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                จัดการหลังบ้าน
            </h3>
            <div className="flex justify-center items-center w-full mt-2 text-center flex-col">
                {menus.map((m, i) => (
                    <Link href={m.path} key={i}>
                        <a className="px-4 py-3 rounded-xl text-blue-600 bg-blue-200 bg-opacity-50 font-semibold w-full my-2">
                            {m.name}
                        </a>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full p-12 mt-4 shadow rounded-lg border-b-4">
                <h3 className="text-xl">รายได้เติมเงินรวม</h3>
                <p className="text-gray-600 my-2">{icomeTopup} บาท</p>
            </div>
            {icomeMonth?.map((im, i) => (
                <div
                    key={i}
                    className="flex flex-col justify-center items-center w-full h-full p-12 mt-4 shadow rounded-lg border-b-4"
                >
                    <h3 className="text-xl">รายได้รวม (ต่อเดือน)</h3>
                    <p className="text-gray-600 my-2" key={i}>
                        {im.total} บาท
                    </p>
                </div>
            ))}
        </div>
    );
}
