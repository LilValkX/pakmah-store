import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchQueuesnyCondition } from "../../../services";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useIndex() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    fetchQueuesnyCondition({
      condition: {
        $or: [{ status: "รอทำรายการ" }, { status: "กำลังทำรายการ" }],
      },
    }).then((queue) => setQueue(queue));
  }, []);

  if (auth.member?.roles != "admin")
    typeof window !== "undefined" && router.push("/");

  return (
    <div className="container mt-5 mx-auto px-5 max-w-5xl">
      <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
        จัดการคิวโรบัค
      </h3>
      {queue?.length != 0 ? (
        <table className="w-full mt-4 text-gray-700 text-center">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อผู้สั่ง</th>
              <th>ชื่อสินค้า</th>
              <th>ราคา</th>
              <th>สถานะสินค้า</th>
              <th>เมื่อ</th>
              <th>ทำรายการ</th>
            </tr>
          </thead>
          {queue?.map((q, i) => (
            <tbody key={i}>
              <tr className="border-b p-4">
                <td className="p-4">{i + 1}</td>
                <td className="p-4">{q?.member_id?.name}</td>
                <td className="p-4">{q?.product_id?.name}</td>
                <td className="p-4">{q?.product_id?.price} บาท</td>
                <td className="p-4">{q?.status}</td>
                <td className="p-4">
                  {JSON.stringify(q?.createdAt).slice(1, 11)}
                </td>
                <td>
                  <Link href={`queue/${q?._id}`} passHref>
                    <button className="bg-blue-500 p-2 rounded-lg font-semibold text-white">
                      ทำรายการนี้
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <p className="text-center mt-4">ไม่มีคิว</p>
      )}
    </div>
  );
}
