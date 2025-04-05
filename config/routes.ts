export default [
  {
    path: "/",
    layout: false,
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', name: 'welcome', icon: 'smile', component: '@/pages/Product/ProductList' },
      { path: '/product', name: 'welcome', icon: 'smile', component: '@/pages/Product/ProductList' },
      { path: '/product/add', name: 'welcome', icon: 'smile', component: '@/pages/Product/ProductAdd' },
      { path: '/product/:id', name: 'welcome', icon: 'smile', component: '@/pages/Product/ProductShow' },
      { path: '/cart', name: 'welcome', icon: 'smile', component: '@/pages/Cart/CartList' },
    ]
  },
  {
    path: "/",
    layout: false,
    component: '@/layouts/AdminLayout',
    routes: [
      { path: '/admin/product',name: 'welcome', icon: 'smile', component: '@/pages/Admin/product/AdminProductPage' },
    ]
  },
  { path: '*', layout: false, component: './404' },
];
