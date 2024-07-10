import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from "@components/Button";

function List() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">정보 공유</h2>
      </div>
      <div className="flex justify-end mr-4">
        <Button onClick={() => navigate(`/info/new`)}>글작성</Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">조회수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">댓글수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={post.id} // 여기에서 고유한 키를 사용
                className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                onClick={() => navigate(`/info/${post.id}`)}
              >
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 truncate indent-4 cursor-pointer">{post.title}</td>
                <td className="p-2 text-center truncate">{post.author}</td>
                <td className="p-2 text-center hidden sm:table-cell">{post.views}</td>
                <td className="p-2 text-center hidden sm:table-cell">{post.comments}</td>
                <td className="p-2 truncate text-center hidden sm:table-cell">{post.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
      </section>
    </main>
  );
}

export default List;
