export declare interface CloudContext {
  // 客户端ip信息
  CLIENTIP: string;
  // 客户端user-agent
  CLIENTUA: string;
  // 客户端传递的paltform请求头，mp-weixin/mp-qq/...
  PLATFORM: string;
  // 当前环境信息 {spaceId:'xxx',provider:'tencent'}
  SPACEINFO: string;
  userID?: string;
  token?: string;
}

// 调用explain框架的event，普通云函数的event就是传递的参数
export declare interface ExplainCloudEvent {
  service: string;
  action: string;
  data: unknown;
  headers: Record<string, string>;
}

export declare type CloudData = { event: ExplainCloudEvent; context: CloudContext; explain: unknown };
// 请求方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare type CloudRouter = {
  route: `api/${string}`;
  service: string;
  routes: {
    route?: string;
    action: string;
    httpMethod?: HttpMethod | HttpMethod[];
  }[];
};
