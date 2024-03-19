'use client';
import Link from "next/link";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Skeleton } from 'primereact/skeleton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/_components/Header";
import RatingButton from "@/app/_components/RatingButton";
import LikeButton from "@/app/_components/LikeButton";
import CommentButton from "@/app/_components/CommentButton";
import MessageCard from "@/app/_components/MessageCard";
import VoicePlay from "@/app/_components/VoicePlay";
import CommentList from "@/app/_components/CommentList";
import { mPlus1, mPlus1Bold } from "@/app/_config/themeFontConfig";
import { dayjsConfig } from "@/app/_config/dayjsConfig";
import { useFetchCompliment } from "@/app/_hook/useFetchCompliment";
import { useRemoveMyCompliment } from "@/app/_hook/useRemoveMyCompliment";
import { useRedirectNoAuth } from "@/app/_hook/useRedirectNoAuth";

export default function MyComplimentCard({params}) {
  useRedirectNoAuth();
  const {compliments_id} = params;
  const compliment = useFetchCompliment(compliments_id);
  const removeMyCompliment = useRemoveMyCompliment(compliments_id);

  return (
    <>
      <Header />
      <BreadCrumb model={[{label: '投稿詳細'}]} home={{
        icon:<FontAwesomeIcon icon={faUser} className="h-[10px] text-slate-500 mr-1" />,
        label: '自分の投稿',
        url: '/mycompliments'
    }} className="flex text-sm bg-transparent border-none"/>
      <div className="text-center mx-5">

        <div className="flex justify-end items-center text-sm text-red-400">
          <div className="cursor-pointer" onClick={()=>removeMyCompliment(compliments_id)} >
            <i className="pi pi-trash text-red-400 pr-1" />削除
          </div>
        </div>
        {
          compliment.id ?
          <Card className=" bg-white bg-opacity-40 my-4 shadow-none">
            <div className="text-left flex flex-col gap-4">
              <div className="flex items-end gap-2">
                <div className="grow">
                  <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい人の名前</h5>
                  <div className={mPlus1.className}>
                    {compliment.to_name}
                  </div>
                </div>
                <div className="grow-0">
                  <div className={mPlus1.className}>
                    {compliment.to_category}
                  </div>
                </div>
              </div>
              <div>
                <h5 className={mPlus1Bold.className + " text-xs"}>ほめたい度</h5>
                <RatingButton readOnly={true} ratingValue={compliment.compliment_rating} />
              </div>
              <div>
                <h5 className={mPlus1Bold.className + " text-xs"}>その内容</h5>
                <div className={mPlus1.className}>
                  {compliment.body}
                </div>
              </div>
              <div>
                <h5 className={mPlus1Bold.className + " text-xs"}>思ったこと</h5>
                <div className={mPlus1.className}>
                  {compliment.thoughts}
                </div>
              </div>
              <div className="shrink flex items-center gap-2 flex-wrap overflow-visible">
                {
                  compliment.tags.map((tag, index) => {
                    return (
                      <Chip key={index} label={`#${tag}`} className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
                    );
                  })
                }
              </div>
              <div className="mx-auto flex justify-between items-center w-44">
                <LikeButton isLiked={true} countOfLikes={compliment.count_of_likes} />
                <CommentButton countOfComment={compliment.count_of_comments} />
              </div>

              <MessageCard />
              <div>
                <VoicePlay />
              </div>
            </div>
            <div className="text-right text-sm mt-5 text-slate-500">
              {dayjsConfig(compliment.created_at.toDate()).fromNow()}
            </div>
          </Card>
          : <Skeleton className="w-full" height="540px" />
        }

        <CommentList />
      </div>
      <div className="text-right p-1 mr-2 pb-2">
        <Link href="/mycompliments" className="text-sm hover:cursor-pointer">戻る</Link>
      </div>
    </>
  );
}
