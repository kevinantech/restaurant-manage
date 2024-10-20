export type ResponseCodeType =
  | "OK"
  | "UNAUTHORIZED"
  | "BAD REQUEST"
  | "NOT FOUND"
  | "INTERNAL SERVER ERROR";

export const ResponseCode: Record<
  ResponseCodeType,
  {
    code: ResponseCodeType;
    status: number;
  }
> = {
  OK: {
    code: "OK",
    status: 200,
  },
  "BAD REQUEST": {
    code: "BAD REQUEST",
    status: 400,
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    status: 401,
  },
  "NOT FOUND": {
    code: "NOT FOUND",
    status: 404,
  },
  "INTERNAL SERVER ERROR": {
    code: "INTERNAL SERVER ERROR",
    status: 500,
  },
};
