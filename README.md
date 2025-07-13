# 🎓 EduSmart - Nền Tảng Học Tập Trực Tuyến

EduSmart là một ứng dụng web hiện đại được xây dựng bằng React, cung cấp trải nghiệm học tập trực tuyến với các khóa học lập trình, cuộc thi và tài liệu chia sẻ kiến thức.

## ✨ Tính Năng Chính

### 🛒 **Hệ Thống Giỏ Hàng**

- Thêm/xóa khóa học vào giỏ hàng
- Quản lý số lượng sản phẩm
- Tính tổng tiền tự động
- Lưu trữ dữ liệu trong localStorage

### ❤️ **Hệ Thống Yêu Thích**

- Đánh dấu khóa học yêu thích
- Trang yêu thích riêng biệt
- Đồng bộ dữ liệu với localStorage

### 📚 **Lịch Sử Xem**

- Theo dõi khóa học đã xem
- Hiển thị lịch sử gần đây
- Tự động cập nhật khi xem chi tiết

### 🤖 **AI Gợi Ý Thông Minh**

- Gợi ý khóa học dựa trên hành vi người dùng
- Phân tích giỏ hàng và yêu thích
- Loading skeleton và error handling
- Toast notifications

### 💬 **AI Chatbot Tư Vấn**

- Chatbot thông minh tư vấn khóa học
- Giao diện chat hiện đại
- Phân tích context người dùng
- Gợi ý nhanh

### 🔍 **Tìm Kiếm & Lọc**

- Tìm kiếm khóa học theo tên
- Lọc theo khoảng giá
- Giao diện responsive

### 📱 **Responsive Design**

- Tối ưu cho desktop, tablet, mobile
- Material-UI components
- Animations mượt mà

## 🚀 Cài Đặt & Chạy

### Yêu Cầu Hệ Thống

- Node.js (version 16 trở lên)
- npm hoặc yarn

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd EduSmart
```

### Bước 2: Cài Đặt Dependencies

```bash
npm install
```

### Bước 3: Chạy Ứng Dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Bước 4: Build Production

```bash
npm run build
```

## 🛠️ Công Nghệ Sử Dụng

### Frontend

- **React 18** - UI Framework
- **Vite** - Build tool
- **Material-UI** - Component library
- **Tailwind CSS** - Utility-first CSS

### State Management

- **React Context API** - Global state
- **useReducer** - Complex state logic
- **localStorage** - Data persistence

### API & Data

- **Axios** - HTTP client
- **Mock API** - Simulated backend

## 📁 Cấu Trúc Dự Án

```
src/
├── components/          # React components
│   ├── AIChatbot.jsx   # AI chatbot component
│   ├── AISuggestions.jsx # AI suggestions
│   ├── CourseCard.jsx  # Course card component
│   ├── LoadingSkeleton.jsx # Loading states
│   ├── Navbar.jsx      # Navigation bar
│   ├── SearchAndFilter.jsx # Search & filter
│   ├── ToastNotification.jsx # Toast messages
│   └── ...
├── contexts/           # React contexts
│   ├── CartContext.jsx # Cart state management
│   ├── FavoritesContext.jsx # Favorites state
│   └── ViewHistoryContext.jsx # View history
├── hooks/              # Custom hooks
│   ├── useCart.js      # Cart hook
│   ├── useFavorites.js # Favorites hook
│   └── useViewHistory.js # View history hook
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   └── Favorites.jsx   # Favorites page
├── apis/               # API configurations
└── utils/              # Utility functions
```

## 🎯 Tính Năng Nổi Bật

### 1. **AI-Powered Recommendations**

- Phân tích hành vi người dùng
- Gợi ý dựa trên giỏ hàng và yêu thích
- Context-aware suggestions

### 2. **Smart Chatbot**

- Tư vấn khóa học thông minh
- Phân tích từ khóa người dùng
- Giao diện chat hiện đại

### 3. **Advanced State Management**

- Context API cho global state
- useReducer cho complex logic
- localStorage persistence

### 4. **Modern UI/UX**

- Material-UI components
- Responsive design
- Smooth animations
- Loading states

## 🔧 Tùy Chỉnh

### Thay Đổi Theme

Chỉnh sửa file `src/theme.js`:

```javascript
export const theme = {
  primary: "#1976d2",
  secondary: "#dc004e",
  // ... other colors
};
```

### Thêm Khóa Học Mới

Cập nhật API endpoint trong `src/apis/apiCourse.js`:

```javascript
// Thêm khóa học mới
export const addCourse = (courseData) => {
  return apiCourse.post("/Course", courseData);
};
```

## 🐛 Troubleshooting

### Lỗi Thường Gặp

1. **Module not found**

   ```bash
   npm install
   ```

2. **Port already in use**

   ```bash
   # Thay đổi port trong vite.config.js
   export default defineConfig({
     server: { port: 3000 }
   })
   ```

3. **Build errors**
   ```bash
   npm run build --debug
   ```

## 📝 API Documentation

### Course API

- `GET /Course` - Lấy danh sách khóa học
- `POST /Course` - Thêm khóa học mới
- `PUT /Course/:id` - Cập nhật khóa học
- `DELETE /Course/:id` - Xóa khóa học

### User Course API

- `GET /UserCourse` - Lấy khóa học của user
- `POST /UserCourse` - Đăng ký khóa học

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License.

## 👥 Team

- **Frontend Developer** - React, Material-UI
- **UI/UX Designer** - Modern design, Responsive
- **Backend Integration** - API development

## 📞 Liên Hệ

- Email: contact@edusmart.com
- Website: https://edusmart.com
- GitHub: https://github.com/edusmart

---

**EduSmart** - Nền tảng học tập thông minh cho tương lai! 🚀
