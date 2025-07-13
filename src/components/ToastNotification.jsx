import React from "react";

const ToastNotification = ({
  open,
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  console.log("🔔 ToastNotification props:", { open, message, type, duration });

  console.log("🔔 ToastNotification rendering with message:", message);

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
    console.log(
      "🔔 ToastNotification useEffect - open:",
      open,
      "duration:",
      duration
    );
    if (open && duration > 0) {
      console.log("🔔 Setting up auto-close timer");
      const timer = setTimeout(() => {
        console.log("🔔 Auto-close timer fired");
        onClose();
      }, duration);
      return () => {
        console.log("🔔 Clearing auto-close timer");
        clearTimeout(timer);
      };
    }
  }, [open, duration, onClose]);

  if (!open) {
    console.log("🔔 ToastNotification not open, returning null");
    return null;
  }

  console.log(
    "🔔 ToastNotification rendering actual toast with message:",
    message
  );

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
