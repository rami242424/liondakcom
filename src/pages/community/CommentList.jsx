import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@components/Button";
import CommentNew from "@pages/community/CommentNew";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const postComments = storedComments.filter((comment) => comment.postId === postId);
    setComments(postComments);
  }, [postId]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleDelete = (id) => {
    let storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    storedComments = storedComments.filter((comment) => comment.id !== id);
    localStorage.setItem("comments", JSON.stringify(storedComments));
    setComments(storedComments.filter((comment) => comment.postId === postId));
  };

  const handleEdit = (id, content) => {
    setEditingCommentId(id);
    setEditingCommentContent(content);
  };

  const handleSave = (id) => {
    let storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    storedComments = storedComments.map((comment) =>
      comment.id === id ? { ...comment, content: editingCommentContent } : comment
    );
    localStorage.setItem("comments", JSON.stringify(storedComments));
    setComments(storedComments.filter((comment) => comment.postId === postId));
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {comments.length}개</h4>
      
      {comments.map((comment) => (
        <div key={comment.id} className="shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <img
              className="w-8 mr-2 rounded-full"
              src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
              alt="프로필 이미지"
            />
            <Link to="" className="text-orange-400">{comment.author}</Link>
            <time className="ml-auto text-gray-500" dateTime={comment.createdAt}>{comment.createdAt}</time>
          </div>
          {editingCommentId === comment.id ? (
            <div className="mb-4">
              <textarea
                rows="3"
                cols="40"
                className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={editingCommentContent}
                onChange={(e) => setEditingCommentContent(e.target.value)}
              ></textarea>
              <Button size="sm" onClick={() => handleSave(comment.id)}>저장</Button>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-2">
              <pre className="whitespace-pre-wrap text-sm">{comment.content}</pre>
              <div>
                <Button size="sm" onClick={() => handleEdit(comment.id, comment.content)}>수정</Button>
                <Button bgColor="red" size="sm" onClick={() => handleDelete(comment.id)}>삭제</Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <CommentNew postId={postId} onAddComment={handleAddComment} />
    </section>
  );
}

export default CommentList;
