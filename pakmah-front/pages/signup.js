import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../services";

export default function Signup() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const onSubmit = async (d, e) => {
        e.target.reset();
        dispatch(signup(d));
    };
    if (auth.member._id) router.push("/");

    return (
        <div className="container max-w-md w-full py-8 px-5 mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800">
                สมัครสมาชิก
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start justify-center"
            >
                <input
                    type="text"
                    placeholder="ชื่อ"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="name"
                    {...register("name", {
                        required: { value: true, message: "โปรดกรอกชื่อ" },
                        minLength: {
                            value: 4,
                            message: "ชื่อต้องมีตัวอักษรอย่างน้อย 4 ตัวอักษร",
                        },
                        maxLength: {
                            value: 16,
                            message: "ชื่อต้องมีตัวอีกษรไม่เกิน 16 ตัวอักษร",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.name && errors.name.message}
                </a>
                <input
                    type="text"
                    placeholder="อีเมล"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="email"
                    {...register("email", {
                        required: { value: true, message: "โปรดกรอกอีเมล" },
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "กรอกอีเมลเท่านั้น",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.email && errors.email.message}
                </a>
                <input
                    type="password"
                    placeholder="รหัสผ่าน"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="password"
                    {...register("password", {
                        required: { value: true, message: "โปรดกรอกรหัสผ่าน" },
                        minLength: {
                            value: 4,
                            message:
                                "รหัสผ่านต้องมีตัวอักษรอย่างน้อย 4 ตัวอักษร",
                        },
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.password && errors.password.message}
                </a>
                <input
                    type="password"
                    placeholder="ยืนยันรหัสผ่าน"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="cf_password"
                    {...register("cf_password", {
                        validate: (value) =>
                            value === watch("password") || "รหัสผ่านไม่ตรงกัน",
                    })}
                />
                <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.cf_password && errors.cf_password.message}
                </a>
                <button
                    type="submit"
                    className="py-2 mt-4 w-full rounded-md bg-blue-500 text-white outline-none font-medium"
                >
                    ยืนยัน
                </button>
                <p className="mt-2 text-xs font-light text-gray-500">
                    มีบัญชีอยู่เเล้ว?
                    <Link href="/signin">
                        <a className="ml-1 font-medium text-blue-400">
                            เข้าสู่ระบบตอนนี้
                        </a>
                    </Link>
                </p>
            </form>
        </div>
    );
}
