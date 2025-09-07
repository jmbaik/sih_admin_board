"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// 로그온 실패 에러 화면
export default function ErrorPage() {
  return (
    <Card className="w-[500px] m-auto mt-20">
      <CardHeader>
        <CardTitle>로그인 실패</CardTitle>
        <CardDescription>
          아이디와 패스워드가 잘못된것 같습니다. 다시 시도해주세요.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Link href="/login" className="text-primary underline">
          로그인으로 돌아가기
        </Link>
      </CardFooter>
    </Card>
  );
}
