import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  console.log(id);
  return <div>This is product page {id}</div>;
}

export default Product;
