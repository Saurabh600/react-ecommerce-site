import { collection, getDocs } from "firebase/firestore";
import { TProduct } from "../model";
import { TReactSetState } from "../types";
import { db } from "../services/firebase";

export async function fetchProductList(
  setProductList: TReactSetState<TProduct[]>,
) {
  try {
    const productsCollection = collection(db, "products");
    const querySnap = await getDocs(productsCollection);
    const productsArr: TProduct[] = [];
    querySnap.forEach((doc) => {
      productsArr.push(doc.data() as TProduct);
    });
    setProductList(() => productsArr);
  } catch (e) {
    alert(`Error loading data form firestore: ${e}`);
  }
}
