export default [
  {
    path: '/',
    name: "Home",
  },
  {
    path: '/cart',
    name: "favorite",
  },
  {
    path: '/product/add',
    name: "share",
  },
  {
    path: "/admin",
    access: "canAdmin",
    name: "admin",
    children: [
      {
        name: 'petAdmin',
        path: '/admin/product',
      },
    ]
  }
]
