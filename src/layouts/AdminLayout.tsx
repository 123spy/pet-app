import {Outlet} from "@@/exports";
import {ProLayout} from "@ant-design/pro-layout";
import {history} from "umi";
import GlobalFooter from "@/components/GlobalFooter";
import {APP_LOGO, APP_TITLE} from "@/constants/appConstant";
import {PageContainer} from "@ant-design/pro-components";
import {useModel} from "@umijs/max";
import {useEffect, useState} from "react";
import userSiderMenu from "../../config/userSiderMenu";
import adminSiderMenu from "../../config/adminSiderMenu";
const AdminLayout = () => {
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  var sider = userSiderMenu;

  if (currentUser?.userRole === 'admin') {
    sider = adminSiderMenu;
  }
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    sider = userSiderMenu
  }, []);

  return (
    <div>
      <ProLayout
        layout={"mix"}
        title={APP_TITLE}
        logo={APP_LOGO}
        onMenuHeaderClick={() => {
          history.push("/");
        }}
        location={{pathname}}
        {...sider}
        menuItemRender={(item, dom) => {
          return (
            <div
              onClick={() => {
                history.push(item?.path);
                setPathname(item?.path)
              }}
            >
              {dom}
            </div>
          )
        }}
        pageTitleRender={false}
        footerRender={() => <GlobalFooter/>}
      >
        <PageContainer header={{
          title: null,
          breadcrumb: {},
        }}>
          <Outlet/>
        </PageContainer>
      </ProLayout>
    </div>
  )
}

export default AdminLayout;
