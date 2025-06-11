import Link from "next/link";
import Image from "next/image";
import { buyProduct } from "../services";
import { useSelector } from "react-redux";
import { fetchProductQuantity } from "../services";
import { useState } from "react";

export default function ProductCard({
  id,
  name,
  detail,
  price,
  image,
  to,
  type,
}) {
  const [quantity, setQuantity] = useState(0);
  const member = useSelector((state) => state.auth.member);
  fetchProductQuantity(id).then((quantity) => setQuantity(quantity));
  if (type == "ไม่อัตโนมัติ") {
    return (
      <div className="p-0 bg-gray-100 rounded-lg flex items-center justify-center flex-col text-gray-800  transition-all duration-400 pt-2 m-1">
        <div className="p-2">
          <Image
            src={image}
            className=" rounded-tl-lg rounded-tr-lg w-full"
            width="600"
            height="300"
            alt="bababa"
            objectFit={"contain"}
          />
          <h3 className="text-md font-semibold pt-2 text-center">{name}</h3>
          <p className="text-xs text-center">{detail}</p>
        </div>

        <Link href={member._id ? to : ""} passHref>
          <div
            className={`bg-blue-500 w-full rounded-bl-lg rounded-br-lg p-1 mt-2 ${member._id ? " cursor-pointer" : "cursor-not-allowed"
              }`}
          >
            <p className="text-center text-white font-bold text-lg">
              {member._id ? price + " บาท" : "กรูณาเข้าสู่ระบบ"}
            </p>
          </div>
        </Link>
      </div>
    );
  }
  if (type === "อัตโนมัติ")
    return (
      <div className="p-0 bg-gray-100 rounded-lg flex items-center justify-center flex-col text-gray-800  transition-all duration-400 pt-2  ">
        <div className="p-2">
          <Image
            src={image}
            className=" rounded-tl-lg rounded-tr-lg w-full"
            width="600"
            height="300"
            alt="bababa"
            objectFit={"contain"}
          />
          <h3 className="text-md text-center font-semibold pt-2">{name}</h3>
          <p className="text-xs text-center">
            {detail} เหลือ {quantity} ชิ้น
          </p>
        </div>

        <div
          className={`bg-blue-500 w-full rounded-bl-lg rounded-br-lg p-1 mt-2 ${member._id ? " cursor-pointer" : "cursor-not-allowed"
            }`}
          onClick={() => {
            member._id &&
              confirm("จะซื้ออ่อ") &&
              buyProduct({ product_id: id });
          }}
        >
          <p className="text-center text-white font-bold text-lg">
            {member._id ? price + " บาท" : "กรูณาเข้าสู่ระบบ"}
          </p>
        </div>
      </div>
    );
}
