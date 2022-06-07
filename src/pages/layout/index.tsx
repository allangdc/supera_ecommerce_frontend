import { NextPage } from "next";
import React from "react";
import HeaderMenu from "../../components/headerMenu";
import useUserContext from "../../context/userContext";

type Props = {
  children: React.ReactNode;
};

const Layout: NextPage<Props> = (props: Props) => {
  const { children } = props;
  const { myUser } = useUserContext();

  return (
    <div>
      <header>
        <HeaderMenu title={"E-Commerce"} username={myUser?.username} />
      </header>
      {children}
    </div>
  );
};

export default Layout;
