"use client";

import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

import { ReactNode } from "react";

const PrivateLayout = ({
  children,
  sidebarState,
}: {
  children: ReactNode;
  sidebarState: string | null;
}) => {
  /* adminUser 상태가 없으면 login 으로 리다이렉트 사용하면 항상 리프레시 그러므로 주석 처리 */
  // const { adminUser } = useAdminUserStore();
  // if (!adminUser) {
  //   redirect("/login");
  // }

  const defaultOpen =
    sidebarState === "true" || sidebarState === null ? true : false;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <div className="px-4">{children}</div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default PrivateLayout;
