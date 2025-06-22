// mui
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// react
import type { FC } from "react";

const Loading: FC = () => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.modal + 1 })}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
