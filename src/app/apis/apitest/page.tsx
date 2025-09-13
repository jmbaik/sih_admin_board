"use client";
import { IYoutubeChannel, supaFetchYoutubeChannel } from "@/actions/youtube/supabase.yt.api";
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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { arraySplit50 } from "@/utils/common.utils";
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
  const testArr = [
    "<p>1</p>",
    "<p>2</p>",
    "<p>3</p>",
    "<p>4</p>",
    "<p>5</p>",
    "<p>6</p>",
    "<p>7</p>",
    "<p>8</p>",
    "<p>9</p>",
    "<p>10</p>",
    "<p>11</p>",
    "<p>12</p>",
    "<p>13</p>",
    "<p>14</p>",
    "<p>15</p>",
    "<p>16</p>",
    "<p>17</p>",
    "<p>18</p>",
    "<p>19</p>",
    "<p>20</p>",
    "<p>21</p>",
    "<p>22</p>",
    "<p>23</p>",
    "<p>24</p>",
    "<p>25</p>",
    "<p>26</p>",
    "<p>27</p>",
    "<p>28</p>",
    "<p>29</p>",
    "<p>30</p>",
    "<p>31</p>",
    "<p>32</p>",
    "<p>33</p>",
    "<p>34</p>",
    "<p>35</p>",
    "<p>36</p>",
    "<p>37</p>",
    "<p>38</p>",
    "<p>39</p>",
    "<p>40</p>",
    "<p>41</p>",
    "<p>42</p>",
    "<p>43</p>",
    "<p>44</p>",
    "<p>45</p>",
    "<p>46</p>",
    "<p>47</p>",
    "<p>48</p>",
    "<p>49</p>",
    "<p>50</p>",
    "<p>51</p>",
    "<p>52</p>",
    "<p>53</p>",
    "<p>54</p>",
    "<p>55</p>",
    "<p>56</p>",
    "<p>57</p>",
    "<p>58</p>",
    "<p>59</p>",
    "<p>60</p>",
  ];

  console.log(arraySplit50(testArr));

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
                      const result: IResponse<IYoutubeChannel> = await supaFetchYoutubeChannel();
                      let tmp = "";
                      result.data?.map((item: { title: string }) => {
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
