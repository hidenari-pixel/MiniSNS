import { useSelector } from "react-redux";
import { AppState } from "../modules/Reducers";

const useUsersInfomation = () => {
  const { users } = useSelector((state: AppState) => state);

  // userId の型なににすればええんや...
  const showName = (users: string[], userId: any) => {
    const name = users.map((item) => {
      if (Object.keys(item).includes(userId)) {
        return item[userId];
      }
    });
    return name;
  };

  return {
    users,
    showName,
  };
};

export default useUsersInfomation;
