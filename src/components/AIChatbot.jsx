import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Fade,
  Slide,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Send,
  SmartToy,
  Person,
  Close,
  ExpandMore,
  ExpandLess,
  Psychology,
} from "@mui/icons-material";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { items: cartItems } = useCart();
  const { items: favorites } = useFavorites();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses based on user input and context
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);

    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const lowerMessage = userMessage.toLowerCase();
    let response = "";

    // Analyze user preferences from context
    const hasCartItems = cartItems.length > 0;
    const hasFavorites = favorites.length > 0;

    if (
      lowerMessage.includes("tiếng anh") ||
      lowerMessage.includes("english")
    ) {
      response =
        "Tôi thấy bạn quan tâm đến tiếng Anh! Dựa trên sở thích của bạn, tôi gợi ý:\n\n" +
        "🎯 **Khóa học phù hợp:**\n" +
        "• Tiếng Anh giao tiếp cơ bản\n" +
        "• IELTS Speaking Masterclass\n" +
        "• Business English for Professionals\n\n" +
        "💡 **Lời khuyên:** Bắt đầu với khóa học giao tiếp cơ bản nếu bạn mới học, hoặc IELTS nếu bạn cần chứng chỉ.";
    } else if (
      lowerMessage.includes("lập trình") ||
      lowerMessage.includes("programming")
    ) {
      response =
        "Tuyệt vời! Lập trình là lĩnh vực rất hot hiện nay. Đây là gợi ý của tôi:\n\n" +
        "🚀 **Khóa học phù hợp:**\n" +
        "• JavaScript cơ bản đến nâng cao\n" +
        "• React.js cho người mới bắt đầu\n" +
        "• Python cho Data Science\n" +
        "• Node.js Backend Development\n\n" +
        "💡 **Lời khuyên:** Nếu bạn mới học, hãy bắt đầu với JavaScript hoặc Python.";
    } else if (lowerMessage.includes("giá") || lowerMessage.includes("price")) {
      response =
        "Về giá cả, chúng tôi có nhiều mức giá phù hợp:\n\n" +
        "💰 **Phân khúc giá:**\n" +
        "• Dưới 500k: Khóa học cơ bản\n" +
        "• 500k - 1M: Khóa học trung cấp\n" +
        "• 1M - 2M: Khóa học nâng cao\n" +
        "• Trên 2M: Khóa học chuyên sâu\n\n" +
        "💡 **Lời khuyên:** Bạn có thể thử khóa học miễn phí trước khi mua!";
    } else if (
      lowerMessage.includes("giỏ hàng") ||
      lowerMessage.includes("cart")
    ) {
      if (hasCartItems) {
        response =
          `Tôi thấy bạn có ${cartItems.length} khóa học trong giỏ hàng:\n\n` +
          cartItems.map((item) => `• ${item.name}`).join("\n") +
          "\n\n" +
          "💡 **Gợi ý:** Bạn có muốn tôi tìm thêm khóa học bổ sung không?";
      } else {
        response =
          "Giỏ hàng của bạn đang trống. Hãy để tôi gợi ý một số khóa học phổ biến:\n\n" +
          "🔥 **Khóa học hot:**\n" +
          "• React.js Masterclass\n" +
          "• IELTS 7.0+ Preparation\n" +
          "• Data Science Fundamentals\n" +
          "• Digital Marketing Complete";
      }
    } else if (
      lowerMessage.includes("yêu thích") ||
      lowerMessage.includes("favorite")
    ) {
      if (hasFavorites) {
        response =
          `Tôi thấy bạn có ${favorites.length} khóa học yêu thích. Dựa trên đó, tôi gợi ý:\n\n` +
          "🎯 **Khóa học tương tự:**\n" +
          "• Advanced JavaScript Patterns\n" +
          "• React Performance Optimization\n" +
          "• TypeScript Mastery\n\n" +
          "💡 **Lời khuyên:** Những khóa học này sẽ nâng cao kỹ năng của bạn!";
      } else {
        response =
          "Bạn chưa có khóa học yêu thích nào. Hãy khám phá và đánh dấu yêu thích những khóa học bạn quan tâm!";
      }
    } else {
      response =
        "Xin chào! Tôi là AI trợ lý của EduSmart. Tôi có thể giúp bạn:\n\n" +
        "🤖 **Tôi có thể:**\n" +
        "• Gợi ý khóa học phù hợp\n" +
        "• Tư vấn về lộ trình học\n" +
        "• Giải đáp thắc mắc về giá\n" +
        "• Phân tích sở thích của bạn\n\n" +
        "💡 **Hãy hỏi tôi:**\n" +
        '• "Tôi muốn học tiếng Anh"\n' +
        '• "Gợi ý khóa học lập trình"\n' +
        '• "Khóa học nào phù hợp với tôi?"';
    }

    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Generate AI response
    const aiResponse = await generateAIResponse(userMessage);

    const newAIMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newAIMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    "Gợi ý khóa học tiếng Anh",
    "Khóa học lập trình nào hot?",
    "Tư vấn về giá khóa học",
    "Khóa học phù hợp với tôi",
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Slide direction="up" in={!isOpen} timeout={300}>
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              width: 60,
              height: 60,
              backgroundColor: "primary.main",
              color: "white",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <SmartToy sx={{ fontSize: 28 }} />
          </IconButton>
        </Slide>
      </Box>

      {/* Chat Window */}
      <Slide direction="up" in={isOpen} timeout={300}>
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 400,
            height: 600,
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>
                <SmartToy />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  AI Trợ lý EduSmart
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {isTyping ? "Đang nhập..." : "Trực tuyến"}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{ color: "white" }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2,
              backgroundColor: "#f8f9fa",
            }}
          >
            {messages.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <SmartToy
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Xin chào! 👋
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Tôi là AI trợ lý, có thể giúp bạn tìm khóa học phù hợp
                </Typography>

                {/* Quick Suggestions */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {quickSuggestions.map((suggestion, index) => (
                    <Chip
                      key={index}
                      label={suggestion}
                      onClick={() => setInputValue(suggestion)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "primary.light",
                          color: "white",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {messages.map((message) => (
                  <Fade in key={message.id} timeout={300}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          message.sender === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "80%",
                          p: 2,
                          borderRadius: 2,
                          backgroundColor:
                            message.sender === "user"
                              ? "primary.main"
                              : "white",
                          color:
                            message.sender === "user"
                              ? "white"
                              : "text.primary",
                          boxShadow: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "pre-line",
                            lineHeight: 1.5,
                          }}
                        >
                          {message.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mt: 1,
                            opacity: 0.7,
                            textAlign: "right",
                          }}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                ))}

                {isTyping && (
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "white",
                        boxShadow: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "grey.400",
                            animation: "pulse 1.5s infinite",
                            "@keyframes pulse": {
                              "0%": { opacity: 1 },
                              "50%": { opacity: 0.3 },
                              "100%": { opacity: 1 },
                            },
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "grey.400",
                            animation: "pulse 1.5s infinite 0.2s",
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "grey.400",
                            animation: "pulse 1.5s infinite 0.4s",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              backgroundColor: "white",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  "&:disabled": {
                    backgroundColor: "grey.300",
                  },
                }}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Slide>
    </>
  );
};

export default AIChatbot;
