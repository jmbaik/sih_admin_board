"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import PrivateLayout from "./privateLayout";
import PublicLayout from "./publicLayout";

const AdminAppLayout = ({
  children,
  sidebarState,
}: {
  children: ReactNode;
  sidebarState: string | null;
}) => {
  const pathName = usePathname();
  /* 로그인 영역 -> public
    이외 -> private 영역 */
  console.log("pathname ::: ", pathName);

  const isPublic =
    pathName.startsWith("/login") ||
    pathName.startsWith("/signup") ||
    pathName === "/error";
  if (isPublic) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  return <PrivateLayout sidebarState={sidebarState}>{children}</PrivateLayout>;
};

export default AdminAppLayout;
