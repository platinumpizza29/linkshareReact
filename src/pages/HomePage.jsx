import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HomePage.css";

import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Dropdown,
  Space,
  message,
  Drawer,
} from "antd";

import { LikeOutlined, DislikeOutlined, MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "universal-cookie";
import Col1 from "../components/col1";

export default function HomePage() {
  //states
  const [postList, setPostList] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [getLink, setLink] = useState("");
  const [getCategory, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  //initialize variables
  const cookie = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state.email;

  //custom methods
  const getPosts = async () => {
    var jwt_cookie = cookie.get("auth-token");
    var uri = "http://192.168.1.137:4000/posts/allPosts";
    var headers = {
      "auth-token": jwt_cookie,
    };
    var response = await axios.get(uri, { headers: headers });
    setPostList(response.data);
    console.log(response.data);
  };

  var submitNewPost = async () => {
    var uri = "http://192.168.1.137:4000/posts/addPost";
    var jwt_cookie = cookie.get("auth-token");
    var headers = {
      "auth-token": jwt_cookie,
    };
    var response = await axios.post(
      uri,
      {
        email: email,
        category: getCategory,
        link: getLink,
        date: Date.now().toLocaleString(),
        time: Date.now().toLocaleString(),
      },
      { headers: headers }
    );
    if (response.status === 200) {
      getPosts();
      setCategory(null);
    }
    if (response.status === 500) {
      message.error("Error Submitting Post");
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleFilter = (childValue) => {
    setFilter(childValue);
    console.log(childValue);
  };

  //default methods
  useEffect(() => {
    getPosts();

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const categoryMenu = ({ key }) => {
    // setCategory(label);
    // message.info(getCategory);
    const index = parseInt(key);
    const label = items[index].label;
    setCategory(label);
  };

  return (
    <div className="HomePage">
      <Row className="row">
        <Col span={7} id="col1">
          <Col1 />
        </Col>

        {/* Col 2 start */}
        <Col span={width < 600 ? 24 : 10} id="col2">
          <div className="headerDiv">
            {width < 600 ? (
              <Button
                type="primary"
                shape="circle"
                id="menu"
                onClick={showDrawer}
              >
                <MenuOutlined />
              </Button>
            ) : (
              ""
            )}
            <Drawer
              title="Basic Drawer"
              placement="left"
              onClose={onClose}
              open={open}
            >
              <Col1 onChildValue={handleFilter} />
            </Drawer>
            <h1 id="heading">My Feed</h1>
          </div>
          <div className="addPostCard">
            <Card
              title="Add a link..."
              bordered={false}
              hoverable
              extra={
                <Button type="primary" onClick={submitNewPost}>
                  Post
                </Button>
              }
            >
              <Input
                size="large"
                placeholder="www.example.com"
                className="newPost"
                onChange={(value) => setLink(value.target.value)}
                addonAfter={
                  <Dropdown
                    menu={{
                      items,
                      onClick: categoryMenu,
                      selectable: true,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {getCategory === null ? "Category" : getCategory}
                      </Space>
                    </a>
                  </Dropdown>
                }
              />
            </Card>
          </div>
          <div className="feedCards">
            {postList.map((value, index) => {
              return (
                <Card
                  title={postList[index]["email"]}
                  extra={postList[index]["date"]}
                  key={index}
                  actions={[<LikeOutlined />, <DislikeOutlined />]}
                  id="postCard"
                >
                  {postList[index]["link"]}
                </Card>
              );
            })}
          </div>
        </Col>
        {/* Col 2 end */}

        <Col span={7} id="col3">
          col-8
        </Col>
      </Row>
    </div>
  );
}
