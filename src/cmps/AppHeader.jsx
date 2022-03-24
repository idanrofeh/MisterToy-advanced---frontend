import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function AppHeader({ cart, user }) {
  return (
    <section className="app-header">
      <NavLink to="/" className="logo">
        🪀<span>MisterToy</span>
      </NavLink>
      <div className="control-box">
        <NavLink className="header-btn" to="/about">
          About
        </NavLink>
        <NavLink className="header-btn" to="/login">
          Login
        </NavLink>
        <a className="cart hover header-btn">🛒</a>
      </div>
    </section>
  );
}
