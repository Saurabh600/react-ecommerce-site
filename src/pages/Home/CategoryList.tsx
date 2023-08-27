import { categoryList } from "../../data/category";
import { TProduct, TSetState } from "../../types";

type Props = {
  setLoading: TSetState<boolean>;
  setProducts: TSetState<TProduct[]>;
};

type BtnClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const CategoryList: React.FC<Props> = ({ setLoading, setProducts }) => {
  let btnController: AbortController | null = null;

  const onSelectCategory = (e: BtnClickEvent) => {
    // aborting previous api call
    if (btnController) btnController.abort();
    setLoading(true);

    const target = e.target as HTMLButtonElement;
    const category = target.getAttribute("data-category-type");
    if (!category) return;

    // changing window title
    document.title = `${category} | React Shopping Cart`;

    const newController = new AbortController();
    // fetching data & modifying products state
    fetch(`https://dummyjson.com/products/category/${category}`, {
      signal: newController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
      });

    // setting new abort controller
    btnController = newController;
  };

  return (
    <div className="mb-4">
      {categoryList.map((category) => (
        <button
          key={category}
          className="px-2 py-1.5 m-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-gray-300 border-none rounded"
          data-category-type={category}
          onClick={onSelectCategory}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
