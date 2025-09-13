"use client";

import { convToSupaPlaylist } from "@/actions/types/conv.supabase.types";
import { processPlaylistToVideosByChannelId } from "@/actions/youtube";
import { supaGetPlaylistIdByChannel, supaUpsertYoutubePlaylist } from "@/actions/youtube/supabase.yt.api";
import { fetchAllPlaylist } from "@/actions/youtube/youtube.api";
import useAdminUserStore from "@/app/store/admin.user.store";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const dirs: IBreadcrumItem[] = [
  {
    title: "Super Admin",
    href: "/#",
  },
];

export default function YoutubeApiTest() {
  const { adminUser } = useAdminUserStore();
  async function upsertPlaylistByChannel() {
    const channelId = "UCWgyCh92781HaX_ue0r8Vng";
    const playlists = await fetchAllPlaylist(channelId);
    if (adminUser) {
      const tb = convToSupaPlaylist(playlists, adminUser);
      console.log("playlists ::: ", playlists);
      console.log("tb list ::: ", tb);
      await supaUpsertYoutubePlaylist(tb);
    }
  }
  async function getPlaylistByChannel(channelId: string) {
    const playlists = await supaGetPlaylistIdByChannel(channelId);
    playlists?.map((item) => {
      console.log(item);
    });
  }

  async function processJob1(channelId: string) {
    if (adminUser) {
      console.log("start process job1 ");

      await processPlaylistToVideosByChannelId(channelId, adminUser);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <AppBreadcrumb dirs={dirs} current="유투브 테스트" className="mb-4" />
      <Card>
        <CardHeader>Youtube Video Scheme</CardHeader>
        <CardContent>
          <p className="text-wrap"></p>
        </CardContent>
      </Card>
      <div className="text-center text-red-300 underline"> Youtube Test </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Section</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={1}>
            <TableCell className="font-medium">playlist</TableCell>
            <TableCell>체널에서 플레이리스트 가져오기</TableCell>
            <TableCell className="text-right">
              <Button
                size={"sm"}
                onClick={() => {
                  upsertPlaylistByChannel();
                }}
              >
                실행
              </Button>
            </TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell className="font-medium">playlist item</TableCell>
            <TableCell>플레이리스트에서 item 리스트 가져오기</TableCell>
            <TableCell className="text-right">
              <Button
                size={"sm"}
                onClick={() => {
                  getPlaylistByChannel("UCWgyCh92781HaX_ue0r8Vng");
                }}
              >
                실행
              </Button>
            </TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell className="font-medium">process job 1</TableCell>
            <TableCell>채널 id기준으로 playlist/item video를 전부 Upsert 함</TableCell>
            <TableCell className="text-right">
              <Button
                size={"sm"}
                onClick={async () => {
                  await processJob1("UCXrHUng3QOT9g0JnIYUT7AQ");
                }}
              >
                실행
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
