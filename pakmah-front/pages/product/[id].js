import { fetchProduct, createQueue } from "../../services";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendwebhook } from "../../services/webhook";

export default function Product() {
  const [product, setProduct] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (id) fetchProduct(id).then((product) => setProduct(product));
  }, [id]);

  const onSubmit = async (d, e) => {
    e.target.reset();
    createQueue({ ...d, product_id: id });
    sendwebhook(
      `มีออเดอร์สินค้าไอดี ${product?.name} ราคา ${product?.price} บาท เข้า`
    );
  };

  return (
    <div className="container mt-5 mx-auto px-5 max-w-5xl">
      <div className="rounded-xl p-4">
        {product ? (
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-2 md:mb-0 md:mr-4 mb-4">
              <Image
                src={product.image}
                layout="responsive"
                width="700"
                height="200"
                objectFit="cover"
                className="rounded-2xl"
                alt="product image"
              />
              <div className="flex justify-start items-start py-2 font-semibold text-gray-800">
                {product.price} บาท
              </div>
              <article>
                <b>รายละเอียด : </b>
                <p>
                  {product.description},
                  <br />
                  📣 Term of Use เงื่อนไขการให้บริการในการซื้อสินค้า 📣
                  <p>
                    1. หลังจากกดสั่งซื้ออาจจะใช้เวลาดำเนินการในการซื้อ 10นาที
                    ถึง 24 ชั่วโมงจึงจะได้รับสินค้า
                  </p>
                  <p>2. การเติมแบบ ID+PASS ต้องรอทำรายการ</p>
                  <p>3. สามารถเข้ารหัสและเล่นเกมได้ระหว่างรอดำเนินการ</p>
                  <p>
                    4. ทางร้านมีประกันให้ 24 ชม หลังทำรายการเสร็จสิ้น
                    หากรหัสโดนแบนหลังประกันหมดทางร้านจะไม่รับผิดชอบ เหตุผลเพราะ
                    หากเติมเกมจากเว็บนอกที่ไม่ใช่โดยตรงจาก Roblox
                    โปรดยอมรับความเสี่ยงของท่านหาก ID โดนลบบัญชีหรือโดนแบน
                  </p>
                  <p>
                    5. หลังจากได้รับ ROBUX แล้วควรเปลี่ยน &quot;รหัสผ่าน&quot;
                    Roblox ใหม่ทุกครั้ง เพื่อความปลอดภัยของลูกค้าเอง
                    และเพื่อความสบายใจของทางร้านและลูกค้า
                  </p>
                </p>
                <b>ราคา : </b>
                <p>{product.price} บาท</p>
              </article>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border rounded-lg p-4 max-h-60"
            >
              <p className="text-center">โปรดกรอกข้อมูลในเกมส์</p>
              <input
                type="text"
                placeholder="ชื่อ"
                className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                {...register("name", {
                  required: {
                    value: true,
                    message: "โปรดกรอกยูสเซอร์เนม",
                  },
                })}
              />
              <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                {errors.name && errors.name.message}
              </a>
              <input
                type="password"
                placeholder="รหัสผ่าน"
                className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                name="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "โปรดกรอกรหัสผ่าน",
                  },
                })}
              />
              <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                {errors.password && errors.password.message}
              </a>
              <button
                type="submit"
                className="py-2 mt-4 w-full rounded-md bg-blue-500 text-white outline-none font-medium"
              >
                ยืนยัน
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center">ไม่มีพบสินค้าชิ้นนี้</p>
        )}
      </div>
    </div>
  );
}
