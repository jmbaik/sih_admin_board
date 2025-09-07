"use client";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dirs: IBreadcrumItem[] = [
  {
    title: "Super Admin",
    href: "/#",
  },
];

const CompIndexPage = () => {
  return (
    <div>
      <AppBreadcrumb dirs={dirs} current={"컴포넌트 테스트"} />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Component Test</CardTitle>
          <CardDescription>Component Test section part</CardDescription>
          <CardAction>Action sector</CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of Component result.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Component Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">fetchChannel</TableCell>
                <TableCell>tb_yt_channel</TableCell>
                <TableCell className="text-right">
                  <Button variant={"outline"} size={"sm"} className="m-0">
                    바로 가기
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="w=[300px]">
            <p className="overflow-wrap-break-word"></p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompIndexPage;
