"use client";

import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import useAdminUserStore from "../store/admin.user.store";

const PrivateLayout = ({
  children,
  sidebarState,
}: {
  children: ReactNode;
  sidebarState: string | null;
}) => {
  const { adminUser } = useAdminUserStore();

  if (!adminUser) {
    redirect("/login");
  }

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
