"use client"
import { useRouter } from 'next/navigation'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";

type ClientBlogCardProps = {
  post: {
    id: string;
    img: string;
    title: string;
    content: string;
  };
};

const ClientBlogCard: React.FC<ClientBlogCardProps> = ({ post }) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <Card
      onClick={() => handleCardClick(post.id)}
      className="cursor-pointer"
    >
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <img src={post.img} alt={post.title} className="w-full h-40 object-cover mb-4 rounded-md" /> */}
        <p>{post.content.slice(0, 100)}...</p>
      </CardContent>
    </Card>
  );
};

export default ClientBlogCard;
