import { useEffect, useState } from "react";
import { TProduct, TSetState } from "../../types";

type CartItem = { id: number; quantity: number };
type CartProduct = TProduct & {
  quantity: number;
};

const CartSection: React.FC<{ setShowCart: TSetState<boolean> }> = ({
  setShowCart,
}) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItems: CartItem[] = JSON.parse(
      localStorage.getItem("cart-array") || "[]"
    );

    for (const { id: productId, quantity } of cartItems) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) =>
          setProducts((prev) => {
            if (prev.some((item) => item.id === data.id)) return prev;
            return [...prev, { ...data, quantity: quantity }];
          })
        )
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    let total = 0;
    products.forEach((p) => (total += p.price * p.quantity));
    setTotalPrice(() => total);
  }, [products]);

  return (
    <section className="w-1/3 fixed left-0 top-0 bottom-0 bg-gray-900 text-white">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-semibold">Cart Section</h2>
        <button
          className="block py-2 px-3 bg-red-500 text-sm rounded-lg hover:bg-red-600"
          onClick={() => setShowCart(false)}
        >
          Close
        </button>
      </div>
      <div className="px-3 mt-3 overflow-auto">
        {products.map((item) => (
          <div key={item.id.toString()} className="flex mb-2 p-2 bg-gray-800">
            <img src={item.thumbnail} alt="thumnail" className="block w-28" />
            <div className="px-3">
              <div className="text-lg mt-2">{item.title}</div>
              <div>Price ${item.price}</div>
              <div className="mt-2 text-sm">
                <button
                  disabled={item.quantity < 2}
                  className="py-1 px-3 mr-2 bg-neutral-900 rounded-2xl hover:bg-neutral-800"
                  onClick={() => {
                    setProducts((prev) =>
                      prev.map((arr) =>
                        arr.id !== item.id
                          ? arr
                          : { ...arr, quantity: item.quantity - 1 }
                      )
                    );
                  }}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="py-1 px-3 ml-2 bg-neutral-900 rounded-2xl hover:bg-neutral-800"
                  onClick={() => {
                    setProducts((prev) =>
                      prev.map((arr) =>
                        arr.id !== item.id
                          ? arr
                          : { ...arr, quantity: item.quantity + 1 }
                      )
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <div>Total Cost {totalPrice}</div>
        <button
          onClick={() => {
            let total = 0;
            products.forEach((p) => (total += p.price * p.quantity));
            alert(`Order of $${total} purchaged, hurray!!`);
          }}
          className="block w-full mt-3 py-2 rounded border-none bg-blue-600 hover:bg-blue-700"
        >
          Buy
        </button>
      </div>
    </section>
  );
};

export default CartSection;
