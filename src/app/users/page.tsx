import AppBreadcrumb from "@/components/AppBreadcrumb";

const breadcrumbs: IBreadcrumItem[] = [
  {
    title: "Super Admin",
    href: "/#",
  },
];

const UsersPage = () => {
  return (
    <div>
      <AppBreadcrumb dirs={breadcrumbs} current="회원 관리" />
    </div>
  );
};

export default UsersPage;
