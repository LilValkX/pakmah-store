import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Banner() {
    const configs = useSelector((state) => state.config);
    const config = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <div className="container mx-auto px-5 max-w-5xl">
            <Slider {...config}>
                {configs.banner_website &&
                    configs?.banner_website.map((slide, index) => (
                        <div className="w-full max-h-96 h-full" key={index}>
                            <Image
                                src={slide}
                                className="h-full w-full rounded-3xl"
                                layout="responsive"
                                width={760}
                                height={240}
                                alt="banner"
                                // objectFit={"cover"}
                            />
                        </div>
                    ))}
            </Slider>
        </div>
    );
}
