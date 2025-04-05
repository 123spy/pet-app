import {Outlet} from "@@/exports";
import {ProLayout} from "@ant-design/pro-layout";
import {history} from "umi";
import GlobalFooter from "@/components/GlobalFooter";
import {MenuDataItem} from "@umijs/route-utils";
import menu from "../../config/basicHeaderMenu";
import {Link, useAccess} from "@@/exports";
import {APP_LOGO, APP_TITLE} from "@/constants/appConstant";
import {PageContainer} from "@ant-design/pro-components";

const menuDataRender = (menuList: MenuDataItem[], access: any) => {
  return menuList.filter((menuItem) => {
    return !menuItem.access || access[menuItem.access];
  });
};

const BasicLayout = () => {
  const access = useAccess();

  return (
    <div>
      <ProLayout
        layout={"top"}
        title={APP_TITLE}
        logo={APP_LOGO}
        onMenuHeaderClick={() => {
          history.push("/");
        }}
        pageTitleRender={false}
        footerRender={() => <GlobalFooter/>}
        menuDataRender={() => menuDataRender(menu, access)}
        menuItemRender={(
          menuItemProps, defaultDom
        ) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link style={{color: "black"}} to={menuItemProps.path}>{defaultDom}</Link>
        }}
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

export default BasicLayout;
