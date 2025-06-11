import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signout } from "../services/auth.service";
import Link from "next/link";
import Image from "next/image";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ email, name, point }) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const router = useRouter();

    const handleSignout = () => {
        dispatch(signout());
        router.push("/");
    };

    return (
        <Menu as="div" className="relative inline-block text-left z-20">
            <div className=" h-10">
                <Menu.Button className="inline-flex items-center justify-center flex-col w-full rounded-full px-4">
                    <div className="w-10">
                        <Image
                            width="100%"
                            height="100%"
                            layout="responsive"
                            alt="bababa"
                            className="rounded-full"
                            src="https://cdn.discordapp.com/attachments/901110242295840829/972837740116836353/279463658_3912241222333365_1822489736960371893_n.png"
                        />
                    </div>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        <div className="block px-4 py-2 text-sm">
                            <p className="text-gray-600 text-xs">{email}</p>
                            <p className="">{point} บาท</p>
                        </div>
                        {auth.member.roles === "admin" && (
                            <>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link href="/admin">
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm"
                                                )}
                                            >
                                                จัดการหลังบ้าน
                                            </a>
                                        </Link>
                                    )}
                                </Menu.Item>
                            </>
                        )}

                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/historytopup">
                                    <a
                                        href="#"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        ประวัติการเติมเงิน
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/historytoycode">
                                    <a
                                        href="#"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        ประวัติการซื้อทอยโค้ด
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/historyrobux">
                                    <a
                                        href="#"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        ประวัติกดโรบัค
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/account">
                                    <a
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        เกี่ยวกับบัญชี
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleSignout()}
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-700"
                                            : "text-red-500",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    ออกจากระบบ
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
