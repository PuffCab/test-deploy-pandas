import { User } from "../@types/CustomTypes";

function checkUserStatus(user: User | null) {
  const isLogged = user ? true : false;
  return isLogged;
}

export default checkUserStatus;
