import React from "react";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { NextPage } from "next";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import * as S from "./style";

type Props = {
  username?: string;
  title: string;
};

const HeaderMenu: NextPage<Props> = (props: Props) => {
  const { username, title } = props;

  const AvatarShort = (text: string | undefined) => {
    if (text) {
      return text.substring(0, 2).toUpperCase();
    }
    return undefined;
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar variant="dense">
        <S.InitIcons>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="home"
          >
            <MoneyOffIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </S.InitIcons>
        <S.EndIcons>
          <Typography variant="subtitle1">{username || "Anonimous"}</Typography>
          <Avatar>{AvatarShort(username)}</Avatar>
        </S.EndIcons>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
