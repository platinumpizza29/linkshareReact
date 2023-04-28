import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Statistic, Menu } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";

export default function Col1(props) {
  //initialize variables
  var location = useLocation();
  var navigate = useNavigate();
  var cookie = new Cookies();

  //states
  const userName = location.state.username;

  //methods
  var userLogout = async () => {
    cookie.remove("auth-token");
    navigate("/login");
  };

  const handleFilter = ({ key }) => {
    const index = parseInt(key);
    const label = items[index].label;
    props.onChildValue(label);
  };

  //custom Data
  const items = [
    {
      key: "0",
      label: "Anime",
    },
    {
      key: "1",
      label: "Entertainment",
    },
    {
      key: "2",
      label: "Coding",
    },
    {
      key: "3",
      danger: true,
      label: "NFSW",
    },
  ];

  return (
    <div className="Col1">
      <h1>My Profile</h1>
      <div className="profileCard">
        <Card
          title={userName}
          style={{ height: "20vh" }}
          extra={
            <Button danger onClick={userLogout}>
              Logout
            </Button>
          }
        >
          <div className="userStat">
            <Statistic
              title="Upvote"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
            />
            <Statistic
              title="Downvote"
              value={9.3}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
            />
          </div>
        </Card>
      </div>
      <div className="Filters">
        <Menu
          style={{
            width: "100%",
            borderRadius: "8px",
            marginTop: "20px",
            onClick: handleFilter,
          }}
          items={items}
        />
      </div>
    </div>
  );
}
