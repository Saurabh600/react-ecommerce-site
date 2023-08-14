import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { TSetState } from "../../types";
import { TProduct } from "../../models";

export async function fetchProductList(setProductList: TSetState<TProduct[]>) {
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
