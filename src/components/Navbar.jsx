import * as React from "react";

import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";

import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Box, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Check from "@mui/icons-material/Check";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // ← trạng thái bật/tắt menu

  // Tự động đóng menu khi chuyển sang desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div className="content-wrapper Kalar max-w-screen-2xl text-base mx-auto px-8">
      <div className="p-6 mx-auto">
        <nav className="flex flex-row justify-between items-center relative">
          <div className="logo uppercase basis-1/6 text-center text-xl font-semibold cursor-pointer">
            edusmart.
          </div>

          {/* Menu cho desktop + mobile */}
          <ul
            id="ct-top-menu"
            className={`basis-4/6 lg:flex h-full lg:items-center lg:justify-end lg:gap-8  text-sm text-gray-500 font-medium ${
              menuOpen ? "ct-topmenu-expanded" : "hidden lg:flex"
            }`}
          >
            <li className="ct-top-menu-item">
              <a href="#">Học tập</a>
            </li>
            <li className="ct-top-menu-item">
              <a href="#">Luyện tập</a>
            </li>
            <li className="ct-top-menu-item">
              <a href="#">Thi đấu</a>
            </li>
            <li className="ct-top-menu-item">
              <a href="#">Thử thách</a>
            </li>
            <li className="ct-top-menu-item">
              <a href="#">Sự kiện</a>
            </li>
            <li className="ct-top-menu-item">
              <a href="#">Xếp hạng</a>
            </li>
            <li className="ct-top-menu-item">
              <a href="#">Người đóng góp</a>
            </li>
            <li className="ct-top-menu-item ">
              <a href="#">Chia sẻ</a>
            </li>
          </ul>
          <div className="basis-1/6 flex  justify-end gap-4">
            {" "}
            {/* Icon Cart */}
            <div className="flex items-center ml-auto gap-4">
              {/* Icon giỏ hàng */}
              <ul className="flex items-center">
                <li className="ct-top-menu-item">
                  <a href="#" className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="ct-icon"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                      1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 
                      0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 
                      5.513 7.5h12.974c.576 0 1.059.435 1.119 
                      1.007ZM8.625 10.5a.375.375 0 1 1-.75 
                      0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 
                      0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <span className="ct-badge-circle bg-orange-400 text-white">
                      10
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Avatar menu */}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ display: "inline-block", cursor: "pointer" }}
              aria-controls={open ? "basic-menu-recent" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              tabIndex={0}
            >
              <Tooltip title="Tài khoản">
                <span style={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccountCircleIcon sx={{ color: "gray", fontSize: 30 }} />
                  <ExpandMoreIcon sx={{ color: "gray", fontSize: 20 }} />
                </span>
              </Tooltip>
              <Menu
                id="basic-menu-recent"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMouseLeave}
                slotProps={{
                  paper: {
                    sx: {
                      zIndex: 2000,
                      "& .MuiMenuItem-root": {
                        fontSize: 10,
                        fontWeight: 500,
                      },
                    },
                  },
                  list: {
                    "aria-labelledby": "basic-button-recent",
                  },
                }}
              >
                <MenuItem>
                  <ListItemText>Thông tin tài khoản</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Hồ sơ của tôi</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Bạn bè</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Lớp của tôi</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Quản lý thanh toán</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Thoát</ListItemText>
                </MenuItem>
              </Menu>
            </div>
            {/* Icon toggle cho mobile */}
            <div
              className="basis-1/6 lg:hidden flex items-center cursor-pointer px-3 sm:px-8"
              onClick={toggleMenu}
            >
              <svg
                id="ct-toggle-top-menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="ct-icon"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
