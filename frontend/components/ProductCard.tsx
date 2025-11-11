import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/utils/axios";
import toast from "react-hot-toast";
import { BsStarFill } from "react-icons/bs";

type Product = {
  _id: string;
  name: string;
  price: number;
  offerPrice: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
};

const ProductCard = ({ product }: { product: Product }) => {
  const purchaseHandler = async () => {
    try {
      const { data } = await api.post("/api/purchase/buy", {
        amount: product.offerPrice,
      });
      toast.success(data.message || "Purchase successfull");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    product && (
      <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-56 max-sm:w-full max-sm:mx-6 h-auto">
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-48 md:max-w-36 h-36"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p className="te  xt-gray-700 font-medium text-lg truncate w-full mt-3">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <BsStarFill
                  key={i}
                  className={`${i <= 2 && "text-green-500"}`}
                />
              ))}
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-[#4fbf8b]">
              ${product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                ${product.price}
              </span>
            </p>
            <button
              onClick={purchaseHandler}
              className="text-white px-4 py-1.5 rounded-md bg-blue-500 cursor-pointer"
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
