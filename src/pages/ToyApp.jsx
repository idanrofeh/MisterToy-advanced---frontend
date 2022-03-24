import { connect } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { cleanFilter, loadToys } from "../store/actions/toy-actions";

import { ToyList } from "../cmps/ToyList.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";

function _ToyApp({ loadToys, toys, cleanFilter }) {
  useEffect(() => {
    loadToys();
    return () => {
      cleanFilter();
    };
  });

  return (
    <section className="toy-app">
      <ToyFilter />
      {Boolean(toys?.length) && <ToyList toys={toys} />}
      {Boolean(!toys || !toys.length) && <span>No toys to show</span>}
      <NavLink className="btn" to="/edit">
        Add Toy
      </NavLink>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    toys: state.toyModule.toys,
    sortBy: state.toyModule.sortBy,
  };
}

const mapDispatchToProps = {
  loadToys,
  cleanFilter,
};

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp);

// let toys = [
//   {
//     _id: "t101",
//     name: "Talking Doll",
//     price: 123,
//     labels: ["Doll", "Battery powered", "Baby"],
//     createdAt: 1631031801011,
//     inStock: true,
//   },
//   {
//     _id: "t102",
//     name: "Truck",
//     price: 100,
//     labels: ["On wheels", "Battery powered"],
//     createdAt: 1631031901011,
//     inStock: true,
//   },
//   {
//     _id: "t103",
//     name: "Drone",
//     price: 1000,
//     labels: ["Outdoor", "Battery powered"],
//     createdAt: 1631032801011,
//     inStock: false,
//   },
// ];

// storageService.save("toyDB", toys);
