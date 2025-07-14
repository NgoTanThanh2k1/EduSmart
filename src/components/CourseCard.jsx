import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Visibility,
  Share,
} from "@mui/icons-material";
import { useViewHistory } from "../hooks/useViewHistory";

const CourseCard = ({
  course,
  isSelected,
  isFavorite,
  onSelect,
  onAddToCart,
  onFavorite,
  onShare,
  hideAddToCart = false,
  hideFavorite = false,
  customViewLabel = null,
}) => {
  const { addToHistory } = useViewHistory();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleViewDetail = () => {
    addToHistory(course); // Add to view history when viewing details
    onShare(course);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
        border: isSelected ? "2px solid #1976d2" : "1px solid #e0e0e0",
        overflow: "hidden", // ngăn ảnh lớn kéo giãn card
      }}
      onClick={() => onSelect(course)}
    >
      <Box
        sx={{
          width: "100%",
          height: 180,
          overflow: "hidden",
          borderRadius: "8px 8px 0 0",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={course.image || "https://via.placeholder.com/300x200"}
          alt={course.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2, // chỉ 2 dòng
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4,
            minHeight: "2.8em", // đảm bảo luôn đủ chỗ cho 2 dòng
          }}
        >
          {course.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {course.tags?.slice(0, 2).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem" }}
            />
          ))}
          {course.tags?.length > 2 && (
            <Chip
              label={`+${course.tags.length - 2}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem" }}
            />
          )}
        </Box>

        {/* Rating and Students */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                component="span"
                sx={{
                  color:
                    i < Math.floor(course.rating || 0) ? "#ffc107" : "#e0e0e0",
                  fontSize: "0.9rem",
                }}
              >
                ★
              </Box>
            ))}
            <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.8rem" }}>
              {course.rating || 0}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.8rem" }}
          >
            ({course.students || 0} học viên)
          </Typography>
        </Box>

        {/* Price */}
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          {formatPrice(course.price)}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
          {!hideAddToCart && (
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(course);
              }}
              sx={{
                flex: 1,
                fontSize: "0.8rem",
                py: 0.8,
              }}
            >
              Thêm vào giỏ
            </Button>
          )}

          {customViewLabel ? (
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetail();
              }}
              sx={{
                flex: 1,
                fontSize: "0.8rem",
                py: 0.8,
                backgroundColor: "#fb923c", // orange-500
                color: "white",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#f97316", // orange-600
                },
              }}
            >
              {customViewLabel}
            </Button>
          ) : (
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetail();
                }}
                size="small"
                sx={{
                  backgroundColor: "primary.light",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          )}

          {!hideFavorite && (
            <Tooltip title={isFavorite ? "Bỏ yêu thích" : "Thêm yêu thích"}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(course);
                }}
                color={isFavorite ? "error" : "default"}
                size="small"
                sx={{
                  backgroundColor: isFavorite ? "error.light" : "grey.100",
                  "&:hover": {
                    backgroundColor: isFavorite ? "error.main" : "grey.200",
                    color: "white",
                  },
                }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
