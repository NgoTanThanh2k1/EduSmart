import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Grid,
  Chip,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Fade,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList,
  Clear,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Visibility,
  Star,
  TrendingUp,
  PriceCheck,
  School,
  Category,
} from "@mui/icons-material";
import CourseCard from "../components/CourseCard";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useViewHistory } from "../hooks/useViewHistory";
import ToastNotification from "../components/ToastNotification";
import LoadingSkeleton from "../components/LoadingSkeleton";
import apiCourse from "../apis/apiCourse";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showAll, setShowAll] = useState(false);

  const { addToCart } = useCart();
  const { isInFavorites, toggleFavorite } = useFavorites();
  const { addToHistory } = useViewHistory();

  // Load courses data
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const coursesRes = await apiCourse.get("/Course");
        setCourses(coursesRes.data);
        setFilteredCourses(coursesRes.data);
      } catch (error) {
        console.error("Error loading courses:", error);
        setToastMessage("Có lỗi xảy ra khi tải dữ liệu");
        setToastType("error");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query") || "";
    setSearchTerm(query);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...courses];

    // Search by name and description
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term) ||
          course.tags?.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (course) => course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "students":
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredCourses(filtered);
  }, [
    searchTerm,
    priceRange,
    selectedCategory,
    selectedLevel,
    sortBy,
    courses,
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setPriceRange([0, 5000000]);
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSortBy("relevance");
  };

  const handleViewDetail = (course) => {
    addToHistory(course);
    setSelectedCourse(course);
  };

  const handleAddToCart = (course) => {
    addToCart(course);
    setToastMessage(`${course.name} đã được thêm vào giỏ hàng!`);
    setToastType("success");
    setShowToast(true);
  };

  const handleFavorite = (course) => {
    toggleFavorite(course);
    const isFavorite = isInFavorites(course.id);
    setToastMessage(
      isFavorite
        ? `${course.name} đã được bỏ khỏi yêu thích`
        : `${course.name} đã được thêm vào yêu thích`
    );
    setToastType("info");
    setShowToast(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const categories = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "programming", label: "Lập trình" },
    { value: "design", label: "Thiết kế" },
    { value: "marketing", label: "Marketing" },
    { value: "business", label: "Kinh doanh" },
    { value: "language", label: "Ngoại ngữ" },
  ];

  const levels = [
    { value: "all", label: "Tất cả cấp độ" },
    { value: "beginner", label: "Cơ bản" },
    { value: "intermediate", label: "Trung cấp" },
    { value: "advanced", label: "Nâng cao" },
  ];

  const sortOptions = [
    { value: "relevance", label: "Liên quan nhất" },
    { value: "price-low", label: "Giá thấp đến cao" },
    { value: "price-high", label: "Giá cao đến thấp" },
    { value: "rating", label: "Đánh giá cao nhất" },
    { value: "students", label: "Nhiều học viên nhất" },
    { value: "newest", label: "Mới nhất" },
  ];

  const popularSearches = [
    "React",
    "JavaScript",
    "Python",
    "UI/UX Design",
    "Digital Marketing",
    "IELTS",
    "Node.js",
    "Data Science",
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: 6,
          px: 3,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 700,
              mb: 2,
              textAlign: "center",
            }}
          >
            🔍 Tìm Kiếm Khóa Học
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              mb: 4,
            }}
          >
            Khám phá hàng nghìn khóa học chất lượng cao
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm khóa học, giảng viên, hoặc chủ đề..."
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} size="small">
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "1.1rem",
                  py: 1,
                },
              }}
            />
          </Box>

          {/* Popular Searches */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
              Tìm kiếm phổ biến:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {popularSearches.map((term) => (
                <Chip
                  key={term}
                  label={term}
                  onClick={() => setSearchTerm(term)}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          mx: "auto",
          px: 3,
          py: 4,
          maxWidth: 1000,
        }}
      >
        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card sx={{ position: "sticky", top: 20 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center", // <-- chỉ cần dòng này ở đây!
                  }}
                >
                  {/* Price Range */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      <PriceCheck
                        sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                      />
                      Khoảng Giá
                    </Typography>
                    <Slider
                      value={priceRange}
                      onChange={(event, newValue) => setPriceRange(newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={5000000}
                      step={100000}
                      valueLabelFormat={(value) => formatPrice(value)}
                      sx={{ mt: 2, minWidth: 180, maxWidth: 220 }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {formatPrice(priceRange[0])}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatPrice(priceRange[1])}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Category Filter */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Level Filter */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      {levels.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Sort Options */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Clear Filters */}
                  <Button
                    variant="outlined"
                    onClick={handleClearSearch}
                    startIcon={<Clear />}
                  >
                    Xóa Bộ Lọc
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} sm={8} md={9} lg={9}>
            {/* Results Header */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Kết Quả Tìm Kiếm
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {filteredCourses.length} khóa học
                </Typography>
              </Box>

              {/* Search Summary */}
              {(searchTerm ||
                selectedCategory !== "all" ||
                selectedLevel !== "all") && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    Đang hiển thị kết quả cho:{" "}
                    {searchTerm && (
                      <Chip
                        label={`"${searchTerm}"`}
                        size="small"
                        sx={{ mx: 0.5 }}
                      />
                    )}
                    {selectedCategory !== "all" && (
                      <Chip
                        label={
                          categories.find((c) => c.value === selectedCategory)
                            ?.label
                        }
                        size="small"
                        sx={{ mx: 0.5 }}
                      />
                    )}
                    {selectedLevel !== "all" && (
                      <Chip
                        label={
                          levels.find((l) => l.value === selectedLevel)?.label
                        }
                        size="small"
                        sx={{ mx: 0.5 }}
                      />
                    )}
                  </Typography>
                </Alert>
              )}
            </Box>

            {/* Loading State */}
            {loading && <LoadingSkeleton count={6} variant="card" />}

            {/* No Results */}
            {!loading && filteredCourses.length === 0 && (
              <Fade in timeout={500}>
                <Card sx={{ p: 4, textAlign: "center" }}>
                  <SearchIcon
                    sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Không tìm thấy khóa học nào
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để có kết quả khác
                  </Typography>
                  <Button variant="contained" onClick={handleClearSearch}>
                    Xóa Bộ Lọc
                  </Button>
                </Card>
              </Fade>
            )}

            {/* Results Grid */}
            {!loading && filteredCourses.length > 0 && (
              <div>
                <Grid container spacing={3}>
                  {(showAll
                    ? filteredCourses
                    : filteredCourses.slice(0, 3)
                  ).map((course) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={course.id}
                      display="flex"
                      sx={{ width: "100%", height: "100%", maxWidth: "290px" }}
                    >
                      <CourseCard
                        course={course}
                        isSelected={selectedCourse?.id === course.id}
                        isFavorite={isInFavorites(course.id)}
                        onSelect={setSelectedCourse}
                        onAddToCart={() => handleAddToCart(course)}
                        onFavorite={() => handleFavorite(course)}
                        onShare={() => handleViewDetail(course)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}

            {/* Load More Button */}
            {!showAll && filteredCourses.length > 3 && (
              <div>
                <Box sx={{ textAlign: "center", mt: 4 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setShowAll(true)}
                  >
                    Xem Thêm Khóa Học
                  </Button>
                </Box>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>

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

export default Search;
