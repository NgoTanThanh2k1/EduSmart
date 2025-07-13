import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  Search,
  Menu as MenuIcon,
  Home,
  School,
  ExitToApp,
  Settings,
  Person,
} from "@mui/icons-material";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import CartDropdown from "./CartDropdown";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: favorites } = useFavorites();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      window.navigateTo("/search");
      setSearchTerm("");
      setSearchAnchorEl(null);
    }
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    window.navigateTo(path);
    setMobileOpen(false);
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const searchId = "search-menu";

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", color: "text.primary" }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              mr: 4,
              fontWeight: 700,
              color: "primary.main",
              cursor: "pointer",
            }}
            onClick={() => handleNavigation("/")}
          >
            EduSmart
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/")}
              sx={{ mr: 2 }}
            >
              Trang chủ
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/search")}
              sx={{ mr: 2 }}
            >
              Tìm kiếm
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/favorites")}
              sx={{ mr: 2 }}
            >
              Yêu thích
            </Button>
          </Box>

          {/* Search Icon */}
          <IconButton
            size="large"
            aria-label="search"
            aria-controls={searchId}
            aria-haspopup="true"
            onClick={handleSearchClick}
            color="inherit"
            sx={{ mr: 1 }}
          >
            <Search />
          </IconButton>

          {/* Cart Icon */}
          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            onClick={handleCartClick}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Favorites Icon */}
          <IconButton
            size="large"
            aria-label="show favorites"
            color="inherit"
            onClick={() => handleNavigation("/favorites")}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={favorites.length} color="error">
              <Favorite />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              <Person />
            </Avatar>
          </IconButton>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileDrawerToggle}
            sx={{ ml: 1, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Search Menu */}
      <Menu
        anchorEl={searchAnchorEl}
        id={searchId}
        keepMounted
        open={Boolean(searchAnchorEl)}
        onClose={handleSearchClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 300,
            p: 2,
          },
        }}
      >
        <form onSubmit={handleSearchSubmit}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!searchTerm.trim()}
          >
            Tìm Kiếm
          </Button>
        </form>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Hồ sơ
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            EduSmart
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem onClick={() => handleNavigation("/")}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
          </ListItem>
          <ListItem onClick={() => handleNavigation("/search")}>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Tìm kiếm" />
          </ListItem>
          <ListItem onClick={() => handleNavigation("/favorites")}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="Yêu thích" />
          </ListItem>
          <ListItem onClick={handleCartClick}>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Giỏ hàng" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Hồ sơ" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Cài đặt" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItem>
        </List>
      </Drawer>

      {/* Cart Dropdown */}
      <CartDropdown open={cartOpen} onClose={handleCartClose} />
    </>
  );
};

export default Navbar;
