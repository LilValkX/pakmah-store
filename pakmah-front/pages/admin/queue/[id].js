import { useEffect, useState } from "react";
import { updateQueue, fetchQueue } from "../../../services";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import { sendwebhook } from "../../../services/webhook";

export default function useSingleQueue() {
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [queue, setQueue] = useState({});
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (id) {
      fetchQueue(id).then((queue) => setQueue(queue));
      updateQueue(id, { status: "กำลังทำรายการ" });
    }
  }, [id]);

  if (auth.member?.roles != "admin")
    typeof window !== "undefined" && router.push("/");

  return (
    <div className="container mt-5 mx-auto px-5 max-w-3xl">
      <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
        ชื่อสินค้า {queue.product_id != undefined && queue.product_id.name} ราคา{" "}
        {queue.product_id != undefined && queue.product_id.price}
      </h3>
      <div className="grid grid-cols-4 text-center gap-6 mt-4 text-gray-700">
        <div className="col-span-2 border-b-2 border-dashed">{queue.name}</div>
        <div className="col-span-2 border-b-2 border-dashed">
          {queue.password}
        </div>
        <div className="col-span-4 border-b-2 border-dashed">
          <p className="text-left">ฝากถึงลูกค้า (ไม่จำเป็น)</p>
          <input
            className="w-full outline-none p-2"
            type="text"
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
        <button
          className="bg-red-500 p-2 text-white rounded-lg"
          onClick={() => {
            updateQueue(id, {
              status: "ทำรายการไม่สำเร็จ",
              message,
              product_price:
                queue.product_id != undefined && queue.product_id.price,
              member_id: queue.member_id != undefined && queue.member_id._id,
            });

            router.back();
          }}
        >
          ไม่สำเร็จคืนเงิน
        </button>
        <button
          className="bg-yellow-500 p-2 text-white rounded-lg"
          onClick={() => {
            updateQueue(id, {
              status: "ทำรายการไม่สำเร็จ",
              message: `${message} ติด 2fa น้า`,
              product_price:
                queue.product_id != undefined && queue.product_id.price,
              member_id: queue.member_id != undefined && queue.member_id._id,
            });
            router.back();
          }}
        >
          ติด 2fa
        </button>
        <button
          className="bg-blue-500 p-2 text-white rounded-lg col-span-2"
          onClick={() => {
            updateQueue(id, {
              status: "สำเร็จ",
              message,
            });
            // sendwebhook(`ออเดอร์ #${queue?._id} สำเร็จ`);
            router.back();
          }}
        >
          สำเร็จ
        </button>
      </div>
    </div>
  );
}
