import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useViewHistory } from "../hooks/useViewHistory";
import LoadingSkeleton from "./LoadingSkeleton";
import ToastNotification from "./ToastNotification";

const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const { items: cartItems, addToCart } = useCart();
  const { items: favorites, isInFavorites, toggleFavorite } = useFavorites();
  const { getRecentHistory } = useViewHistory();

  // Mock API call with advanced suggestions
  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get user context
      const recentHistory = getRecentHistory(3);
      const hasCartItems = cartItems.length > 0;
      const hasFavorites = favorites.length > 0;

      // Generate suggestions based on user behavior
      let mockSuggestions = [];

      // Base suggestions
      const baseSuggestions = [
        {
          id: "suggest-1",
          name: "React Advanced Patterns",
          description:
            "Học các pattern nâng cao trong React để tối ưu hiệu suất ứng dụng",
          price: 1200000,
          image:
            "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=React+Advanced",
          rating: 4.8,
          students: 1250,
          tags: ["React", "Advanced", "Performance"],
          reason: "Dựa trên khóa học React cơ bản bạn đã học",
        },
        {
          id: "suggest-2",
          name: "Node.js Backend Development",
          description:
            "Xây dựng API và backend services với Node.js và Express",
          price: 980000,
          image:
            "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Node.js+Backend",
          rating: 4.6,
          students: 890,
          tags: ["Node.js", "Backend", "API"],
          reason: "Phù hợp với frontend skills của bạn",
        },
        {
          id: "suggest-3",
          name: "TypeScript Mastery",
          description: "Làm chủ TypeScript để viết code an toàn và dễ bảo trì",
          price: 750000,
          image:
            "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=TypeScript",
          rating: 4.9,
          students: 2100,
          tags: ["TypeScript", "JavaScript", "Type Safety"],
          reason: "Nâng cao kỹ năng JavaScript của bạn",
        },
        {
          id: "suggest-4",
          name: "Database Design & SQL",
          description: "Thiết kế cơ sở dữ liệu và truy vấn SQL hiệu quả",
          price: 650000,
          image:
            "https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Database+SQL",
          rating: 4.7,
          students: 1560,
          tags: ["Database", "SQL", "Design"],
          reason: "Bổ sung kiến thức backend cho fullstack",
        },
      ];

      // Add context-based suggestions
      if (hasCartItems) {
        mockSuggestions.push({
          id: "suggest-cart-1",
          name: "Advanced JavaScript Concepts",
          description:
            "Khóa học nâng cao về JavaScript cho người đã có kiến thức cơ bản",
          price: 850000,
          image:
            "https://via.placeholder.com/300x200/FF5722/FFFFFF?text=JS+Advanced",
          rating: 4.7,
          students: 980,
          tags: ["JavaScript", "Advanced", "ES6+"],
          reason: "Bổ sung cho khóa học trong giỏ hàng của bạn",
        });
      }

      if (hasFavorites) {
        mockSuggestions.push({
          id: "suggest-fav-1",
          name: "Full-Stack Development Bootcamp",
          description: "Khóa học toàn diện về phát triển web full-stack",
          price: 1500000,
          image:
            "https://via.placeholder.com/300x200/607D8B/FFFFFF?text=Full+Stack",
          rating: 4.8,
          students: 2100,
          tags: ["Full-Stack", "Web Development", "Bootcamp"],
          reason: "Dựa trên khóa học yêu thích của bạn",
        });
      }

      if (recentHistory.length > 0) {
        mockSuggestions.push({
          id: "suggest-history-1",
          name: "Modern Web Development Tools",
          description: "Học sử dụng các công cụ hiện đại trong phát triển web",
          price: 550000,
          image:
            "https://via.placeholder.com/300x200/795548/FFFFFF?text=Dev+Tools",
          rating: 4.5,
          students: 750,
          tags: ["Tools", "Development", "Modern"],
          reason: "Dựa trên lịch sử xem của bạn",
        });
      }

      // Combine all suggestions
      mockSuggestions = [...baseSuggestions, ...mockSuggestions.slice(0, 2)];

      setSuggestions(mockSuggestions);
      setShowSuggestions(true);

      // Show success toast
      setToastMessage("Đã tìm thấy gợi ý phù hợp với bạn!");
      setToastType("success");
      setShowToast(true);
    } catch {
      setError("Không thể tải gợi ý. Vui lòng thử lại sau.");
      setToastMessage("Có lỗi xảy ra khi tải gợi ý");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSuggestions = () => {
    fetchSuggestions();
  };

  const handleAddToCart = (course) => {
    try {
      addToCart(course);
      setToastMessage(`${course.name} đã được thêm vào giỏ hàng!`);
      setToastType("success");
      setShowToast(true);
    } catch {
      setToastMessage("Có lỗi xảy ra khi thêm vào giỏ hàng");
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleFavorite = (course) => {
    try {
      // Kiểm tra trạng thái yêu thích trước khi thực hiện hành động
      const currentFavoriteStatus = isInFavorites(course.id);
      toggleFavorite(course);

      // Hiển thị thông báo dựa trên trạng thái trước đó
      const message = currentFavoriteStatus
        ? `${course.name} đã được bỏ khỏi yêu thích`
        : `${course.name} đã được thêm vào yêu thích`;

      setToastMessage(message);
      setToastType("info");
      setShowToast(true);
    } catch {
      setToastMessage("Có lỗi xảy ra khi cập nhật yêu thích");
      setToastType("error");
      setShowToast(true);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* AI Suggestions Button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<PsychologyIcon />}
          onClick={() => {
            handleGetSuggestions();
          }}
          disabled={loading}
          sx={{
            background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
            "&:hover": {
              background: "linear-gradient(45deg, #FF5252, #26A69A)",
            },
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
              Đang phân tích...
            </>
          ) : (
            "Gợi ý sản phẩm phù hợp"
          )}
        </Button>

        {showSuggestions && (
          <Typography variant="body2" color="text.secondary">
            Dựa trên hành vi học tập của bạn
          </Typography>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading Skeleton */}
      {loading && <LoadingSkeleton count={4} variant="card" />}

      {/* Suggestions Grid */}
      {showSuggestions && suggestions.length > 0 && !loading && (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mb: 3,
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            🎯 Gợi ý dành riêng cho bạn
            <Chip
              label={`${suggestions.length} khóa học`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full px-4">
            {suggestions.map((course) => (
              <div key={course.id}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.name}
                  />

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" gutterBottom noWrap>
                      {course.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {course.description}
                    </Typography>

                    {/* Tags */}
                    <Box sx={{ mb: 2 }}>
                      {course.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    {/* Rating */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <StarIcon
                        sx={{ color: "warning.main", fontSize: 16, mr: 0.5 }}
                      />
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        {course.rating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({course.students} học viên)
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      {formatPrice(course.price)}
                    </Typography>

                    {/* Reason */}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 2, fontStyle: "italic" }}
                    >
                      💡 {course.reason}
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(course)}
                        sx={{ flex: 1 }}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                      <Tooltip
                        title={
                          isInFavorites(course.id)
                            ? "Bỏ yêu thích"
                            : "Thêm yêu thích"
                        }
                      >
                        <IconButton
                          onClick={() => handleFavorite(course)}
                          color={isInFavorites(course.id) ? "error" : "default"}
                          size="small"
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Box>
      )}

      {/* Toast Notification */}
      <ToastNotification
        open={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </Box>
  );
};

export default AISuggestions;
