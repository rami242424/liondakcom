import Button from "@components/Button";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentList from "@pages/community/CommentList";

function Detail() {
  const navigate = useNavigate();
  const { type, _id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find((p) => p.id === Number(_id));
    setPost(post);
  }, [_id]);

  const handleDelete = () => {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter((p) => p.id !== Number(_id));
    
    // 글 번호 재조정
    posts = posts.map((p, index) => ({ ...p, id: index + 1 }));
    localStorage.setItem("posts", JSON.stringify(posts));
    
    navigate(`/${type}`);
};

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 : {post.title}</div>
        <div className="text-right text-gray-400">작성자 : {post.author}</div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{post.content}</pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => navigate(-1)}>목록</Button>
          <Button bgColor="gray" onClick={() => navigate(`/${type}/${_id}/edit`)}>수정</Button>
          <Button bgColor="red" onClick={handleDelete}>삭제</Button>
        </div>
      </section>
      <CommentList postId={Number(_id)} /> {/* 댓글 리스트 추가 */}
    </main>
  );
}

export default Detail;
