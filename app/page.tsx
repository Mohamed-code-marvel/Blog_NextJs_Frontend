"use client";

import BlogCard from "components/Blogcard";
import Wrapper from "components/Wrapper";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ChevronsLeft, ChevronsRight, Search } from "lucide-react"; // Import the Search icon from lucide-react

interface Post {
  id?: string;
  img?: string;
  title?: string;
  content?: string;
}

const HomePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const itemsPerPage = 4; // Number of items per page
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await axiosAuth.get("/api/posts/");
      console.log(res);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().match(new RegExp(searchQuery.toLowerCase(), "i"))
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (!session) {
    router.push("/login");
  }

  return (
    <div className="w-full h-full pt-8">
      <Wrapper>
        {posts.length === 0 ? (
          <div>No blogs at the moment</div>
        ) : (
          <div className="flex flex-col w-full h-auto pt-4 gap-y-6 pb-10 min-h-dvh">
            <div className="mb-4 flex items-center">
              <Search className="mr-2" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPosts.map((post, key) => (
                <BlogCard post={post} key={key} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-auto">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded flex gap-x-1 items-center ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                <ChevronsLeft />
                {" "}
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded flex gap-x-1 items-center ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-slate-900 text-white py-2 px-4 rounded"
                }`}
              >
                Next
                {" "}
                <ChevronsRight />
              </button>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default HomePage;
