import axios from "@/plugins/axios";

export const ListCartByPageUsingPost = async (values: any) => {
  return axios.post("/cart/list/page", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const addCartUsingPost = async (values: any) => {
  return axios.post("/cart/add", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const deleteCartUsingPost = async (values: any) => {
  return axios.post("/cart/delete", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const getCartUsingPost = async (values: any) => {
  return axios.post("/cart/get/id", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const updateCartUsingPost = async (values: any) => {
  return axios.post("/cart/update", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}


