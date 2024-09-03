export interface UIUser {
  id: string;
  email: string;
  role: UIRoles;
  createdAt: string;
  lastSignInAt?: Date;
}

export type AuthUserType = UIUser | null;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

export type JWTContextType = {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  me: () => Promise<void>;
};

export enum UIRoles {
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
}

export enum UITokenJWTTypes {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export interface UILoginResponseSuccessData {
  success: boolean;
  data: {
    user: UIUser;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface UIMeResponseSuccessData {
  user: UIUser;
}

export interface UIRefreshCreatePayload {
  refreshToken?: string;
}

export interface UILoginCreatePayload {
  email: string;
  password: string;
}

export interface UIRegisterCreatePayload {
  email: string;
  password: string;
}
