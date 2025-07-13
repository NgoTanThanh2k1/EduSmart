import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Rating,
  Avatar,
  Divider,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCart } from "../hooks/useCart";

const ProductDetailModal = ({
  open,
  onClose,
  product,
  onFavorite,
  isFavorite,
}) => {
  const { addToCart, isInCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      comment:
        "Khóa học rất hay, giảng viên dạy dễ hiểu. Nội dung cập nhật và thực tế.",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 4,
      comment: "Tốt cho người mới bắt đầu. Cần thêm bài tập thực hành.",
      date: "2024-01-10",
    },
    {
      id: 3,
      user: "Lê Văn C",
      rating: 5,
      comment: "Hoàn hảo! Đã học xong và có thể làm việc ngay.",
      date: "2024-01-08",
    },
  ];

  // Mock curriculum
  const curriculum = [
    "Giới thiệu về React và các khái niệm cơ bản",
    "Components và Props trong React",
    "State và Lifecycle",
    "Event Handling",
    "Conditional Rendering",
    "Lists và Keys",
    "Forms và Controlled Components",
    "Lifting State Up",
    "Composition vs Inheritance",
    "Hooks cơ bản (useState, useEffect)",
    "Custom Hooks",
    "Context API",
    "Performance Optimization",
    "Testing với Jest và React Testing Library",
    "Deployment và Production Build",
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" component="div">
            Chi tiết khóa học
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Grid container>
            {/* Left Column - Image and Basic Info */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3 }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                  {product.name}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product.description}
                </Typography>

                {/* Rating and Students */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Rating value={4.5} precision={0.1} readOnly />
                  <Typography variant="body2">4.5 (1,234 đánh giá)</Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PeopleIcon color="action" />
                    <Typography variant="body2">1,234 học viên</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon color="action" />
                    <Typography variant="body2">15 giờ</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SchoolIcon color="action" />
                    <Typography variant="body2">Trung cấp</Typography>
                  </Box>
                </Box>

                {/* Tags */}
                <Box sx={{ mb: 3 }}>
                  {["React", "JavaScript", "Frontend", "Web Development"].map(
                    (tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        sx={{ mr: 1, mb: 1 }}
                        color="primary"
                        variant="outlined"
                      />
                    )
                  )}
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Price and Actions */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, bgcolor: "#f8f9fa", height: "100%" }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {formatPrice(product.price)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Một lần mua, học mãi mãi
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleAddToCart}
                      disabled={isInCart(product.id)}
                    >
                      {isInCart(product.id)
                        ? "Đã thêm vào giỏ hàng"
                        : "Thêm vào giỏ hàng"}
                    </Button>

                    <IconButton
                      onClick={() => onFavorite(product)}
                      color={isFavorite ? "error" : "default"}
                      size="large"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>

                  <Button variant="outlined" fullWidth size="large">
                    Xem trước khóa học
                  </Button>
                </Paper>

                {/* What you'll learn */}
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Bạn sẽ học được gì?
                  </Typography>
                  <List dense>
                    {[
                      "Hiểu rõ các khái niệm cơ bản của React",
                      "Xây dựng ứng dụng React hoàn chỉnh",
                      "Quản lý state và props hiệu quả",
                      "Sử dụng Hooks và Context API",
                      "Tối ưu hiệu suất ứng dụng",
                      "Testing và deployment",
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            </Grid>
          </Grid>

          {/* Curriculum Section */}
          <Box sx={{ p: 3, borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="h5" gutterBottom>
              Nội dung khóa học
            </Typography>
            <List>
              {curriculum.map((item, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Typography variant="body2" color="text.secondary">
                      {index + 1}
                    </Typography>
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Reviews Section */}
          <Box sx={{ p: 3, borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="h5" gutterBottom>
              Đánh giá từ học viên
            </Typography>
            <Grid container spacing={2}>
              {reviews.map((review) => (
                <Grid item xs={12} md={4} key={review.id}>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar sx={{ mr: 1 }}>{review.user[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {review.user}
                        </Typography>
                        <Rating value={review.rating} size="small" readOnly />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: "block" }}
                    >
                      {review.date}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: "1px solid #e0e0e0" }}>
          <Button onClick={onClose} color="inherit">
            Đóng
          </Button>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={isInCart(product.id)}
          >
            {isInCart(product.id)
              ? "Đã thêm vào giỏ hàng"
              : "Thêm vào giỏ hàng"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      {showNotification && (
        <Box
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            bgcolor: "success.main",
            color: "white",
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography>{product.name} đã được thêm vào giỏ hàng!</Typography>
        </Box>
      )}
    </>
  );
};

export default ProductDetailModal;
