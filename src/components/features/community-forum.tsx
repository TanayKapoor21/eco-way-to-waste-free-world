'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, PlusCircle } from 'lucide-react';
import { mockForumPosts, ForumPost } from '@/lib/mock-data';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

function NewPostDialog({onAddPost}: {onAddPost: (post: ForumPost) => void}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if(!title.trim() || !content.trim()) return;
        const newPost: ForumPost = {
            id: `post-${Date.now()}`,
            author: {
                name: 'You',
                avatarUrl: 'https://picsum.photos/seed/user-avatar/100/100',
                avatarHint: 'person profile',
            },
            title,
            content,
            timestamp: 'Just now',
            replies: 0,
        };
        onAddPost(newPost);
        setOpen(false);
        setTitle('');
        setContent('');
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a new post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Content
                        </Label>
                        <Textarea id="content" value={content} onChange={e => setContent(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Create Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function CommunityForum() {
  const [posts, setPosts] = useState<ForumPost[]>(mockForumPosts);

  const handleAddPost = (post: ForumPost) => {
    setPosts([post, ...posts]);
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Community Forum</h1>
            <p className="text-muted-foreground">Share tips, ideas, and initiatives with the community.</p>
        </div>
        <NewPostDialog onAddPost={handleAddPost} />
      </div>

      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="md:flex">
            {post.imageUrl && (
              <div className="md:w-1/3 md:flex-shrink-0">
                <div className="relative h-48 w-full md:h-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={post.imageHint}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col flex-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.avatarHint} />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <CardTitle className="pt-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="line-clamp-3">
                  {post.content}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.replies} replies</span>
                </div>
                <Button variant="ghost">Read More</Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
