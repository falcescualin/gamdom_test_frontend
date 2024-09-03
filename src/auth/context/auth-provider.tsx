import { useMemo, useEffect, useReducer, useCallback } from "react";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import axios from "src/utils/axios";
import endpoints from "src/utils/endpoints";

import { AuthStateType } from "../types";
import { AuthContext } from "./auth-context";
import { setSession, isValidToken } from "./utils";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: any) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession({ accessToken, refreshToken });

        const res = await axios.get(endpoints.auth.me);

        const { data: meData } = res.data;

        const { user } = meData;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        if (refreshToken && isValidToken(refreshToken)) {
          const res = await axios.post(endpoints.auth.refresh, {
            refreshToken,
          });
          const { data: refreshData } = res.data;

          const { user, accessToken: newAccessToken } = refreshData;

          setSession({ accessToken: newAccessToken, refreshToken });

          dispatch({
            type: Types.INITIAL,
            payload: {
              user,
            },
          });

          return;
        }

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      const data = {
        email,
        password,
      };

      const res = await axios.post(endpoints.auth.login, data);

      const { data: loginData } = res.data;
      const { tokens, user } = loginData;
      const { accessToken, refreshToken } = tokens;

      setSession({ accessToken, refreshToken });

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });

      router.push(paths.dashboard.root);
    },
    [router]
  );

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { data: registerData } = res.data;
      const { tokens, user } = registerData;
      const { accessToken, refreshToken } = tokens;

      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession({
      accessToken: null,
      refreshToken: null,
    });
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      setSession({ accessToken: null, refreshToken: null });
      return;
    }

    const res = await axios.post(endpoints.auth.refresh, {
      refreshToken,
    });

    const { data: refreshData } = res.data;

    const { accessToken: newAccessToken } = refreshData;

    setSession({ accessToken: newAccessToken, refreshToken });
  }, []);

  const me = useCallback(async () => {
    const res = await axios.get(endpoints.auth.me);

    const { data: meData } = res.data;

    const { user } = meData;

    dispatch({
      type: Types.INITIAL,
      payload: {
        user,
      },
    });
  }, []);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      register,
      logout,
      refreshAccessToken,
      me,
    }),
    [state.user, status, login, register, logout, refreshAccessToken, me]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
