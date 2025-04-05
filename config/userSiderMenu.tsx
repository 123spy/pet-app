import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: 'home',
        icon: <SmileFilled />,
        component: './Welcome',
      },
    ],
  },
};
