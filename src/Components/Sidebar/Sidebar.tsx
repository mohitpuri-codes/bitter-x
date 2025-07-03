import Menu from 'antd/es/menu';
import Button from 'antd/es/button';
import Sider from 'antd/es/layout/Sider';
import {
  HomeOutlined,
  CompassOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router';
import styles from './sidebar.module.css';
import { ROUTE } from '../../Constants/routes.constants';

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
        <Menu.Item
          key={ROUTE.HOME}
          icon={<HomeOutlined />}
          className={styles.menuItem}
        >
          <Link to={ROUTE.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item
          key={ROUTE.EXPLORE}
          icon={<CompassOutlined />}
          className={styles.menuItem}
        >
          <Link to={ROUTE.EXPLORE}>Explore</Link>
        </Menu.Item>
        <Menu.Item
          key={ROUTE.BOOKMARKS}
          icon={<BookOutlined />}
          className={styles.menuItem}
        >
          <Link to={ROUTE.BOOKMARKS}>Bookmarks</Link>
        </Menu.Item>
        <Menu.Item
          key={ROUTE.PROFILE}
          icon={<UserOutlined />}
          className={styles.menuItem}
        >
          <Link to={ROUTE.PROFILE}>Profile</Link>
        </Menu.Item>
      </Menu>

      <div className={styles.tweetButtonWrapper}>
        <Link to={ROUTE.TWEET}>
          <Button type="primary" block className={styles.tweetButton}>
            Tweet
          </Button>
        </Link>
      </div>
    </Sider>
  );
}
