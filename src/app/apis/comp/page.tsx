"use client";
import {
  IYoutubeChannel,
  supaFetchYoutubeChannel,
} from "@/actions/youtube.video";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import SihDataTable from "@/components/data-table/SihDataTable";
import SihSpinner from "@/components/data-table/SihSpinner";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const dirs: IBreadcrumItem[] = [
  {
    title: "Super Admin",
    href: "/#",
  },
];

type TestType = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const paymentData: TestType[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

const youtubeChannelColumns: ColumnDef<IYoutubeChannel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => (
      <Button size={"sm"} variant={"outline"} asChild>
        <a href={row.getValue("url")} target="_blank" rel="noopener noreferrer">
          바로 가기
        </a>
      </Button>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const CompIndexPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [channelData, setChannelData] = React.useState<IYoutubeChannel[]>([]);
  const pathName = usePathname();

  const fetchChannelData = async () => {
    try {
      setLoading(true);
      const response: any = await supaFetchYoutubeChannel();
      console.log("supaFetchYoutubeChannel data : ", response.data);

      if (response.success) {
        toast.success(response.message);
        setChannelData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("supaFetchYoutubeChannel error invoked");
    } finally {
      setLoading(false);
    }
  };

  // if (response.success !== "success") {
  //   return (
  //     <>
  //       <AppBreadcrumb dirs={dirs} current={"컴포넌트 테스트"} />
  //       <div className="flex items-center justify-center min-h-screen w-full">
  //         <p className="text-xl">
  //           에러가 발생하였으므로 관리자에게 문의바랍니다.
  //         </p>
  //       </div>
  //     </>
  //   );
  // }

  React.useEffect(() => {
    fetchChannelData();
  }, [pathName]);

  return (
    <div>
      <AppBreadcrumb dirs={dirs} current={"컴포넌트 테스트"} />
      {loading && <SihSpinner height={150} />}
      {!loading && channelData.length > 0 && (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>SIH Data Table Test</CardTitle>
            <CardDescription>Component Test section part</CardDescription>
            <CardAction>Action sector</CardAction>
          </CardHeader>
          <CardContent>
            <SihDataTable
              data={channelData}
              columns={youtubeChannelColumns}
              initialFilterCol="title"
            />
          </CardContent>
          <CardFooter>
            <div className="w=[300px]">
              <p className="overflow-wrap-break-word"></p>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CompIndexPage;
