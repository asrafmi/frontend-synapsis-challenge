'use client';
import { useGetCommentByPostId } from '@/frontend/hooks/comment';
import { useGetPostById } from '@/frontend/hooks/post';
import { useGetUserById } from '@/frontend/hooks/user';
import { Comment } from '@/types/comment';
import { Post } from '@/types/post';
import { User } from '@/types/user';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const DetailPost = () => {
  const pathname = usePathname();
  const splited = pathname.split('-');
  const id = splited[splited.length - 1];
  const { data: postData, isLoading: postLoading } = useGetPostById(
    parseInt(id)
  );
  const post: Post = postData?.data;

  // if (!post) {
  //   return;
  // }

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data: userData, isLoading: userLoading } = useGetUserById(
  //   parseInt(post.user_id)
  // );
  // const user: User = userData?.data;

  // if (!user) {
  //   return;
  // }

  // const { data: commentData, isLoading: commentLoading } =
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useGetCommentByPostId();

  // const comment: Comment = commentData?.data;

  const user = {
    id: 6302734,
    name: 'Asraf Mahajan',
    email: 'mahajan_asraf@grant-welch.test',
    gender: 'male',
    status: 'inactive',
  };

  const comments = [
    {
      id: 80624,
      post_id: 101594,
      name: 'Bankim Khanna',
      email: 'bankim_khanna@jenkins-metz.example',
      body: 'Esse quas ut. Modi aliquam blanditiis. Debitis deleniti quo. Et maxime similique.',
    },
    {
      id: 80623,
      post_id: 101594,
      name: 'Kalinda Pilla JD',
      email: 'jd_pilla_kalinda@anderson.example',
      body: 'Voluptates recusandae molestiae. Aspernatur enim ut.',
    },
  ];

  const commentsLoading = false;

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
          {comments && comments.length ? (
            <div className="flex flex-col gap-3">
              <h1 className="text-md font-bold tracking-tight text-gray-900">
                Comments
              </h1>
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
          ) : commentsLoading ? (
            <div></div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <h1 className="text-gray-900">gaada data cuy :(</h1>
      )}
    </main>
  );
};

export default DetailPost;
