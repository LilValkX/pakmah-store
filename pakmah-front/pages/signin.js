import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../services/";

export default function Signin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const onSubmit = async (d, e) => {
        e.target.reset();
        dispatch(signin(d));
    };
    if (auth.member._id) router.push("/");

    return (
        <div className="container max-w-md w-full py-8 px-5 mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800">
                เข้าสู่ระบบ
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start justify-center"
            >
                <input
                    type="text"
                    placeholder="ชื่อผู้ใช้"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="name"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "โปรดกรอกชื่อผู้ใช้",
                        },
                    })}
                />
                <p className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.name && errors.name.message}
                </p>
                <input
                    type="password"
                    placeholder="รหัสผ่าน"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="password"
                    {...register("password", {
                        required: { value: true, message: "โปรดกรอกรหัสผ่าน" },
                    })}
                />
                <p className="ml-1 mt-1 font-medium text-xs text-blue-500">
                    {errors.password && errors.password.message}
                </p>

                <button
                    type="submit"
                    className="py-2 mt-4 w-full rounded-md bg-blue-500 text-white outline-none font-medium"
                >
                    ยืนยัน
                </button>
                <p className="mt-2 text-xs font-light text-gray-500">
                    ยังไม่มีมีบัญชี?
                    <Link href="/signup">
                        <a className="ml-1 font-medium text-blue-400">
                            สมัครสมาชิกตอนนี้
                        </a>
                    </Link>
                </p>
            </form>
        </div>
    );
}
