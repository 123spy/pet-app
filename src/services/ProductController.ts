import axios from "@/plugins/axios";

export const ListProductByPageUsingPost = async (values: any) => {
  return axios.post("/product/list/page", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const addProductUsingPost = async (values: any) => {
  return axios.post("/product/add", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const deleteProductUsingPost = async (values: any) => {
  return axios.post("/product/delete", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const getProductUsingPost = async (values: any) => {
  return axios.post("/product/get/id", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}

export const updateProductUsingPost = async (values: any) => {
  return axios.post("/product/update", values)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return {};
    })
}


