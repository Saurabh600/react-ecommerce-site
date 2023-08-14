import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id: productId } = useParams();
  return (
    <>
      <h1>Welcome To Product Page!</h1>
      <p>Product Id: {productId}</p>
    </>
  );
}
