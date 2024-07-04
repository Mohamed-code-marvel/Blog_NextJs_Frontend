"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

type Post = {
  id?: string;
  title?: string;
  img?: string;
  content?: string;
};

const BlogCard = ({ post }: { post: Post }) => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const { id, title, img, content } = post;
  const handleEdit = () => {
    router.push(`/blog/edit/${id}`);
  };

  const handleView = () => {
    router.push(`/blog/${id}`);
  };

  const  handleDelete = async ()=>{
      try {
        const response = await axiosAuth.delete(`/api/posts/${id}`);
        alert("Delete Successfull")
      } catch (error:any) {
        console.log(error?.message)
      }
  }
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <Card className="relative w-full gap-y-8 h-auto min-h-[320px] overflow-hidden">
      <CardHeader className="w-full h-auto">
        <div className="flex w-full justify-between items-center relative">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Button
            variant="ghost"
            className="cursor-pointer z-10"
            onClick={handleShow}
          >
            <MoreHorizontal className="rotate-90" />
          </Button>
          {show ? (
            <div className="flex flex-col gap-y-1 border-l border-b border-slate-300  pt-8 pb-12 pl-2  items-start bg-white  py-4 pr-4 rounded-md absolute top-0 right-0 w-32 h-32">
              <button
                onClick={handleEdit}
                className=" text-left w-full hover:bg-gray-200 px-2"
              >
                Edit
              </button>
              <button
                onClick={handleView}
                className=" text-left w-full hover:bg-gray-200 px-2"
              >
                View
              </button>
              <button
                onClick={handleDelete}
                className=" text-left w-full text-red-300 hover:bg-gray-200 px-2"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {/* <img
          src={img}
          alt={title}
          className="w-full h-40 object-cover mb-4 rounded-md"
        /> */}
        <p className="font-light text-sm text-left ">{content?.slice(0, 300)}...</p>
      </CardContent>
      {/* <CardFooter>
        <Button onClick={handleView} variant="primary">Read More</Button>
      </CardFooter> */}
    </Card>
  );
};

export default BlogCard;
