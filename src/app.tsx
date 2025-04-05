
import "@/plugins/axios";

const isDev = process.env.NODE_ENV === 'development';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.UserVO;
}> {
  // const res = await getLoginUserUsingGet();
  const res = {
    code : 0,
    data: {
      userAccount: "123456789",
      userName: "Userk7o5jj",
      userPassword: "123456789",
      userProfile: "null...",
      userRole: "admin",
      _id: "67f08a6f9364e0c301ce1bf3",
    }
  }
  if (res.code === 0) {
    return {
      currentUser: res?.data
    }
  }
  return {
    currentUser: {},
  };
}
