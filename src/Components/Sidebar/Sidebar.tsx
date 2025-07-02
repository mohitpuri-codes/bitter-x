import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  CompassOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router';
import styles from './sidebar.module.css';

const { Sider } = Layout;

export default function Sidebar() {
  const location = useLocation();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
      className={styles.sidebarWrapper}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className={styles.menu}
      >
        <Menu.Item key="/" icon={<HomeOutlined />} className={styles.menuItem}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          key="/explore"
          icon={<CompassOutlined />}
          className={styles.menuItem}
        >
          <Link to="/explore">Explore</Link>
        </Menu.Item>
        <Menu.Item
          key="/bookmarks"
          icon={<BookOutlined />}
          className={styles.menuItem}
        >
          <Link to="/bookmarks">Bookmarks</Link>
        </Menu.Item>
        <Menu.Item
          key="/profile"
          icon={<UserOutlined />}
          className={styles.menuItem}
        >
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>

      <div className={styles.tweetButtonWrapper}>
        <Link to="/tweet">
          <Button type="primary" block className={styles.tweetButton}>
            Tweet
          </Button>
        </Link>
      </div>
    </Sider>
  );
}
