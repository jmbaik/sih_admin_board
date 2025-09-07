"use client";
import { fetchChannel } from "@/actions/youtube.video";
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
import { useState } from "react";
import { IResponse } from "../../store/dto.response";

const dirs: IBreadcrumItem[] = [
  {
    title: "Super Admin",
    href: "/#",
  },
];

const ApisPage = () => {
  const [apiResult, setApiResult] = useState("");

  return (
    <div>
      <AppBreadcrumb dirs={dirs} current="Apis 관리" className="mb-4" />
      <Card className="">
        <CardHeader>
          <CardTitle>API Test</CardTitle>
          <CardDescription>API Test section part</CardDescription>
          <CardAction>Action sector</CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of api result.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Api Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">fetchChannel</TableCell>
                <TableCell>tb_yt_channel</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="m-0"
                    onClick={async () => {
                      const result: IResponse = await fetchChannel();
                      let tmp = "";
                      result.data.map((item: { title: string }) => {
                        tmp += `${item.title}\n`;
                      });
                      tmp += " count:" + result.count;
                      setApiResult(tmp);
                    }}
                  >
                    실행
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="w=[300px]">
            <p className="overflow-wrap-break-word">{apiResult}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApisPage;
