import { useNavigate } from "react-router-dom";

export function ToyPreview({ toy }) {
  let navigate = useNavigate();

  const { name, price, inStock } = toy;
  return (
    <section
      onClick={() => navigate(`/${toy._id}`)}
      className="toy-preview hover"
    >
      <h4>{name}</h4>
      <h5 className="price">Price: {price}$</h5>
      <h5 className={"bold " + (inStock ? "green" : "red")}>
        {inStock ? "In Stock" : "Out of Stock"}
      </h5>
    </section>
  );
}
