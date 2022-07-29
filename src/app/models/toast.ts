import { ToastType } from "../shared/constants";

export interface Toast {
  type: ToastType;
  title: string;
  body: string;
  delay: number;
}
