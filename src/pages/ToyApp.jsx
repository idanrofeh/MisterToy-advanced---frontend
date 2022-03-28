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
  }, []);

  return (
    <section className="toy-app">
      <ToyFilter />
      {toys?.length ? <ToyList toys={toys} /> : <span>No toys to show</span>}
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
