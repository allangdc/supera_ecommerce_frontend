/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import userService, { IUserInfo } from "../../services/userService";

type Props = {
  children: React.ReactNode;
};

interface IUserCtx {
  myUser: IUserInfo | undefined;
  setMyUser: React.Dispatch<React.SetStateAction<IUserInfo | undefined>>;
}

const initUserCtx: IUserCtx = {
  myUser: undefined,
  setMyUser: () => {},
};
const UserCtx = React.createContext<IUserCtx>(initUserCtx);

export const UserContextProvider: NextPage<Props> = (props: Props) => {
  const { children } = props;
  const [myUser, setMyUser] = useState<IUserInfo>();

  const userContext = useMemo(
    () => ({
      myUser,
      setMyUser,
    }),
    [myUser]
  );
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const ret = await userService.getUser();
      if (ret?.status === 200 && ret.data.length > 0) {
        const usr: IUserInfo = ret.data[0];
        if (!myUser || myUser.username !== usr.username) {
          setMyUser(usr);
        }
        console.log(usr);
      } else {
        if (myUser) {
          setMyUser(undefined);
        }
        console.log(ret?.data);
        router.push("/login");
      }
    };

    if (!myUser) {
      getUser();
    }
  }, [myUser]);

  return <UserCtx.Provider value={userContext}>{children}</UserCtx.Provider>;
};

const useUserContext = () => {
  // get the context
  const context = useContext(UserCtx);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export default useUserContext;
