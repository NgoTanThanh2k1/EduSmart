import React from "react";

const ToastNotification = ({
  open,
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#4caf50";
      case "error":
        return "#f44336";
      case "warning":
        return "#ff9800";
      case "info":
        return "#2196f3";
      default:
        return "#4caf50";
    }
  };

  // Auto close after duration
  React.useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, duration, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 20,
        backgroundColor: getBackgroundColor(),
        color: "white",
        padding: "16px",
        borderRadius: "4px",
        minWidth: "300px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 10000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {type === "success"
              ? "Thành công!"
              : type === "error"
              ? "Có lỗi xảy ra!"
              : type === "warning"
              ? "Cảnh báo!"
              : type === "info"
              ? "Thông tin"
              : "Thông báo"}
          </div>
          <div>{message}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
