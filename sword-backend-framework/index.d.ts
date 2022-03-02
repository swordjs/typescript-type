export interface ContextData {
  query?: Record<string, string>;
  params?: Record<string, unknown>;
}
export interface HttpContext<T extends ContextData = ContextData> {
  key: string; // context的key由api构造
  proto: Record<string, unknown>;
  query: T["query"];
  params: T["params"];
}

export type HttpInstructMethod =
  | "all"
  | "get"
  | "post"
  | "patch"
  | "put"
  | "delete"
  | "head"
  | "options";

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
    method: HttpInstructMethod | HttpInstructMethod[];
    path?: string;
  };
  validateProto: Use["ValidateProto"];
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
