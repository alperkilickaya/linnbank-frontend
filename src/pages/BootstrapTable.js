import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";

import data from "./data";

const BootstrapTable = () => {
  const [users, setUsers] = useState(data);

  useEffect(() => {
    const fetchUserList = async () => {
      const { data } = await axios("./data.js");
      setUsers(data);
      console.log(data);
    };
    fetchUserList();
  }, [setUsers]);

  
  const arrows = (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="sort"
      class="svg-inline--fa fa-sort fa-w-10 "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      height="15px"
    >
      <path
        fill="navy"
        style={{ height: "5px" }}
        d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
      ></path>
    </svg>
  );
  return (
    <ReactBootstrap.Container className="mt-5">
      <h1 className="text-center mb-5">Customers  Sayisi : {users.length} </h1>
      <ReactBootstrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>ID {arrows}</th>
            <th>First Name {arrows}</th>
            <th>Last Name {arrows}</th>
            <th>E-mail {arrows}</th>
            <th>mobile Phone Numner{arrows}</th>
            <th>phone Number {arrows}</th>
            <th>Address {arrows}</th>
            <th>Create Date {arrows}</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.mobilePhone}</td>
                <td>{data.phone}</td>
                <td>{data.address}</td>
                <td>{data.createDate}</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </ReactBootstrap.Table>
    </ReactBootstrap.Container>
  );
};
export default BootstrapTable;
