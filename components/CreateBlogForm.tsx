"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useSession } from "next-auth/react";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

interface BlogFormData {
  author: string;
  img: File | null;
  title: string;
  content: string;
}

const CreateBlogForm: React.FC = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<BlogFormData>({
    author:session?.user?.user?.username || "",
    img: null,
    title: "",
    content: "",
  });

  const [error, setError] = useState<string | null>(null);
  const axiosAuth = useAxiosAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;
    if (name === "img" && files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("author", formData.author);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      if (formData.img) {
        formDataToSend.append("img", formData.img);
      }

      const response = await axiosAuth.post("/api/posts/", formDataToSend);

      alert("Blog created successfully");
      setFormData({
        author: session?.user?.user?.username || "",
        img: null,
        title: "",
        content: "",
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </Label>
        <Input
          id="author"
          type="text"
          name="author"
          value={formData.author}
          // onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* <div>
        <Label htmlFor="img" className="block text-sm font-medium text-gray-700">
          Image Upload
        </Label>
        <Input
          id="img"
          type="file"
          name="img"
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div> */}
      <div>
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <Label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </Label>
        <Textarea
          id="content"
          name="content"
          rows={12}
          value={formData.content}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
  
      <button
        type="submit"
        className="bg-slate-900 text-white py-2 px-4 rounded"
      >
         Create Blog
      </button>
    </form>
  );
};

export default CreateBlogForm;
