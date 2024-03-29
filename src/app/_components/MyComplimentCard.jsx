"use client";
import { Card } from "primereact/card";
import RatingButton from "@/app/_components/RatingButton";
import LikeButton from "@/app/_components/LikeButton";
import CommentButton from "@/app/_components/CommentButton";
import { mPlus1, mPlus1Bold } from "@/app/_config/themeFontConfig";
import { dayjsConfig } from "@/app/_config/dayjsConfig";
import Tags from "@/app/_components/Tags";
import Link from "next/link";

export default function MyComplimentCard({ myComplimentInfo }) {
  return (
    <Link href={`/mycompliments/${myComplimentInfo.id}`} className="z-0">
      <Card className=" bg-white bg-opacity-40 my-4 shadow-none">
        <div className="text-left flex flex-col gap-4">
          <div className="flex items-end gap-2">
            <div className="grow">
              <h5 className={mPlus1Bold.className + " text-xs"}>
                ほめたい人の名前
              </h5>
              <div className={mPlus1.className}>{myComplimentInfo.to_name}</div>
            </div>
            <div className="grow-0">
              <div className={mPlus1.className}>
                {myComplimentInfo.to_category}
              </div>
            </div>
          </div>
          <div>
            <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい度</h5>
            <RatingButton
              readOnly={true}
              ratingValue={myComplimentInfo.compliment_rating}
            />
          </div>
          <div>
            <h5 className={mPlus1Bold.className + " text-xs"}>その内容</h5>
            <div className={mPlus1.className}>{myComplimentInfo.body}</div>
          </div>
          <div>
            <h5 className={mPlus1Bold.className + " text-xs"}>思ったこと</h5>
            <div className={mPlus1.className}>{myComplimentInfo.thoughts}</div>
          </div>
          <Tags readonly={true} tags={myComplimentInfo.tags} />
          <div className="mx-auto flex justify-between items-center w-44">
            <LikeButton
              isLiked={myComplimentInfo.isLiked}
              countOfLikes={myComplimentInfo.count_of_likes}
              complimentId={myComplimentInfo.id}
            />
            <CommentButton
              countOfComment={myComplimentInfo.count_of_comments}
              complimentRoute={`/mycompliments/${myComplimentInfo.id}`}
            />
          </div>
        </div>
        <div className="text-right text-sm mt-5 text-slate-500">
          <span suppressHydrationWarning={true}>
            {dayjsConfig(myComplimentInfo.created_at.toDate()).fromNow()}
          </span>
        </div>
        <div className="text-right text-sm mt-5 text-sky-500">詳細へ</div>
      </Card>
    </Link>
  );
}
