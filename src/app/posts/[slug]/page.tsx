'use client';
import { useGetCommentByPostId } from '@/frontend/hooks/comment';
import { useGetPostById } from '@/frontend/hooks/post';
import { useGetUserById } from '@/frontend/hooks/user';
import { Comment } from '@/types/comment';
import { Post } from '@/types/post';
import { User } from '@/types/user';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailPost = () => {
  const pathname = usePathname();
  const splited = pathname.split('-');
  const id = splited[splited.length - 1];
  const [post, setPost] = useState({} as Post);
  const [user, setUser] = useState({} as User);
  const [comments, setComments] = useState<Comment[]>([]);
  const {
    data: postData,
    isLoading: postLoading,
    refetch: refetchPost,
  } = useGetPostById(parseInt(id));

  useEffect(() => {
    const fetchPost = async () => {
      await refetchPost();
      await setPost(postData?.data);
    };

    fetchPost();
  }, [postData?.data, refetchPost]);

  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserById(post?.user_id as any as number);

  const {
    data: commentData,
    isLoading: commentLoading,
    refetch: refetchComment,
  } = useGetCommentByPostId(post?.id as any as number);

  useEffect(() => {
    const fetchUser = async () => {
      await refetchUser();
      await setUser(userData?.data);
    };
    fetchUser();
  }, [postData?.data, refetchUser]);

  useEffect(() => {
    const fetchComments = async () => {
      await refetchComment();
      await setComments(commentData?.data);
    };
    fetchComments();
  }, [post, refetchComment]);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      {postLoading ? (
        <h1 className="text-gray-900">Loading...</h1>
      ) : post ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h1>
          <div className="flex flex-row items-center gap-2">
            <div className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
              <Image
                className="h-8 w-8 rounded-full"
                src="https://avatar.vercel.sh/3"
                height={32}
                width={32}
                alt={`${post.user_id}-avatar`}
              />
            </div>
            <div>
              <h1 className="text-md font-bold tracking-tight text-gray-900">
                {user && user.name ? user.name : 'Anonymous User'}
              </h1>
            </div>
          </div>
          <p className="text-sm text-gray-900">{post.body}</p>
          <hr className="h-px my-4 border-0 bg-gray-300"></hr>
          <h1 className="text-md font-bold tracking-tight text-gray-900">
            Comments
          </h1>
          {commentLoading ? (
            <h1 className="text-gray-900">Loading...</h1>
          ) : comments && comments.length ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex flex-row gap-1 items-center">
                      <div className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                        <Image
                          className="h-6 w-6 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${
                            comment.name.split(' ')[0]
                          }+${comment.name.split(' ')[1]}`}
                          height={32}
                          width={32}
                          alt={`${post.user_id}-avatar`}
                        />
                      </div>
                      <div>
                        <h1 className="text-sm text-gray-900">
                          {comment.name}
                        </h1>
                        <p className="text-xs text-gray-500">{comment.email}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-900 py-2">{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className="text-gray-900">gaada data komen cuy :(</h1>
          )}
        </div>
      ) : (
        <h1 className="text-gray-900">gaada data cuy :(</h1>
      )}
    </main>
  );
};

export default DetailPost;
