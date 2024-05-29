import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { FileInfo } from "./types";

/**
 * 上传文件-多文件
 *
 * @param file
 */
export function uploadFileApi(file: File): AxiosPromise<FileInfo> {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/base/minio/batch/upload",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * 上传文件-单文件
 *
 * @param file
 */
export function singleuploadFileApi(file: File): AxiosPromise<FileInfo> {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/base/minio/upload",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}


/**
 * 下载
 *
 */
export function download(file: any): AxiosPromise<FileInfo> {
  return request({
    responseType: "blob",
    // url: "/base/minio/download",
    url: "/base/fpsp_report/download",
    method: "get",
    params: file,
  });
}

/**
 * 获取发票智能审批下载模版
 *
 */
export function templatedownload(file: any): any {
  return request({
    responseType: "blob",
    url: "base/fpsp_other_materials/getExcelTemplateDownloadInfo",
    method: "get",
    params: file,
  });
}

/**
 * 下载 ArrayBuffer
 *
 * @param file load
 */
export function downloadBuffer(file: any): AxiosPromise<FileInfo> {
  return request({
    responseType: "arraybuffer",
    url: "/base/minio/download",
    method: "get",
    params: file,
  });
}