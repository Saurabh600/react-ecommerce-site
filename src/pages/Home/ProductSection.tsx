import { Link } from "react-router-dom";
import { TProduct } from "../../types";

type Props = {
  data: TProduct[];
};

const ProductsSection: React.FC<Props> = ({ data }) => {
  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLButtonElement;
    const productId = target.getAttribute("data-product-id");
    if (!productId) return;

    let cartArray: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart-array") ?? "[]"
    );

    if (cartArray.some((item) => item.id === Number(productId))) {
      cartArray = cartArray.map((item) => ({
        ...item,
        quantity: item.quantity + 1,
      }));
    } else {
      cartArray.push({ id: Number(productId), quantity: 1 });
    }

    // storing to localstorage
    localStorage.setItem("cart-array", JSON.stringify(cartArray));
  };

  return (
    <>
      {data.map((product) => (
        <div
          key={product.id.toString()}
          className="flex flex-col justify-between no-underline text-inherit p-4 text-gray-100 bg-gray-700 rounded"
        >
          <img
            src={product.thumbnail}
            className="block w-full h-[300px]"
            alt="images"
          />
          <Link
            to={`/product/${product.id}`}
            target="_blank"
            className="no-underline my-4"
          >
            <div className="text-center text-lg hover:text-blue-600 hover:font-medium">
              {product.title}
            </div>
          </Link>
          <div className="text-center mb-2">
            <small className="text-sm">$</small>{" "}
            <b className="text-lg">{product.price}</b>
            <small className="text-sm">.99</small>
          </div>
          <button
            data-product-id={product.id.toString()}
            className="py-3 text-base text-white bg-blue-600  hover:bg-blue-700 rounded border-none cursor-pointer transition"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  );
};

export default ProductsSection;
