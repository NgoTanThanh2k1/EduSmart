import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  TrendingUp,
  PriceCheck,
} from "@mui/icons-material";

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  onFilter,
  onClear,
  onSearch,
}) => {
  const [priceFilter, setPriceFilter] = useState("all");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        window.navigateTo("/search");
      }
    }
  };

  const handlePriceFilterChange = (event) => {
    const value = event.target.value;
    setPriceFilter(value);
    onFilter(value);
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setPriceFilter("all");
    onClear();
  };

  const priceOptions = [
    { value: "all", label: "Tất cả giá" },
    { value: "under500k", label: "Dưới 500k" },
    { value: "500k-1m", label: "500k - 1M" },
    { value: "1m-2m", label: "1M - 2M" },
    { value: "over2m", label: "Trên 2M" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        p: 3,
        mb: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Search sx={{ fontSize: 28 }} />
        Tìm Kiếm & Lọc
      </Typography>

      <form onSubmit={handleSearchSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          {/* Search Input */}
          <TextField
            placeholder="Tìm kiếm khóa học, giảng viên, hoặc chủ đề..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
            sx={{ minWidth: 300, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setSearchTerm("")}
                    size="small"
                    edge="end"
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Search Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={!searchTerm.trim()}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              background: "linear-gradient(45deg, #2196F3, #21CBF3)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976D2, #00BCD4)",
              },
            }}
          >
            Tìm Kiếm
          </Button>
        </Box>
      </form>

      {/* Filters */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList sx={{ color: "primary.main" }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Bộ lọc:
          </Typography>
        </Box>

        {/* Price Filter */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            displayEmpty
            sx={{ borderRadius: 2 }}
          >
            {priceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PriceCheck sx={{ fontSize: 16 }} />
                  {option.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clear Filters */}
        {(searchTerm || priceFilter !== "all") && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleClearAll}
            startIcon={<Clear />}
            sx={{ borderRadius: 2 }}
          >
            Xóa bộ lọc
          </Button>
        )}
      </Box>

      {/* Active Filters Display */}
      {(searchTerm || priceFilter !== "all") && (
        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Bộ lọc đang áp dụng:
          </Typography>
          {searchTerm && (
            <Chip
              label={`Tìm kiếm: "${searchTerm}"`}
              size="small"
              color="primary"
              variant="outlined"
              onDelete={() => setSearchTerm("")}
            />
          )}
          {priceFilter !== "all" && (
            <Chip
              label={
                priceOptions.find((opt) => opt.value === priceFilter)?.label
              }
              size="small"
              color="secondary"
              variant="outlined"
              onDelete={() => {
                setPriceFilter("all");
                onFilter("all");
              }}
            />
          )}
        </Box>
      )}

      {/* Quick Search Suggestions */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          Tìm kiếm phổ biến:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {["React", "JavaScript", "Python", "UI/UX", "Marketing"].map(
            (term) => (
              <Chip
                key={term}
                label={term}
                size="small"
                variant="outlined"
                onClick={() => {
                  setSearchTerm(term);
                  window.navigateTo("/search");
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "white",
                  },
                }}
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchAndFilter;
