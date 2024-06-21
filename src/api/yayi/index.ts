import request from "@/utils/request";

/**
 * 获取雅意知识库token
 */
export function getKnowledgeId(data: any) {
  return request({
    url: "/base/yayi_knowledge/getKnowledgeId",
    method: "post",
    data,
  });
}
