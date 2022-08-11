import React from "react";
import "../resources/default-layout.css";
import { Button, Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("money-track-user"));
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <li
              onClick={() => {
                localStorage.removeItem("money-track-user");
                navigate("/login");
              }}
            >
              Salir
            </li>
          ),
        },
      ]}
    />
  );

  return (
    <div className='layout'>
      <div className='header d-flex justify-content-between align-items-center'>
        <div>
          <h1 className='logo'>Expense Tracker</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement='bottomLeft'>
            <button className='primary'>{user.name.toUpperCase()}</button>
          </Dropdown>
        </div>
      </div>

      <div className='content'>{children}</div>
    </div>
  );
};

export default DefaultLayout;
