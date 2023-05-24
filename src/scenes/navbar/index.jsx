import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,

} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  // NotificationsActiveIcon,
  Help,
  Menu,
  Close,

} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode, setLogout } from "../../state";
import FlexBetween from "../../components/FLexBetween";

// import { useTheme } from '@mui/material/styles';
const Navbar = () => {
  const theme = useTheme();
  // const theme = useTheme();
  const isNotMobileScreens = useMediaQuery(theme.breakpoints.up('sm'));
  // console.log(matches);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // const isNotMobileScreens =useMediaQuery(sm);
  // const [isNotMobileScreens,setIsNotMobileScreens]=useState(useMediaQuery("min-width:1000px"))

  const neutralLight = theme.palette.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullName = `${user?.firstName}${user?.lastName}`;
  console.log("isNotMobileScreens",isNotMobileScreens);
  console.log(useMediaQuery("min-width:1000px"))

  // useEffect(()=>{
  //   setIsNotMobileScreens(true)
  // },[])

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1em,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNotMobileScreens && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9x" gap="3rem" padding="0.1rem  1.5rem">
            <InputBase placeholder="search..."/>
            <IconButton>
              <Search/>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/*DESK NAV */}    
      {isNotMobileScreens ? (
      
      <FlexBetween gap="2rem">
          <IconButton onClick={()=>dispatch(setMode())}>
            {theme.palette.mode==="dark"?(
              <DarkMode sx={{fontSize:"25px"}}/>
            ):(
              <LightMode sx={{color:dark, fontSize:"25px"}}/>
            )}
          </IconButton>
          <Message sx={{fontSize:"25px"}}/>
          {/* <NotificationsActiveIcon sx={{fontSize:"25px"}}/> */}
          <Help sx={{fontSize:"25px"}}/>
          <FormControl variant="standard" value={fullName}>
          <Select 
          value={fullName}
          sx={{
            backgroundColor:neutralLight,
            width:"150px",
            borderRadius:"0.25rem",
            p:"0.25rem 1rem",
            "& .MuiSvgIcon-root:":{
              pr:"0.25rem",
              width:"3rem"
            },
            "& .MuiSelect-select:focus":{
              backgroundColor:theme.neutralLight
            }

          }}
          input={<InputBase/>}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={()=>dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
          </FormControl>
      </FlexBetween>):(
      <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
        <Menu/>
      </IconButton>
      )}
      {/*MOBILE VIEW*/}
      {!isNotMobileScreens && isMobileMenuToggled && (
        <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        backgroundColor={background}
        >
          {/*CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton  onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)} >
              <Close/>
            </IconButton>
          </Box>
          {/*MENU ITEMS */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
          <IconButton sx={{fontSize:"25px"}} onClick={()=>dispatch(setMode())}>
            {theme.palette.mode==="dark"?(
              <DarkMode sx={{fontSize:"25px"}}/>
            ):(
              <LightMode sx={{color:dark, fontSize:"25px"}}/>
            )}
          </IconButton>
          <Message sx={{fontSize:"25px"}}/>
          {/* <NotificationsActiveIcon sx={{fontSize:"25px"}}/> */}
          <Help sx={{fontSize:"25px"}}/>
          <FormControl variant="standard" value={fullName}>
          <Select 
          value={fullName}
          sx={{
            backgroundColor:neutralLight,
            width:"150px",
            borderRadius:"0.25rem",
            p:"0.25rem 1rem",
            "& .MuiSvgIcon-root:":{
              pr:"0.25rem",
              width:"3rem"
            },
            "& .MuiSelect-select:focus":{
              backgroundColor:neutralLight
            }

          }}
          input={<InputBase/>}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={()=>dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
          </FormControl>
      </FlexBetween>
          
        </Box>
      )}
    </FlexBetween>
  );

 
};
export default Navbar;