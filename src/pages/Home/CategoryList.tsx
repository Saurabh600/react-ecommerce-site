import { categoryList } from "../../data/category";
import { TProduct, TSetState } from "../../types";

type Props = {
  setLoading: TSetState<boolean>;
  setProducts: TSetState<TProduct[]>;
};

const CategoryList: React.FC<Props> = ({ setLoading, setProducts }) => {
  let btnController: AbortController | null = null;
  let clearController: AbortController | null = null;

  const onClearSelection = () => {
    // aborting previous api call
    if (clearController) clearController.abort();
    setLoading(true);

    // setting window title
    document.title = "React Shopping Site";

    const newController = new AbortController();
    // fetching data & modifying products state
    fetch("https://dummyjson.com/products", { signal: newController.signal })
      .then((res) => res.json())
      .then((data) => {
        setProducts(() => data.products);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log(`failed to fetch data: ${err.message}`);
      });

    // setting new abort controlller
    clearController = newController;
  };

  const onSelectCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
    <div>
      <div className="bg-neutral-800 text-white p-3 rounded-lg">
        Select by Category
      </div>
      <div className="category-list">
        {categoryList.map((category) => (
          <button
            key={category}
            className="inline-block px-2 py-3 text-sm m-2 bg-slate-100 border border-solid border-transparent rounded-sm cursor-pointer"
            data-category-type={category}
            onClick={onSelectCategory}
          >
            {category}
          </button>
        ))}
      </div>
      <button
        className="py-3 px-4 text-base text-white bg-neutral-900 border border-solid border-transparent rounded"
        onClick={onClearSelection}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default CategoryList;
