import React from "react";
import { Box, Card, CardContent, Skeleton, Grid } from "@mui/material";

const LoadingSkeleton = ({ count = 4, variant = "card" }) => {
  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full px-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} sx={{ height: 350, position: "relative" }}>
            <Skeleton
              variant="rectangular"
              height={150}
              sx={{ bgcolor: "grey.200" }}
            />
            <CardContent>
              <Skeleton
                variant="text"
                width="80%"
                height={24}
                sx={{ bgcolor: "grey.200", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="100%"
                height={16}
                sx={{ bgcolor: "grey.200", mb: 0.5 }}
              />
              <Skeleton
                variant="text"
                width="90%"
                height={16}
                sx={{ bgcolor: "grey.200", mb: 2 }}
              />
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={24}
                  sx={{ bgcolor: "grey.200", borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={24}
                  sx={{ bgcolor: "grey.200", borderRadius: 1 }}
                />
              </Box>
              <Skeleton
                variant="text"
                width="40%"
                height={20}
                sx={{ bgcolor: "grey.200", mb: 2 }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width="70%"
                  height={36}
                  sx={{ bgcolor: "grey.200", borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="25%"
                  height={36}
                  sx={{ bgcolor: "grey.200", borderRadius: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <Box sx={{ p: 2 }}>
        {Array.from({ length: count }).map((_, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Skeleton
              variant="rectangular"
              height={60}
              sx={{ bgcolor: "grey.200", borderRadius: 1 }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  return null;
};

export default LoadingSkeleton;
