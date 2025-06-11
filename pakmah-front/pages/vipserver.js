import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { firststep, laststep } from "../services";
import Image from "next/image";
import Loading from "../components/Loading";

export default function useVipserver() {
    const config = useSelector((state) => state.config);
    const [fstep, setfstep] = useState();
    const [fdata, setfdata] = useState();
    const [floading, setfloading] = useState(false);
    const [lloading, setlloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data, e) => {
        e.target.reset();
        setfloading(true);
        firststep({ ...data, amount: ~~data.amount }).then((d) => {
            setfdata({ ...data, amount: ~~data.amount });
            setfstep(d);
            setfloading(false);
        });
    };

    const tax = (amount) => {
        const percent = 42.86;
        const tax = (amount * percent) / 100;
        return round(tax, 0);
    };

    const round = (value, precision) => {
        if (Number.isInteger(precision)) {
            var shift = Math.pow(10, precision);
            return Math.round(value * shift + 0.00000000000001) / shift;
        } else {
            return Math.round(value);
        }
    };

    const taxCalculator = (amount) => {
        let CalRate = amount * Number(config?.rate_robux);
        let CalTax = (CalRate += tax(CalRate));
        if (CalRate && CalTax) {
            return CalTax;
        }
    };

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <div className="grid grid-cols-1 gap-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex flex-col justify-center rounded-md items-center p-8 border-b-4 border font-semibold text-gray-700">
                            <h3 className="text-xl">
                                Rate {Number(config?.rate_robux)}/THB
                            </h3>
                            <h1 className="text-4xl text-blue-500">
                                {config?.current_balance_robux} R$
                            </h1>
                            <h3 className="text-lg">พร้อมจำหน่าย</h3>
                        </div>
                        <div className="flex  rounded-md flex-col justify-center items-center p-6  border-b-4 border font-semibold">
                            {fstep ? (
                                <>
                                    <Image
                                        src={fstep.roblox_avatar}
                                        height="150"
                                        width={150}
                                        className="rounded-full"
                                    />
                                    <a
                                        target={"_blank"}
                                        rel="noreferrer"
                                        href={fstep?.place_url}
                                        className="px-5 py-3 mt-4 w-full rounded-md text-center bg-gray-100 focus:bg-gray-200 transition outline-none font-medium"
                                    >
                                        ตั้งค่าเเมพ
                                    </a>
                                    <button
                                        onClick={() => {
                                            setlloading(true);
                                            laststep(fdata).then(() => {
                                                setlloading(false);
                                            });
                                        }}
                                        type="submit"
                                        className={`py-2 mt-4 w-full  flex justify-center items-center rounded-md bg-blue-500 outline-none font-medium text-white ${
                                            lloading ? "cursor-not-allowed" : ""
                                        } `}
                                        disabled={lloading ? true : false}
                                    >
                                        {lloading ? <Loading /> : "ยืนยัน"}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl text-gray-500">
                                        คุณจะได้รับ{" "}
                                        {watch("amount") *
                                            Number(config?.rate_robux)}{" "}
                                        R$
                                    </h2>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="w-full "
                                    >
                                        <input
                                            type="text"
                                            placeholder="ชื่อในเกมส์"
                                            className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                                            name="username"
                                            {...register("username", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "โปรดกรอกชื่อในเกมส์",
                                                },
                                            })}
                                        />
                                        <p className="ml-1 mt-1 font-medium text-xs text-blue-400">
                                            {errors.username &&
                                                errors.username.message}
                                        </p>
                                        <input
                                            type="number"
                                            placeholder="จำนวนเงิน"
                                            className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 focus:bg-gray-200 transition text-sm outline-none"
                                            name="amount"
                                            {...register("amount", {
                                                required: {
                                                    value: true,
                                                    message: "โปรดกรอกเงิน",
                                                },
                                            })}
                                        />
                                        <p className="ml-1 mt-1 font-medium text-xs text-blue-400">
                                            {errors.amount &&
                                                errors.amount.message}
                                        </p>
                                        <button
                                            type="submit"
                                            className={`py-2 mt-4 w-full  flex justify-center items-center rounded-md bg-blue-500 outline-none font-medium text-white ${
                                                floading
                                                    ? "cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={floading ? true : false}
                                        >
                                            {floading ? <Loading /> : "ยืนยัน"}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-span-2 flex-col flex justify-center items-center p-8 font-semibold   border-b-4 border rounded-md">
                        <h2 className="text-2xl text-gray-700">
                            ขั้นตอนการซื้อ
                        </h2>
                        <h3 className="text-lg text-gray-600">
                            วิธีและการดำเนินการรูปแบบ Configure game
                        </h3>
                        <div className="text-left text-sm space-y-2 mt-4 text-gray-500">
                            <p>
                                1. กรุณากรอก Roblox Username และ กรอกจำนวน Robux
                                ที่ต้องการซื้อโดยมีค่าบริการ Rate{" "}
                                {Number(config?.rate_robux)}/THB
                            </p>
                            <p>
                                2. กรุณากดเข้า Game Link เพื่อเข้าไปตั้งค่า
                                Configure this Place
                            </p>
                            <p>
                                3. กรุณาตั้งค่า Private Server ของเกม เป็น
                                Public Server
                            </p>
                            <p>
                                4. กรุณาไปที่แถบ &ldquo;Access&ldquo; เลื่อนหา
                                Private servers เปลี่ยนเป็น &ldquo;Paid&ldquo;
                                และกำหนดราคาเป็น{" "}
                                {taxCalculator(watch("amount"))
                                    ? taxCalculator(watch("amount"))
                                    : 0}{" "}
                                Robux เพื่อที่จะได้รับ{" "}
                                {watch("amount") * Number(config?.rate_robux)}{" "}
                                Robux เข้าในระบบ
                            </p>
                            <p>5. ทำการกดสั่งซื้อ</p>
                        </div>
                        <h2 className="mt-2 text-gray-600">
                            **โดย Robux จะเข้าบัญชีภายใน 5-7 วัน**
                        </h2>
                        <h4 className="mt-4 text-gray-600">
                            สามารถตรวจสอบรายการได้ที่นี่
                        </h4>
                        <a
                            href="https://www.roblox.com/transactions"
                            className="text-blue-400"
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            https://www.roblox.com/transactions
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
