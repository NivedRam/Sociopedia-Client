import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget.jsx";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:8080/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("all post",response.data)
    // const data = await response.json();
    dispatch(setPosts({ posts: response.data }));
  };

  const getUserPosts = async () => {
    const response = axios.get(
      `http://localhost:8080/posts/${userId}/posts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response)
    // const data = await response.json();
    // dispatch(setPosts({ posts: response.data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); 
  //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
