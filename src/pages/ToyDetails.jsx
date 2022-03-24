import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { loadToys } from "../store/actions/toy-actions";

import { utilService } from "../services/util.service";
import { NavLink } from "react-router-dom";

export function _ToyDetails({ toys, loadToys }) {
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();

  useEffect(() => {
    if (!toys.length) loadToys();
  });

  useEffect(() => {
    const toyToSet = toys.find((toy) => toy._id === toyId);
    setToy(toyToSet);
  }, [toys]);

  if (!toy) return <span>No such toy</span>;
  const { name, price, labels, createdAt, inStock } = toy;
  return (
    <section className="toy-details">
      <h3 className="detail name">{name}</h3>
      <div className="detail price">
        <span>Price</span>: {price}$
      </div>
      <div className="detail labels"></div>
      <div className="detail created-at">
        <span>Created at</span>: {utilService.getTimeAndDate(createdAt)}
      </div>
      <div className={"bold in-stock detail " + (inStock ? "green" : "red")}>
        {inStock ? "In Stock" : "Out of Stock"}
      </div>
      <div className="nav">
        <NavLink className="btn" to="/">
          Back to toys
        </NavLink>
        <NavLink className="btn" to={`/edit/?toyId=${toy._id}`}>
          Edit toy
        </NavLink>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    toys: state.toyModule.toys,
  };
}

const mapDispatchToProps = {
  loadToys,
};

export const ToyDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ToyDetails);
