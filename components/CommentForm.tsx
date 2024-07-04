import React, { useState, ChangeEvent, FormEvent } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";

interface CommentFormData {
  content: string;
}

interface CommentFormProps {
  postId: number;
  author: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, author }) => {
  const [formData, setFormData] = useState<CommentFormData>({ content: "" });
  const [error, setError] = useState<string | null>(null);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosAuth.post(`/api/comments/`, {
        ...formData,
        author,
        post: postId,
      });

      alert("Comment submitted successfully");
      setFormData({
        content: "",
      });
      router.push(`/blog/${postId}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-auto min-w-[340px] ">
      <div>
        <Label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Comment
        </Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Leave a comment..."
          rows={6}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-slate-900 text-white py-2 px-4 rounded"
      >
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
