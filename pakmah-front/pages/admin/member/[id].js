import { fetchMember, updateMember } from "../../../services";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useSingleMember() {
    const [member, setMember] = useState();
    const router = useRouter();
    const auth = useSelector((state) => state.auth);
    const id = router.query.id;
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (id) fetchMember(id).then((member) => setMember(member));
    }, [id]);

    const clean = (obj) => {
        for (const p in obj) {
            if (obj[p] === null || obj[p] === "") {
                delete obj[p];
            }
        }
        return obj;
    };

    const onSubmit = async (d) => {
        const data = clean(d);
        updateMember(member?._id, { point: ~~data.point });
        router.push("../member");
    };

    if (auth.member?.roles != "admin")
        typeof window !== "undefined" && router.push("/");

    return (
        <div className="container max-w-2xl w-full py-8 px-5 mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800">
                อัพเดทเเมมเบอร์ไอดี #{member?._id}
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start justify-center"
            >
                <input
                    type="number"
                    placeholder="พอยท์"
                    className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
                    name="point"
                    {...register("point")}
                />

                <button
                    type="submit"
                    className="py-2 mt-4 w-full rounded-md bg-blue-500 text-white outline-none font-medium"
                >
                    ยืนยัน
                </button>
            </form>
        </div>
    );
}
