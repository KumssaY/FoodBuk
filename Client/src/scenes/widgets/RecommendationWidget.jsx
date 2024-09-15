import { Typography, useTheme, Button } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";

const RecommendationWidget = () => {
  const navigate = useNavigate();
  
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
        <Typography color={dark} variant="h5" fontWeight="500">
          Today's Special
        </Typography>
      <img
        width="100%"
        height="auto"
        alt="recommendation"
        src="http://localhost:3001/assets/download.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Typography color={main}>Description</Typography>
      <Typography color={medium} m="0.5rem 0">
        Today's meal is the famous ugali we all love accoampanied by some beef stew and the classical sukuma week, with an optional dressing of cabagge. 
      </Typography>

      <Button
        fullWidth
        type="submit"
        onClick={() => navigate("/foodmenu")}
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
        >
          Go to Menu
        </Button>
    </WidgetWrapper>
  );
};

export default RecommendationWidget;
