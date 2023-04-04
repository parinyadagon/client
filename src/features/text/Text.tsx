import React from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchText, textSelector } from "@/features/text/textSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type Props = {};

export default function ComponentText({}: Props) {
  const dispatch = useAppDispatch();
  const textStore = useAppSelector(textSelector);

  const [text, setText] = React.useState<string>("");

  const handlerInputTextField: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setText(event.target.value);
  };

  const handleClickSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(fetchText(text));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div>ComponentText</div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          width: "100vw",
        }}>
        <div>
          <TextField
            variant="outlined"
            onChange={handlerInputTextField}></TextField>
        </div>
        <div>
          <Button variant="contained" onClick={handleClickSubmit}>
            Submit
          </Button>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div>{textStore}</div>
      </Box>
    </>
  );
}
