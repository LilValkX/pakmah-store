import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../components/ProductCard";
import { fetchProductswithCategory, fetchCategories } from "../../services";
import React, { useState } from "react";

export default function Products() {
    const [products, setProducts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [loading, setloading] = useState(false);

    React.useEffect(() => {
        setloading(true);
        fetchProductswithCategory().then((products) => {
            setProducts(products);
            fetchCategories().then((categories) => {
                setCategories(categories);
                setloading(false);
            });
        });
    }, []);

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            {loading ? (
                <p className="flex justify-center items-center">
                    <svg
                        className="animate-spin h-6 w-6 text-black block mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    โหลดสินค้า
                </p>
            ) : products.length != 0 ? (
                products.map((product, index) => (
                    <>
                        <div key={index}>
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-semibold text-gray-800 my-4">
                                    {categories.map((category, index) => (
                                        <div key={index}>
                                            {product._id === category._id ? (
                                                <p>{category.name}</p>
                                            ) : (
                                                <p className="hidden"></p>
                                            )}
                                        </div>
                                    ))}
                                </h2>

                                {categories.map((category, index) => (
                                    <Link
                                        href={`category/${category._id}`}
                                        key={index}
                                    >
                                        {product._id === category._id ? (
                                            <a>ดูสินค้าเพิ่มเติม</a>
                                        ) : (
                                            <p className="hidden"></p>
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {product.data.map((data, index) => (
                                    <div key={index}>
                                        <ProductCard
                                            key={index}
                                            id={data._id}
                                            image={data.image}
                                            name={data.name}
                                            detail={data.name}
                                            price={data.price}
                                            type={data.type}
                                            to={`product/${data._id}`}
                                        />
                                    </div>
                                ))}
                            </div> */}
                            <div
                                // {...settings}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {product.data.slice(0, 4).map((data, index) => (
                                    <div key={index}>
                                        <ProductCard
                                            key={index}
                                            id={data._id}
                                            image={data.image}
                                            name={data.name}
                                            detail={data.name}
                                            price={data.price}
                                            type={data.type}
                                            to={`product/${data._id}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ))
            ) : (
                <p className="text-center mt-4">ไม่มีสินค้า</p>
            )}
        </div>
    );
}
