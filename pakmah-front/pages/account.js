import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

export default function useProfile() {
    const member = useSelector((state) => state.auth.member);
    const router = useRouter();

    if (!member?._id) typeof window !== "undefined" && router.replace("/");

    return (
        <div className="container mt-5 mx-auto px-5 max-w-4xl">
            <div className="border rounded-xl">
                <div className="px-4 py-5 sm:px-6">
                    <center>
                        <div className="mb-4 w-32">
                            <Image
                                src="https://cdn.discordapp.com/attachments/901110242295840829/972837740116836353/279463658_3912241222333365_1822489736960371893_n.png"
                                className="rounded-full"
                                width="100%"
                                height="100%"
                                layout="responsive"
                                alt="bababa"
                            />
                        </div>
                    </center>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        About account
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        เกี่ยวกับบัญชี
                    </p>
                </div>
                <div className="border-t border-gray-200 flex flex-col justify-start items-start">
                    <div className="p-2">ไอดี : {member._id}</div>
                    <div className="p-2">ชื่อ : {member.name}</div>
                    <div className="p-2">อีเมล : {member.email}</div>
                    <div className="p-2">ยศ : {member.roles}</div>
                </div>
            </div>
        </div>
    );
}
