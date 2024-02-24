import { AddPhrase } from "@daily-phrase/api";
import { format } from "date-fns";
import { PhraseItemWithId } from "~/types/phrase";
import { ManageValues } from "../manage-drawer.meta";

export const getDrawerClientValues = (values: PhraseItemWithId) =>
  ({
    title: values.title,
    isReserved: values.isReserved,
    publishDate: values.publishDate ? values.publishDate : "",
    content: values.content,
    imageList: values.imageUrl
      ? [
          {
            src: values.imageUrl,
            radio: values.imageRatio,
            filename: values.filename,
          },
        ]
      : [],
  }) satisfies ManageValues;

export const getToBeSendValues = (values: ManageValues) =>
  ({
    title: values.title,
    content: values.content,
    imageUrl: values.imageList[0]?.src ?? "",
    imageRatio: values.imageList[0]?.radio ?? "",
    fileName: values.imageList[0]?.filename ?? "",
    fileSize: values.imageList[0]?.size ?? 0,
    isReserved: values.isReserved,
    publishDate:
      values.isReserved && values.publishDate
        ? format(values.publishDate, "yyyy-MM-dd")
        : "",
  }) satisfies AddPhrase;
