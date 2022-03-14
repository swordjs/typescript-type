export interface ContextData {
  query?: Record<string, string | string[] | undefined>;
  params?: Record<string, unknown>;
}
export interface HttpContext<T extends ContextData = ContextData> {
  key: string; // context的key由api构造
  method: HttpInstructMethod[],
  proto: Record<string, unknown>;
  query: T["query"];
  params: T["params"];
}

export type HttpInstructMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE";

export type HttpInstruct = (path?: string) => HttpInstructReturn;
export type HttpInstructReturn = {
  method: HttpInstructMethod;
  path?: string;
};

export type HttpApi = <C extends ContextData>(
  instruct: HttpInstructReturn | HttpInstructReturn[],
  handler: (ctx: HttpContext<C>) => void
) => HttpApiReturn<C>;

export type HttpApiReturn<C extends ContextData> = {
  instruct: {
    method: HttpInstructMethod[];
    path?: string;
  };
  handler: (ctx: HttpContext<C>) => void;
};

export interface Use {
  ValidateProto: (
    key: string,
    data: Record<string, unknown>,
    schema: Record<string, unknown>
  ) =>
    | {
        isSucc: true;
        errMsg?: undefined;
      }
    | {
        isSucc: false;
        errMsg: string;
      };
}
