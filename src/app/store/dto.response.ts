export interface IResponse {
  success: "fail" | "success";
  message: string;
  data?: any;
  count?: number | null;
}
