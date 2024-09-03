import { jwtDecode } from "jwt-decode";

import { paths } from "src/routes/paths";

import axios from "src/utils/axios";
import endpoints from "src/utils/endpoints";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  if (!decoded || !decoded.exp) {
    return false;
  }

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const refreshTokenExpired = (exp: number | undefined) => {
  if (!exp) {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);

    window.location.href = paths.auth.login;

    return;
  }

  let expiredTimer: string | number | NodeJS.Timeout | undefined;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);

    window.location.href = paths.auth.login;
  }, timeLeft);
};

export const accessTokenExpired = (exp: number | undefined) => {
  if (!exp) {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);

    window.location.href = paths.auth.login;

    return;
  }

  let expiredTimer: string | number | NodeJS.Timeout | undefined;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(async () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);

    const res = await axios.post(endpoints.auth.refresh, {
      refreshToken,
    });

    const { data: refreshData } = res.data;

    const { accessToken: newAccessToken } = refreshData;

    setSession({ accessToken: newAccessToken, refreshToken });
  }, timeLeft);
};

export const setSession = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string | null;
}) => {
  if (accessToken && refreshToken) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp: refreshTokenExp } = jwtDecode(refreshToken);
    const { exp: accessTokenExp } = jwtDecode(accessToken);

    refreshTokenExpired(refreshTokenExp);
    accessTokenExpired(accessTokenExp);
  } else {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);

    delete axios.defaults.headers.common.Authorization;
  }
};
