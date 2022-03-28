import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { toyService } from "../services/toy-service";
import { utilService } from "../services/util.service";

import { loadToys } from "../store/actions/toy-actions";

const options = [
  { value: "Box game", label: "Box game" },
  { value: "Art", label: "Art" },
  { value: "Baby", label: "Baby" },
  { value: "Doll", label: "Doll" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Battery powered", label: "Battery powered" },
];

function _ToyEdit({ toys, loadToys }) {
  const [toy, setToy] = useState(null);
  const [searchParams] = useSearchParams();
  const toyId = searchParams.get("toyId");
  let navigate = useNavigate();

  useEffect(() => {
    if (!toys.length) loadToys();
  }, []);

  useEffect(() => {
    let toyToSet;
    if (toyId) {
      toyToSet = toys.find((toy) => toy._id === toyId);
    } else toyToSet = utilService.getEmptyToy();
    setToy(toyToSet);
  }, [toys]);

  const onRemoveToy = async (toyId) => {
    await toyService.removeToy(toyId);
    navigate("/");
  };

  const onSaveToy = (ev, toy) => {
    ev.preventDefault();
    toyService.saveToy(toy);
    navigate("/");
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (name === "inStock") {
      if (value === "true") value = true;
      else if (value === "false") value = false;
    } else if (target.type === "number") value = +value;
    const toyToSet = { ...toy, [name]: value };
    setToy(toyToSet);
  };

  const handleLabelChange = (ev) => {
    const labels = ev.map((option) => option.value);
    setToy({ ...toy, labels });
  };

  if (!toy) return <span>No such toy</span>;
  const { name, price, inStock, labels } = toy;
  const labelsForSelect = labels.map((label) => {
    return { value: label, label };
  });

  return (
    <section className="toy-edit">
      <form className="edit-form" onSubmit={(ev) => onSaveToy(ev, toy)}>
        <div className="name detail">
          <span>Name</span>:
          <input
            required
            type="text"
            name="name"
            placeholder="Enter toy name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="detail price">
          <span>Price</span>:
          <input
            min={0}
            required
            type="number"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={handleChange}
          />
          $
        </div>
        <div className="detail labels">
          <span>Labels</span>:
          <Select
            className="select"
            name="labels"
            isMulti
            options={options}
            onChange={handleLabelChange}
            value={labelsForSelect}
          />
        </div>
        <div className="detail in-stock">
          <span>Stock</span>:
          <select name="inStock" onChange={handleChange} value={inStock}>
            <option value="all">All</option>
            <option value={false}>Out of stock</option>
            <option value={true}>In stock</option>
          </select>
        </div>
        <div className="submit">
          <a className="btn hover" type="submit" href="/">
            Back to Toys
          </a>
          <div>
            <input className="hover btn" value="Save" type="submit" />

            <button className="hover btn" onClick={() => onRemoveToy(toy._id)}>
              Remove toy
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function mapStateToProps(state) {
  return { toys: state.toyModule.toys };
}

const mapDispatchToProps = {
  loadToys,
};

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit);
