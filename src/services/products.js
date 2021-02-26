import axios from 'axios';

export const getProducts = (payload) => {
  return axios.get('https://app.markitworld.com/api/v2/user/products', {
    params: {
      ...payload,
    },
    headers: {
        Authorization: '446a6828200604377695aa034cf57e36',
      UserAddressId: 2378,
      StoreID: 1,
    },
  });
};
