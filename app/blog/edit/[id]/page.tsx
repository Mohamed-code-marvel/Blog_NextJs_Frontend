"use client";
import Wrapper from "../../../../components/Wrapper";
import EditBlogForm from "../../../../components/EditBlogForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useAxiosAuth from "../../../../lib/hooks/useAxiosAuth";

interface Post {
  id?: string;
  author?: string;
  img?: File | null; // Updated to accept File object
  title?: string;
  content?: string;

}
type BlogPostProps = {
  params: {
    id: string;
  };
};

const EditBlog: React.FC<BlogPostProps> = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null); // Initialize with null and correct type
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = params;
        if (!id) throw new Error("Post ID is missing"); // Handle missing ID more gracefully
        const fetchedPost = await axiosAuth.get<Post>(`/api/posts/${id}/`);
        setPost(fetchedPost.data);
        // setPost({
        //   title: "newjjj",
        //   content: "This are my content",
        //   author: "3",
        // });
      } catch (error) {
        console.error("Error fetching post:", error);
        // Redirect to 404 or handle error state
        // router.push("/404");
      }
    };

    if (status === "authenticated") {
      fetchPost();
    }
  }, [router, status, axiosAuth]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    // Redirect to login page or handle unauthorized access
    router.push("/login");
    return null;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="w-full h-full min-h-dvh pt-8">
      <Wrapper>
        <div className="h-auto w-full">
          <EditBlogForm blog={post} />
        </div>
      </Wrapper>
    </div>
  );
};

export default EditBlog;
