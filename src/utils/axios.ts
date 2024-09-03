import qs from "qs";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

import { HOST_API, API_VERSION } from "src/config-global";

const axiosInstance = axios.create({
  baseURL: `${HOST_API}/api/v${API_VERSION}`,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message: string }>) => {
    enqueueSnackbar(error.response?.data?.message || `Something went wrong`, {
      variant: "error",
    });

    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong",
    );
  },
);

export default axiosInstance;
