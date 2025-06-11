import ProductCard from "./ProductCard";
import { fetchBestsellerProduct, fetchProducts } from "../services";
import React from "react";

export default function BestSeller() {
    const [productsBestSeller, setProductsBestSeller] = React.useState([]);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        fetchBestsellerProduct().then((productsBestSeller) =>
            setProductsBestSeller(productsBestSeller)
        );
        fetchProducts().then((products) => setProducts(products));
    }, []);

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h2 className="text-3xl font-semibold text-gray-800">
                สินค้ายอดฮิต
            </h2>
            {products.length != 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    {productsBestSeller.mostQueue?.map((mq, i) => (
                        <div key={i}>
                            {products.map((p, i) => (
                                <div key={i}>
                                    {mq._id === p._id && (
                                        <ProductCard
                                            id={p._id}
                                            image={p.image}
                                            name={p.name}
                                            detail={p.name}
                                            price={p.price}
                                            type={p.type}
                                            to={`product/${p._id}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    {productsBestSeller.mostStock?.map((ms, i) => (
                        <div key={i}>
                            {products.map((p, i) => (
                                <div key={i}>
                                    {ms._id === p._id && (
                                        <ProductCard
                                            id={p._id}
                                            image={p.image}
                                            name={p.name}
                                            detail={p.name}
                                            price={p.price}
                                            type={p.type}
                                            to={`product/${p._id}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-4">ไม่มีสินค้า</p>
            )}
        </div>
    );
}
