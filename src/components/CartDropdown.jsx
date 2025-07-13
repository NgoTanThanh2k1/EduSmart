import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Divider,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartDropdown = ({ open, onClose }) => {
  const {
    items,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleQuantityChange = (courseId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(courseId, newQuantity);
    }
  };

  const handleRemoveFromCart = (courseId, courseName) => {
    removeFromCart(courseId);
    setNotificationMessage(`${courseName} đã được xóa khỏi giỏ hàng!`);
    setShowNotification(true);
  };

  const handleClearCart = () => {
    clearCart();
    setNotificationMessage("Đã xóa tất cả sản phẩm khỏi giỏ hàng!");
    setShowNotification(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Giỏ hàng ({totalItems} sản phẩm)
        </Typography>
        {items.length > 0 && (
          <Button
            size="small"
            color="error"
            onClick={handleClearCart}
            sx={{ minWidth: "auto" }}
          >
            Xóa tất cả
          </Button>
        )}
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 4,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Giỏ hàng trống
            </Typography>
            <Typography variant="body2">
              Hãy thêm khóa học vào giỏ hàng để bắt đầu
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ px: 3, py: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 60,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {formatPrice(item.price)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: "fit-content",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ minWidth: 20, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveFromCart(item.id, item.name)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
                {index < items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>

      {items.length > 0 && (
        <>
          <Divider />
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Tổng cộng:</Typography>
              <Typography variant="h6" color="primary">
                {formatPrice(totalPrice)}
              </Typography>
            </Box>
            <DialogActions sx={{ p: 0 }}>
              <Button onClick={onClose} color="inherit">
                Tiếp tục mua sắm
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Xử lý thanh toán
                  console.log("Thanh toán:", items);
                  onClose();
                }}
              >
                Thanh toán
              </Button>
            </DialogActions>
          </Box>
        </>
      )}

      {/* Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default CartDropdown;
