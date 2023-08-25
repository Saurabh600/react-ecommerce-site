import { Link } from "react-router-dom";
import { TProduct } from "../../types";

type Props = {
  data: TProduct[];
};

const ProductsSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="col-span-3 grid grid-cols-4 gap-x-9 gap-y-4">
      {data.map((product) => (
        <Link
          key={product.id.toString()}
          className="flex flex-col justify-between no-underline text-inherit p-4 bg-slate-100 rounded"
          to={`/product/${product.id}`}
          target="_blank"
        >
          <img
            src={product.thumbnail}
            className="block w-full h-[300px]"
            alt="images"
          />
          <div className="text-center text-lg my-4">{product.title}</div>
          <div className="text-center">
            <small className="text-sm">$</small>{" "}
            <b className="text-lg">{product.price}</b>
            <small className="text-base">.99</small>
          </div>
          <button className="py-3 text-base text-white bg-neutral-800 border-none cursor-pointer transition">
            Add to Cart
          </button>
        </Link>
      ))}
    </section>
  );
};

export default ProductsSection;
