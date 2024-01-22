import React from "react";
import { PhraseItem } from "~/types/phrase";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Props {
  data?: Array<PhraseItem>;
}

export const ManageTable = ({ data }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full flex items-center justify-between">
          <TableHead>작성일자</TableHead>
          <TableHead>타이틀</TableHead>
          <TableHead>이미지</TableHead>
          <TableHead>텍스트</TableHead>
          <TableHead>조회수</TableHead>
          <TableHead>좋아요수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!data?.length ? (
          <span>현재 작성 된 글이 없습니다.</span>
        ) : (
          data.map(
            ({ createdAt, title, imageUrl, content, viewCount, likeCount }) => {
              const key = createdAt + title + imageUrl + content + viewCount;
              likeCount;
              return (
                <TableRow
                  key={key}
                  className="w-full flex items-center justify-center"
                >
                  <Checkbox />
                  <TableCell>{new Date(createdAt).getDate()}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{imageUrl}</TableCell>
                  <TableCell>{content}</TableCell>
                  <TableCell>{viewCount}</TableCell>
                  <TableCell>{likeCount}</TableCell>
                </TableRow>
              );
            },
          )
        )}
      </TableBody>
    </Table>
  );
};
