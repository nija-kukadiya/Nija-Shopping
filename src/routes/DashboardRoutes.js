import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import * as routes from "../lib/constants";

import { ItemList, LoginForm, RegistrationForm, Product, Contact } from "../components";


class DashboardRoutes extends Component {
    render() {
      return (
        <div>
          <Switch>
            <Route
              exact
              path={routes.ROOT_ROUTE}
              component={this.handleItemList}
            />
            <Route
              exact
              path={routes.ITEMS_ROUTE}
              component={this.handleItemList}
            />
            <Route exact path={routes.ITEM_ROUTE} component={Product} />
            <Route
              exact
              path={routes.CARTS_ROUTE}
              component={this.handleCartList}
            />
            <Route
                exact
                path={routes.CONTACT_ROUTE}
                component={this.handleContact}
            />
            <Route
                exact
                path={routes.REGISTRATION_ROUTE}
                component={this.handleRegistration}
            />
            <Route
                exact
                path={routes.LOGIN_ROUTE}
                component={this.handleLogin}
            />
          </Switch>
        </div>
      );
    }
    handleContact = () => {
      return(
        <Contact />
      );
    }
    handleLogin = () => {
      return(
        < LoginForm />
      );
    }
    handleRegistration = () => {
      return(
        <RegistrationForm />
      );
    }
    handleItemList = () => {
      const { items, handleAddToCart } = this.props;
      return (
        <ItemList
          items={items}
          handleAddToCart={handleAddToCart}
          isCart={false}
        />
      );
    };
  
    handleCartList = () => {
      const { carts, handleRemoveToCart } = this.props;
      return (
        <ItemList items={carts} handleRemoveToCart={handleRemoveToCart} isCart />
      );
    };
  
    handleProduct = () => {
      const { handleAddToCart } = this.props;
      return <Product handleAddToCart={handleAddToCart} />;
    };
  }
  
  DashboardRoutes.propTypes = {
    items: PropTypes.any,
    handleAddToCart: PropTypes.func.isRequired,
    handleRemoveToCart: PropTypes.func.isRequired,
    carts: PropTypes.array
  };
  
  export default DashboardRoutes;
  