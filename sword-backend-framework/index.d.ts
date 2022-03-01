export interface ContextData {
  query: Record<string, string>;
  params: Record<string, unknown>;
}
export interface HttpContext<T extends ContextData = ContextData> {
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
) => {
  instruct: {
    method: HttpInstructMethod | HttpInstructMethod[];
    path?: string;
  };
  handler: (ctx: HttpContext<C>) => void;
};
