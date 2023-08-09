import { TProduct } from "../model"
import { TReactSetState } from "../types"

export async function fetchProductList(
  setProductList: TReactSetState<TProduct[]>
) {
  try {
    const resp = await fetch("https://fakestoreapi.com/products")
    if (!resp.ok) throw new Error("Non 200 status returned")
    const data = await resp.json()
    setProductList(() => data)
  } catch (e) {
    alert(`error fetching data from fakestoreapi: ${e}`)
  }
}
