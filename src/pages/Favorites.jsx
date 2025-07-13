import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Fade,
  Slide,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Clear,
  FilterList,
  Sort,
  DeleteSweep,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useFavorites } from "../hooks/useFavorites";
import CourseCard from "../components/CourseCard";

const Favorites = () => {
  const {
    items: favorites,
    clearFavorites,
    isInFavorites,
    toggleFavorite,
  } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((course) => {
      switch (priceFilter) {
        case "under500k":
          return course.price < 500000;
        case "500k-1m":
          return course.price >= 500000 && course.price <= 1000000;
        case "1m-2m":
          return course.price > 1000000 && course.price <= 2000000;
        case "over2m":
          return course.price > 2000000;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const handleFavorite = (course) => {
    toggleFavorite(course);
  };

  const handleViewDetail = (course) => {
    // Handle view detail - you can implement modal or navigation here
    console.log("View detail:", course);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleClearAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả khóa học yêu thích?")) {
      clearFavorites();
    }
  };

  if (favorites.length === 0) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 8,
          }}
        >
          <Fade in timeout={800}>
            <Box>
              <FavoriteIcon
                sx={{
                  fontSize: 120,
                  color: "text.secondary",
                  mb: 3,
                  opacity: 0.3,
                }}
              />
              <Typography
                variant="h3"
                gutterBottom
                color="text.secondary"
                sx={{ fontWeight: 300, mb: 2 }}
              >
                Chưa có khóa học yêu thích
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 300 }}
              >
                Hãy khám phá các khóa học và đánh dấu yêu thích để xem lại sau
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => window.navigateTo("/")}
                sx={{
                  background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #FF5252, #26A69A)",
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                }}
              >
                Khám phá khóa học
              </Button>
            </Box>
          </Fade>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Slide direction="down" in timeout={600}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <FavoriteIcon sx={{ fontSize: 40 }} />
              Khóa học yêu thích
              <Badge
                badgeContent={favorites.length}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "1rem",
                    height: 28,
                    minWidth: 28,
                  },
                }}
              />
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
              Quản lý và khám phá các khóa học bạn đã yêu thích
            </Typography>
          </Box>

          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              zIndex: 1,
            }}
          />
        </Paper>
      </Slide>

      {/* Search and Filter Section */}
      <Slide direction="up" in timeout={800}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm khóa học yêu thích..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <Tooltip title="Xóa tìm kiếm">
                        <IconButton
                          size="small"
                          onClick={() => setSearchTerm("")}
                        >
                          <Clear />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FilterList fontSize="small" />
                    Lọc theo giá
                  </Box>
                </InputLabel>
                <Select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FilterList fontSize="small" />
                      Lọc theo giá
                    </Box>
                  }
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value="all">Tất cả giá</MenuItem>
                  <MenuItem value="under500k">Dưới 500k</MenuItem>
                  <MenuItem value="500k-1m">500k - 1M</MenuItem>
                  <MenuItem value="1m-2m">1M - 2M</MenuItem>
                  <MenuItem value="over2m">Trên 2M</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Sort fontSize="small" />
                    Sắp xếp theo
                  </Box>
                </InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Sort fontSize="small" />
                      Sắp xếp theo
                    </Box>
                  }
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value="name">Tên khóa học</MenuItem>
                  <MenuItem value="price-low">Giá tăng dần</MenuItem>
                  <MenuItem value="price-high">Giá giảm dần</MenuItem>
                  <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Tooltip title="Xóa tất cả khóa học yêu thích">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearAll}
                  fullWidth
                  startIcon={<DeleteSweep />}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  Xóa tất cả
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </Slide>

      {/* Results count */}
      {filteredFavorites.length !== favorites.length && (
        <Fade in timeout={400}>
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontSize: "1rem",
              },
            }}
          >
            Hiển thị <strong>{filteredFavorites.length}</strong> trong tổng số{" "}
            <strong>{favorites.length}</strong> khóa học yêu thích
          </Alert>
        </Fade>
      )}

      {/* Favorites Grid using CourseCard component */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full px-4">
          {filteredFavorites.map((course, index) => (
            <Fade in timeout={600 + index * 100} key={course.id}>
              <div>
                <CourseCard
                  course={course}
                  isSelected={selectedCourse?.id === course.id}
                  isFavorite={isInFavorites(course.id)}
                  onSelect={handleSelectCourse}
                  onFavorite={() => handleFavorite(course)}
                  onShare={handleViewDetail}
                />
              </div>
            </Fade>
          ))}
        </div>
      ) : (
        <Fade in timeout={600}>
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Search
              sx={{
                fontSize: 80,
                color: "text.secondary",
                mb: 2,
                opacity: 0.5,
              }}
            />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Không tìm thấy khóa học phù hợp
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
              }}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Xóa bộ lọc
            </Button>
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default Favorites;
