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
        path: '/admin',
        name: 'adminPage',
        icon: <CrownFilled />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/product',
            name: 'PetAdmin',
            icon: <CrownFilled />,
          },
        ],
      },
    ],
  },
};
