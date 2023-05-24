import {
  ChatBubbleOutlineOutlined,
  CommentsDisabled,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box,Divider,IconButton,Typography,useTheme } from "@mui/material";
import FlexBetween from "../../components/FLexBetween";
import Friend from ".././../components/Friend"
import widgetWrapper from ".././../components/WidgetWrapper"
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setPost } from "../../state";
import axios from "axios";
import WidgetWrapper from ".././../components/WidgetWrapper";

// likes={
//   "userid1":true,
//   "userid2":true  
// }

const PostWidget= ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,

})=>{
  const [isComents,setIsComents]=useState(false);
  const {palette}=useTheme();
  const dispatch=useDispatch();
  const token = useSelector((state)=>state.token);
  const loggedInUserId= useSelector((state)=>state.user._id);
  console.log("loggedInUserId",loggedInUserId)
  
  const isLiked=(Boolean(likes[loggedInUserId]));
  // const isLiked = likes.hasOwnProperty(loggedInUserId);
  console.log("isliked",isLiked)
  const likeCount =Object.keys(likes).length;


  const main=palette.neutral.main;
  const primary=palette.primary.main;

  const patchLike =async()=>{
    const response = await axios.patch(`http://localhost:8080/posts/like/${postId}`, {loggedInUserId},{
   headers: { 
    Authorization: `Bearer ${token}`,
     "content-Type": "application/json"
    },
    // body:JSON.stringify({userId:loggedInUserId})
    });
    console.log(response.data )
    // const updatedPost = await response.json();

    dispatch(setPost({post:response.data})); 
    // const getPosts = async () => {
    //   const newpost = await axios.get("http://localhost:8080/posts", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   console.log("all post",newpost.data)
    //   // const data = await response.json();
    //   dispatch(setPosts({ posts: newpost.data }));
    // // };
     
  };
  return(
    <WidgetWrapper m="2rem 0">
    <Box>
    <WidgetWrapper m="2rem 0">
      <Friend
      friendId={postUserId}
      name={name}
      subtitle={location}
      userPicturePath={userPicturePath}
      />

      <Typography color={main} sx={{mt:"1rem"}}>
        {description}
      </Typography>
      {picturePath &&(
        <img
        width="100%"
        height="auto"
        alt="post"
        style={{borderRadius:"0.75rem", marginTop:"0.75rem"}}
        src={`/Assets/${picturePath}`}

        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{color:primary}}/>
              ):(
                <FavoriteBorderOutlined/>
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
         <FlexBetween gap="0.3rem">
          <IconButton onClick={()=>setIsComents(!setIsComents)} >
            <ChatBubbleOutlineOutlined/>

          </IconButton>
          <Typography>{comments.length}</Typography>
         </FlexBetween>

        </FlexBetween>

        <IconButton>
          <ShareOutlined/>
          </IconButton>
      </FlexBetween>
      {isComents && (
        <Box
        mt="0.5rem"
        >
          {comments.map((Comment,i)=>(
            <Box key={`${name}-${i}`}>

              <Divider/>
              <Typography sx={{color: main ,m:"0.5rem 0", pl:"1rem"}}>
                {Comment}
              </Typography>
              </Box>
          ))}
          <Divider/>
        </Box>
      )}
    </WidgetWrapper>
    </Box>
    </WidgetWrapper>
  )
 
}
export default PostWidget;