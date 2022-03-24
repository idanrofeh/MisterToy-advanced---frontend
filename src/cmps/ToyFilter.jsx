import { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { onSetFilter, onSetSort } from "../store/actions/toy-actions";

const options = [
  { value: "On wheels", label: "On wheels" },
  { value: "Box game", label: "Box game" },
  { value: "Art", label: "Art" },
  { value: "Baby", label: "Baby" },
  { value: "Doll", label: "Doll" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Battery powered", label: "Battery powered" },
];

function _ToyFilter({ storeFilterBy, onSetFilter, onSetSort, sortBy }) {
  const [filterBy, setFilterBy] = useState({ ...storeFilterBy });

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (value === "true") value = true;
    else if (value === "false") value = false;
    const newFilterBy = { ...filterBy, [name]: value };
    setFilterBy(newFilterBy);
  };

  const handleLabelChange = (ev) => {
    const labels = ev.map((option) => option.value);
    setFilterBy({ ...filterBy, labels });
  };

  if (!filterBy) return <span>Loading..</span>;
  return (
    <section className="toy-filter">
      <h3>Filter Toys</h3>
      <div className="filter">
        🔎
        <input
          className="search-bar"
          type="text"
          name="name"
          placeholder="Search toys.."
          value={filterBy.name}
          onChange={handleChange}
        />
        <label>
          Stock:
          <select
            name="inStock"
            onChange={handleChange}
            value={filterBy.inStock}
          >
            <option value="all">All</option>
            <option value={false}>Out of stock</option>
            <option value={true}>In stock</option>
          </select>
        </label>
        <br></br>
        <label className="labels">
          <span>Labels:</span>
          <Select
            className="select"
            name="labels"
            isMulti
            options={options}
            onChange={handleLabelChange}
          />
        </label>
        <a className="btn hover" onClick={() => onSetFilter({ ...filterBy })}>
          Filter!
        </a>
      </div>
      <div className="sorter">
        <label>
          Sort by:
          <select
            name="SortBy"
            onChange={({ target }) => onSetSort(target.value)}
            value={sortBy}
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    storeFilterBy: state.toyModule.filterBy,
    sortBy: state.toyModule.sortBy,
  };
}

const mapDispatchToProps = {
  onSetFilter,
  onSetSort,
};

export const ToyFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ToyFilter);
