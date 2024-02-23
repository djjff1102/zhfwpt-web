/**
 * 操作日志 查询参数
 */
export interface OperatorQuery extends PageQuery {
  name?: string;
  role?: string;
  organization?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * 操作日志 分页对象
 */
export interface OperatorPageVO {
  id?: string;
  name?: string;
  operationDescription?: string;
  operationModule?: string;
  organization?: string;
  role?: string;
  updateDate?: string;
}
