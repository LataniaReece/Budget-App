import React, { FC } from "react";
import { Paper, SxProps, Theme } from "@mui/material";
import { AppMeasurements } from "../theme";

interface AppPaperProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const AppPaper: FC<AppPaperProps> = (props: AppPaperProps) => {
  return (
    <Paper
      {...props}
      sx={{
        mb: 4,
        py: {
          xs: AppMeasurements.paddingSmall,
          md: AppMeasurements.paddingLarge,
        },
        px: {
          xs: AppMeasurements.paddingSmall,
          md: AppMeasurements.paddingLarge,
        },
        borderRadius: AppMeasurements.radiusLarge,
        boxShadow: AppMeasurements.boxShadow,
        ...props.sx,
      }}
    >
      {props.children}
    </Paper>
  );
};
