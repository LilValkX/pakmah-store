import React from "react";
import ProductCard from "../../components/ProductCard";
import { useRouter } from "next/router";
import { fetchProductswithCategory, fetchCategory } from "../../services";

export default function SignleCategory() {
    const [products, setProducts] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const router = useRouter();
    const { id } = router.query;

    React.useEffect(() => {
        fetchProductswithCategory().then((products) => setProducts(products));
        if (id) fetchCategory(id).then((category) => setCategory(category));
    }, [id]);

    const title = products.map((p, i) => (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            key={i}
        >
            {p._id === id &&
                p.data.map((d, i) => (
                    <ProductCard
                        key={i}
                        id={d._id}
                        image={d.image}
                        name={d.name}
                        detail={d.name}
                        price={d.price}
                        type={d.type}
                        to={`../product/${d._id}`}
                    />
                ))}
        </div>
    ));

    return (
        <div className="container mt-5 mx-auto px-5 max-w-5xl">
            <h2 className="text-3xl font-semibold text-gray-800 my-4">
                {category.name}
            </h2>
            {title}
        </div>
    );
}

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//     {products.map((p, i) => (
//         <div key={i}>
//             {p.name}

//             {p.category._id === category._id && (
//                 <>
//                     <ProductCard
//                         key={i}
//                         id={p._id}
//                         image={p.image}
//                         name={p.name}
//                         detail={p.name}
//                         price={p.price}
//                         type={p.type}
//                         to={`../product/${p._id}`}
//                     />
//                 </>
//             )}
//         </div>
//     ))}
// </div>;

// {
//     products.map((p, i) => (
//         <div key={i}>

//         </div>
//     ));
// }
// {categories.map((category, i) => (
//                                 <div key={i}>
//                                     {p._id === category._id ? (
//                                         category._id === id ? (
//                                             category.name
//                                         ) : (
//                                             <p className="hidden"></p>
//                                         )
//                                     ) : (
//                                         <p className="hidden"></p>
//                                     )}
//                                 </div>
//                             ))}
// {p._id === id && (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//
//                         </div>
//                     )}
