import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import users from "./users";
import posts from "./posts";
export default combineReducers({
  alert,
  auth,
  profile,
  users,
  posts,
});
