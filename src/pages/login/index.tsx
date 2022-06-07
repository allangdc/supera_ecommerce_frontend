import React, { useState } from "react";
import { NextPage } from "next";
import { Button, Paper, TextField, Typography } from "@mui/material";
import * as S from "./_style";
import authService from "../../services/authService";
import { useRouter } from "next/router";
import useUserContext from "../../context/userContext/index";

const LoginScreen: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>();
  const router = useRouter();
  const { setMyUser } = useUserContext();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ret = await authService.login(username, password);
    if (!ret) {
      setErrMsg("Sem comunicação");
    } else if (ret.status === 401) {
      setErrMsg("Usuário ou senha incorreto");
    } else if (ret.status === 200) {
      setErrMsg(undefined);
      router.push("/");
      setMyUser({ username: username });
    } else {
      setErrMsg("Não é possível fazer login");
      console.log("Não é possível fazer login: ", ret.status);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <S.Container>
        <S.PaperDiv>
          <Typography variant="h6" align="center">
            Login
          </Typography>
          <TextField
            label="Usuário"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Senha"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errMsg && (
            <Typography variant="body1" align="center">
              {errMsg}
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </S.PaperDiv>
      </S.Container>
    </form>
  );
};

export default LoginScreen;
