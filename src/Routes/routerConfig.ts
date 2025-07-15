import HomeLayout from '../Layout/HomeLayout';
import Bookmarks from '../Pages/UserPages/Bookmarks';
import Explore from '../Pages/UI/Explore';
import Home from '../Pages/UI/Home';
import Login from '../Pages/Auth/Login';
import NotFound from '../Pages/NotFound';
import Profile from '../Pages/UserPages/Profile';
import Tweet from '../Pages/ActionPages/Tweet';
import Signup from '../Pages/Auth/Signup';

export interface RouteConfig {
  path?: string;
  element: React.FC;
  children?: RouteConfig[];
  index?: boolean;
  isAuth?: boolean;
  isUnderMaintainance?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: HomeLayout,
    children: [
      {
        index: true,
        path: '',
        element: Home,
        isAuth: true,
      },
      {
        path: 'explore',
        element: Explore,
        isAuth: true,
        isUnderMaintainance: true,
      },
      {
        path: 'bookmarks',
        element: Bookmarks,
        isAuth: true,
      },
      {
        path: 'profile',
        element: Profile,
        isAuth: true,
      },
      {
        path: 'tweet',
        element: Tweet,
        isAuth: true,
      },
    ],
  },
  {
    path: 'login',
    element: Login,
  },
  {
    path: 'signup',
    element: Signup,
  },
  {
    path: '*',
    element: NotFound,
  },
];
