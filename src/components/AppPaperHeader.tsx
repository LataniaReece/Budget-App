import React, { FC } from "react";
import { SxProps, Theme, Typography } from "@mui/material";

interface AppPaperHeaderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const AppPaperHeader: FC<AppPaperHeaderProps> = (
  props: AppPaperHeaderProps
) => {
  return (
    <Typography
      {...props}
      sx={{
        ...props.sx,
        fontSize: 22,
        fontWeight: "bold",
      }}
    >
      {props.children}
    </Typography>
  );
};
