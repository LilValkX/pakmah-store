import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import Image from "next/image";

function Navbar() {
    const [IsSiderBarOpen, SetIsSiderBarOpen] = useState(false);
    const menus = [
        {
            path: "/",
            name: "หน้าหลัก",
        },
        {
            path: "/topup",
            name: "เติมพอยท์",
        },
        {
            path: "/product",
            name: "สินค้า",
        },
        {
            path: "/vipserver",
            name: "เติมโรบัค",
        },
    ];

    const member = useSelector((state) => state.auth.member);
    const config = useSelector((state) => state.config);

    return (
        <nav className="bg-white">
            <div className="font-semibold text-gray-800 px-4 my-2 max-w-6xl mx-auto container flex justify-between items-center">
                {config?.logo_website && (
                    <Link href="/">
                        <a className="w-12 md:w-16">
                            <Image
                                width={100}
                                height={100}
                                layout="responsive"
                                alt="bababa"
                                src={config?.logo_website}
                            />
                        </a>
                    </Link>
                )}

                <div className="hidden md:flex justify-center items-center">
                    {menus.map((menu, index) => {
                        return (
                            <Link href={menu.path} key={index}>
                                <a className="py-2 px-4 hover:text-blue-500 transition">
                                    {menu.name}
                                </a>
                            </Link>
                        );
                    })}
                    {member._id ? (
                        <Dropdown
                            email={member.email}
                            name={member.name}
                            point={member.point}
                        />
                    ) : (
                        <>
                            <Link href="/signup">
                                <a className="py-2 px-4 hover:text-blue-500 transition">
                                    สมัครสมาชิก
                                </a>
                            </Link>
                            <Link href="/signin">
                                <a className="py-2 px-4 hover:text-blue-500 transition">
                                    เข้าสู่ระบบ
                                </a>
                            </Link>
                        </>
                    )}
                </div>
                <div className="md:hidden z-10">
                    {!IsSiderBarOpen ? (
                        <button
                            className="flex items-center justify-center"
                            onClick={() => SetIsSiderBarOpen(!IsSiderBarOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 8h16M4 16h16"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            className="fixed z-30 flex items-center cursor-pointer right-5 top-5"
                            onClick={() => SetIsSiderBarOpen(!IsSiderBarOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                    <div
                        className={`top-0 right-0 fixed bg-gray-50 w-60 h-full p-5 flex flex-col ease-in-out duration-300 ${
                            IsSiderBarOpen
                                ? "translate-x-0 "
                                : "translate-x-full"
                        }`}
                    >
                        <div className="flex flex-col mt-2 ">
                            {member._id ? (
                                <Dropdown
                                    email={member.email}
                                    name={member.name}
                                    point={member.point}
                                />
                            ) : (
                                <>
                                    <Link href="/signup">
                                        <a
                                            className="py-2 px-4 hover:text-blue-500 transition"
                                            onClick={() =>
                                                SetIsSiderBarOpen(
                                                    !IsSiderBarOpen
                                                )
                                            }
                                        >
                                            สมัครสมาชิก
                                        </a>
                                    </Link>
                                    <Link href="/signin">
                                        <a
                                            className="py-2 px-4 hover:text-blue-500 transition"
                                            onClick={() =>
                                                SetIsSiderBarOpen(
                                                    !IsSiderBarOpen
                                                )
                                            }
                                        >
                                            เข้าสู่ระบบ
                                        </a>
                                    </Link>
                                </>
                            )}
                            {menus.map((menu, index) => {
                                return (
                                    <Link href={menu.path} key={index}>
                                        <a
                                            className="py-2 px-4 hover:text-blue-500 transition"
                                            onClick={() =>
                                                SetIsSiderBarOpen(
                                                    !IsSiderBarOpen
                                                )
                                            }
                                        >
                                            {menu.name}
                                        </a>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
