import React from "react";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { NextPage } from "next";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import * as S from "./style";

const HeaderMenu: NextPage = () => {
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
          <Typography variant="h6">E-Commerce</Typography>
        </S.InitIcons>
        <S.EndIcons>
          <Typography variant="subtitle1">Username</Typography>
          <Avatar />
        </S.EndIcons>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
