import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  CompassOutlined,
  BookOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import Home from "../../Pages/UI/Home";
import Explore from "../../Pages/UI/Explore";
import Bookmarks from "../../Pages/UserPages/Bookmarks";
import Profile from "../../Pages/UserPages/Profile";
import Tweet from "../../Pages/ActionPages/Tweet";

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <>
      <Sider width={250} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100vh", borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">
              <Home />
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CompassOutlined />}>
            <Link to="explore">
              <Explore />
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            <Link to="bookmarks">
              <Bookmarks />
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="profile">
              <Profile />
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<EditOutlined />}>
            <Link to="tweet">
              <Tweet />
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
