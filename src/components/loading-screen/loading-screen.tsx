import Box from "../design-system/Box/Box";
import LinearProgress from "../design-system/LinearProgress/LinearProgress";

export default function LoadingScreen() {
  return (
    <Box className="px-5 w-full flex-grow min-h-full flex items-center justify-center">
      <LinearProgress className="w-full max-w-xs" />
    </Box>
  );
}
