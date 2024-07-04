"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import CreateBlogForm from "../../../components/CreateBlogForm";

const Create = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!session) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="w-full h-full pt-8">
      <Wrapper>
        <div className="w-full h-auto">
          <CreateBlogForm />
        </div>
      </Wrapper>
    </div>
  );
};

export default Create;
