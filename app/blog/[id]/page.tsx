"use client";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import CommentForm from "components/CommentForm";
import { Button } from "components/ui/button";
import { MoreHorizontal } from "lucide-react";

type BlogPostProps = {
  params: {
    id: string;
  };
};

interface PostInterface {
  id?: string;
  img?: string;
  title?: string;
  content?: string;
  author?: string; // Add author field to Post interface
  comments?: CommentInterface[];
}

interface CommentInterface {
  id?: string;
  post?: string;
  author?: string;
  content?: string;
  created_at?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const [post, setPost] = useState<PostInterface | null>(null); // Initialize with null and correct type
  // const [comments, setComments] = useState<CommentInterface[]>([]);
  const axiosAuth = useAxiosAuth();
  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState<null | number>(null);
  const router = useRouter();

  // console.log(
  //   JSON.stringify(session) +
  //     "-----------------------------------session--BlogPage------------------------------------"
  // );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosAuth.get<PostInterface>(`/api/posts/${id}/`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
    // if (session) {
    //   fetchPost();
    //   fetchComments();
    //   // console.log(
    //   //   JSON.stringify(session) +
    //   //     "-----------------------------------session--BlogPage------------------------------------"
    //   // );
    // } else {
    //   // console.log(
    //   //   JSON.stringify(session) +
    //   //     "-----------------------------------No--session--BlogPage------------------------------------"
    //   // );
    //   router.push("/login");
    // }
  }, [session, axiosAuth, id, router]);

  const handleDelete = async (commentId?: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (userConfirmed) {
      try {
        const response = await axiosAuth.delete(`/api/comments/${commentId}/`);
        alert("Delete Successful");
      } catch (error: any) {
        console.error("Error deleting comment:", error?.message);
      }
    } else {
      console.log("User canceled the delete action");
    }
  };

  if (!session) {
    return null; // Return null while redirecting
  }

  // if (!post) {
  //   return notFound();
  // }

  const handleComment = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="w-full h-full min-h-dvh pt-8">
      <Wrapper>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-col">
            <div className="h-auto min-h-[400px] w-full relative backdrop-blur-xl bg-slate-200/80 py-4 px-0">
              <h1 className="absolute inset-0 grid place-content-center font-semibold text-3xl md:text-4xl lg:text-5xl px-8 text-center">
                {post?.title}
              </h1>
              <span className="absolute bottom-0 right-0 text-left text-sm text-slate-500">
                author:{post?.author}
              </span>
            </div>

            <div className="pl-4 pt-10 pb-6 text-left font-normal w-full overflow-hidden ">
              {post?.content}
            </div>
            <div className="py-4 pl-4 text-left flex flex-col items-start">
              <span
                className=" animate-pulse text-slate-700 text-lg cursor-pointer "
                onClick={handleComment}
              >
                Leave A comment
              </span>
              {showForm ? (
                <CommentForm
                  postId={Number(id)}
                  author={session?.user?.user?.username}
                />
              ) : null}
            </div>
            <div className=" flex  h-auto w-full overflow-hidden px-4 ">
              <div className="w-full overflow-x-scroll flex  gap-12 py-4 ">
                {" "}
                {post?.comments && post?.comments.length > 0
                  ? post?.comments.map((comment, key) => (
                      <div
                        key={key}
                        className="relative flex min-w-[320px] h-[200px] border border-slate-200 rounded-md p-4 overflow-hidden  "
                      >
                        <div className="w-full absolute inset-0 py-2 px-1 text-xs">
                          {comment?.content}
                        </div>
                        <span className="w-auto absolute bottom-0 right-0 text-xs   ">
                          ...{comment?.author}
                        </span>
                        {comment?.author === session?.user?.user?.username ? (
                          <div className="absolute top-0 right-0 p-1 w-auto h-auto flex">
                            <Button
                              variant="ghost"
                              className="cursor-pointer bg-white rounded-full w-12  h-12  hover:bg-slate-500 z-10 absolute top-0 right-0 grid place-content-center"
                              onMouseEnter={() => {
                                setShowOptions(key);
                              }}
                            >
                              <MoreHorizontal className="rotate-90" />
                            </Button>
                            {showOptions === key ? (
                              <div
                                onMouseLeave={() => {
                                  setShowOptions(null);
                                }}
                                className="grid place-content-center overflow-hidden gap-y-1 pl-2  bg-white border border-slate-400 py-4 pr-4 rounded-md absolute top-0 right-0 w-20 h-32"
                              >
                                <button
                                  onClick={() => {
                                    handleDelete(comment?.id);
                                  }}
                                  className=" text-left w-full text-red-300 hover:bg-gray-200 px-2"
                                >
                                  Delete
                                </button>{" "}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default BlogPost;
