import { useForm } from "react-hook-form";
import { topupMember } from "../services";

export default function Topup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (d, e) => {
    e.target.reset();
    topupMember(d.link);
  };

  return (
    <div className="container mt-5 mx-auto px-5 max-w-4xl">
      <div className="border rounded-xl">
        <form className="px-2 py-4 sm:px-6" onSubmit={handleSubmit(onSubmit)}>
          <iframe
            className="w-full aspect-video rounded-md"
            src="https://www.youtube.com/embed/EmUFMfhYLbs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <input
            type="text"
            placeholder="ลิ้งซองของขวัญ"
            className="px-5 py-3 mt-4 w-full rounded-md bg-gray-100 text-sm outline-none"
            name="link"
            {...register("link", {
              required: {
                value: true,
                message: "โปรดกรอกลิ้งซองของขวัญ",
              },
            })}
          />
          <a className="ml-1 mt-1 font-medium text-xs text-blue-500">
            {errors.link && errors.link.message}
          </a>
          <button
            type="submit"
            className="py-2 mt-4 w-full rounded-md bg-blue-500 text-white outline-none font-medium"
          >
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
}
