export interface ContextData {
  query?: unknown;
  params?: unknown;
  res?: unknown
}
export interface HttpContext<T extends ContextData = ContextData> {
  readonly key: string; // context的key由api构造
  readonly method: HttpInstructMethod[],
  readonly proto: Record<string, unknown>;
  query: T["query"];
  params: T["params"];
  return?: {
    data: T['res']; // 返回对象
  }
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
  handler: (ctx: HttpContext<C>) => C['res'];
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
