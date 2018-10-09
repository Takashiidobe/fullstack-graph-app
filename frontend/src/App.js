import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    year: "all",
    product: "",
    visible: false,
    error: false,
    serverRevenue: 0,
    databaseRevenue: 0,
    laptopRevenue: 0
  };

  componentDidMount() {
    fetch("http://localhost:5000/api", {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(res => res.json())
      .catch(() => this.setState({ error: true }))
      .then(res => {
        this.setState({
          serverRevenue: res
            .filter(item => item.product === "Server")
            .map(item => item.revenue)
            .reduce((sum, reducer) => sum + reducer),
          databaseRevenue: res
            .filter(item => item.product === "Database")
            .map(item => item.revenue)
            .reduce((sum, reducer) => sum + reducer),
          laptopRevenue: res
            .filter(item => item.product === "Laptop")
            .map(item => item.revenue)
            .reduce((sum, reducer) => sum + reducer),
          data: res.map(item => ({
            id: item.id,
            year: item.year,
            product: item.product,
            country: item.country,
            revenue: item.revenue
          }))
        });
      })
      .catch(() => this.setState({ error: true }));
  }
  render() {
    return (
      <div className="App">
        <p>Hello world</p>
        {this.state.data}
      </div>
    );
  }
}

export default App;
