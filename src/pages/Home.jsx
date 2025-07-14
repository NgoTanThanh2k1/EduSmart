import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import SearchAndFilter from "../components/SearchAndFilter";
import AISuggestions from "../components/AISuggestions";
import ProductDetailModal from "../components/ProductDetailModal";
import apiCourse from "../apis/apiCourse";
import apiUserCourse from "../apis/apiUserCourse";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useViewHistory } from "../hooks/useViewHistory";
import { Box, Typography, Chip, Button, Fade } from "@mui/material";
import { History, Visibility, Search } from "@mui/icons-material";
import ToastNotification from "../components/ToastNotification";

function Home() {
  const [tab, setTab] = useState("suggested");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const { addToCart } = useCart();
  const { isInFavorites, toggleFavorite } = useFavorites();
  const { addToHistory, getRecentHistory } = useViewHistory();

  useEffect(() => {
    apiCourse.get("/Course").then((res) => {
      setCourses(res.data);
    });
    apiUserCourse.get("/UserCourse").then((res) => {
      setUserCourses(res.data);
    });
  }, []);

  // Lấy dữ liệu theo tab đang chọn
  const currentCourses = tab === "suggested" ? courses : userCourses;

  // Lọc dữ liệu khi searchTerm thay đổi
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCourses(currentCourses);
      return;
    }
    const lower = searchTerm.toLowerCase();
    const filtered = currentCourses.filter(
      (course) =>
        course.name?.toLowerCase().includes(lower) ||
        course.description?.toLowerCase().includes(lower)
    );
    setFilteredCourses(filtered);
  }, [searchTerm, currentCourses]);

  // Khi đổi tab thì reset showAllCourses
  useEffect(() => {
    setShowAllCourses(false);
  }, [tab]);

  // Xử lý tìm kiếm - submit
  const handleSearch = (term) => {
    if (term.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(term)}`;
    }
  };

  // Xử lý lọc giá
  const handleFilter = (priceFilter) => {
    let filtered = currentCourses;

    switch (priceFilter) {
      case "under500k":
        filtered = currentCourses.filter((course) => course.price < 500000);
        break;
      case "500k-1m":
        filtered = currentCourses.filter(
          (course) => course.price >= 500000 && course.price <= 1000000
        );
        break;
      case "1m-2m":
        filtered = currentCourses.filter(
          (course) => course.price > 1000000 && course.price <= 2000000
        );
        break;
      case "over2m":
        filtered = currentCourses.filter((course) => course.price > 2000000);
        break;
      default:
        filtered = currentCourses;
    }

    setFilteredCourses(filtered);
  };

  // Xóa bộ lọc
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilteredCourses(currentCourses);
  };

  // Xử lý xem chi tiết
  const handleViewDetail = (course) => {
    addToHistory(course); // Add to view history
    setSelectedProduct(course);
    setDetailModalOpen(true);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleAddToCart = (course) => {
    addToCart(course);
    setToastMessage(`${course.name} đã được thêm vào giỏ hàng!`);
    setToastType("success");
    setShowToast(true);
  };

  const handleFavorite = (course) => {
    const currentFavoriteStatus = isInFavorites(course.id);
    toggleFavorite(course);
    setToastMessage(
      currentFavoriteStatus
        ? `${course.name} đã được bỏ khỏi yêu thích`
        : `${course.name} đã được thêm vào yêu thích`
    );
    setToastType("info");
    setShowToast(true);
  };

  // Get recent view history
  const recentHistory = getRecentHistory(4);

  return (
    <div className="content-wrapper max-w-screen-2xl text-base mx-auto px-8 mt-8">
      <img
        src="/image/bg1.png"
        alt="bg"
        className="w-full h-auto bg-cover bg-center bg-no-repeat relative mb-8"
      />

      {/* Search and Filter */}
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onClear={handleClearFilters}
      />

      {/* AI Suggestions */}
      <AISuggestions />

      {/* View History Section */}
      {recentHistory.length > 0 && (
        <Fade in timeout={800}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 3,
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <History sx={{ fontSize: 28 }} />
              Lịch sử xem gần đây
              <Chip
                label={`${recentHistory.length} khóa học`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-4 w-full px-4">
              {recentHistory.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isSelected={selectedCourse?.id === course.id}
                  isFavorite={isInFavorites(course.id)}
                  onSelect={handleSelectCourse}
                  onAddToCart={() => handleAddToCart(course)}
                  onFavorite={() => handleFavorite(course)}
                  onShare={handleViewDetail}
                />
              ))}
            </div>
          </Box>
        </Fade>
      )}

      {/* Tabs */}
      <div className="flex flex-row items-center gap-8 mb-8">
        <button
          className={`text-2xl font-bold ct-top-menu-item-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            tab === "suggested"
              ? "bg-orange-100 text-orange-600"
              : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => {
            setTab("suggested");
            setSelectedCourse(null);
          }}
        >
          Khóa học gợi ý
        </button>
        <button
          className={`text-2xl font-bold ct-top-menu-item-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            tab === "learning"
              ? "bg-orange-100 text-orange-600"
              : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => {
            setTab("learning");
            setSelectedCourse(null);
          }}
        >
          Đang học
        </button>
      </div>

      {/* Danh sách card khóa học */}
      <div
        className={`grid ${
          filteredCourses.length > 0 &&
          filteredCourses.length !== currentCourses.length
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        } gap-6 mb-8 w-full px-4`}
      >
        {(showAllCourses ? filteredCourses : filteredCourses.slice(0, 4)).map(
          (course) => (
            <CourseCard
              key={course.id}
              course={course}
              isSelected={selectedCourse?.id === course.id}
              isFavorite={isInFavorites(course.id)}
              onSelect={handleSelectCourse}
              onAddToCart={() => handleAddToCart(course)}
              onFavorite={() => handleFavorite(course)}
              onShare={handleViewDetail}
              {...(tab === "learning"
                ? {
                    hideAddToCart: true,
                    hideFavorite: true,
                    customViewLabel: "Vào khóa học",
                  }
                : {})}
            />
          )
        )}
      </div>
      {/* Nút Xem thêm */}
      {!showAllCourses && filteredCourses.length > 4 && (
        <div className="flex justify-center mb-8">
          <button
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
            onClick={() => setShowAllCourses(true)}
          >
            Xem thêm
          </button>
        </div>
      )}

      <div
        className={
          "text-2xl font-bold ct-top-menu-item-2 px-4 py-2 rounded-lg transition-all duration-200 inline-block mb-8"
        }
      >
        Cuộc thi lập trình
      </div>

      {/* Danh sách cuộc thi lập trình */}
      <div className="mt-4 lg:gap-7 gap-5 grid lg:grid-cols-2 mb-8">
        <a
          href="/fights/detail/544"
          className="transition-all border border-none hover:-translate-y-1.5 overflow-hidden hover:shadow-lg flex flex-col bg-white hover:opacity-100 rounded-md"
        >
          <img
            src="https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/Banner_chung_ket_8203a134a9f54835a7c7467dceae5cf6.png"
            alt=""
            className="object-cover aspect-[1440/280] w-full"
          />
          <div className="flex flex-col p-5">
            <span
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              <h1 className="m-0 lg:text-[26px] text-[#3b3c54] font-bold text-xl">
                ĐƯỜNG ĐUA LẬP TRÌNH 2024-2025 KHỐI THCS - VÒNG CHUNG KẾT
              </h1>
            </span>
            <div className="mb-2 mt-1 min-h-[40px]">
              Các thí sinh sẽ hoàn thành các bài tập mà Ban tổ chức đưa ra, từ
              đó rèn luyện tư duy sáng tạo và kỹ năng lập trình, hướng tới xây
              dựng nền tảng vững chắc cho tương lai.
            </div>
            <div className="mt-auto lg:flex-row flex-col">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Đang diễn ra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">1,234 thí sinh</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a
          href="/fights/detail/545"
          className="transition-all border border-none hover:-translate-y-1.5 overflow-hidden hover:shadow-lg flex flex-col bg-white hover:opacity-100 rounded-md"
        >
          <img
            src="https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/THCS__6__6eae258a972d4992b7853301eccb73d0.png"
            alt=""
            className="object-cover aspect-[1440/280] w-full"
          />
          <div className="flex flex-col p-5">
            <span
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              <h1 className="m-0 lg:text-[26px] text-[#3b3c54] font-bold text-xl">
                OLYMPIC TIN HỌC SINH VIÊN VIỆT NAM 2024
              </h1>
            </span>
            <div className="mb-2 mt-1 min-h-[40px]">
              Cuộc thi Olympic Tin học Sinh viên Việt Nam là sân chơi trí tuệ
              dành cho sinh viên các trường đại học, cao đẳng trên toàn quốc.
            </div>
            <div className="mt-auto lg:flex-row flex-col">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Sắp diễn ra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">2,567 thí sinh</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div
        className={
          "text-2xl font-bold ct-top-menu-item-2 px-4 py-2 rounded-lg transition-all duration-200 inline-block mb-8"
        }
      >
        Luyện tập hàng ngày
      </div>

      {/* Danh sách luyện tập hàng ngày */}
      <div className="mt-4 lg:gap-7 gap-5 grid lg:grid-cols-2 mb-8">
        <a
          href="/practice/detail/123"
          className="transition-all border border-none hover:-translate-y-1.5 overflow-hidden hover:shadow-lg flex flex-col bg-white hover:opacity-100 rounded-md"
        >
          <img
            src="https://vallicon.com/static/assets/img/DataStructureAndAlgorithm.png"
            alt=""
            className="object-cover aspect-[1440/280] w-full"
          />
          <div className="flex flex-col p-5">
            <span
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              <h1 className="m-0 lg:text-[26px] text-[#3b3c54] font-bold text-xl">
                BÀI TẬP ALGORITHM HÀNG NGÀY
              </h1>
            </span>
            <div className="mb-2 mt-1 min-h-[40px]">
              Rèn luyện tư duy thuật toán với các bài tập được cập nhật hàng
              ngày, từ cơ bản đến nâng cao.
            </div>
            <div className="mt-auto lg:flex-row flex-col">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Đang diễn ra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">156 bài tập</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a
          href="/practice/detail/124"
          className="transition-all border border-none hover:-translate-y-1.5 overflow-hidden hover:shadow-lg flex flex-col bg-white hover:opacity-100 rounded-md"
        >
          <img
            src="https://media.licdn.com/dms/image/v2/D5612AQHyLFkv9YBcGA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1715058774193?e=2147483647&v=beta&t=7yqv62DbvJWPvycGiDX4FGb79GOPsVB_dreB-SHh36E"
            alt=""
            className="object-cover aspect-[1440/280] w-full"
          />
          <div className="flex flex-col p-5">
            <span
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              <h1 className="m-0 lg:text-[26px] text-[#3b3c54] font-bold text-xl">
                DỰ ÁN WEB DEVELOPMENT
              </h1>
            </span>
            <div className="mb-2 mt-1 min-h-[40px]">
              Thực hành xây dựng các dự án web thực tế, từ frontend đến backend.
            </div>
            <div className="mt-auto lg:flex-row flex-col">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Đang diễn ra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">89 dự án</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div
        className={
          "text-2xl font-bold ct-top-menu-item-2 px-4 py-2 rounded-lg transition-all duration-200 inline-block mb-8"
        }
      >
        Chia sẻ kiến thức
      </div>

      {/* Danh sách chia sẻ kiến thức */}
      <div className="mt-4 lg:gap-7 gap-5 grid lg:grid-cols-2 mb-8">
        <div className="flex flex-col gap-4">
          {/* Bài viết 1 */}
          <a href="/sharing/huong-dan-code-game-ran-san-moi">
            <div className="hover:-translate-y-1.5 duration-200 hover:opacity-100 pb-2 mb-3 grid lg:grid-cols-[160px_auto] gap-4 relative border-b">
              <div className="absolute top-[-5px] left-1 z-10">
                <div className="relative">
                  <div className="w-[94px] h-[42px] bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-[13px]">
                      Hướng dẫn
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <img
                  src="https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/huong-dan-lam-game-ran-san-moi-trong-cpp-63721179615.8205.jpg"
                  alt=""
                  className="w-full aspect-[160/108] object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-semibold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  Hướng Dẫn Code Game Rắn Săn Mồi Trong C++
                </span>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="11"
                      height="11"
                      viewBox="0 0 28 27"
                      className="text-yellow-400"
                    >
                      <path
                        d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>
                <span
                  className="text-sm text-gray-600 mt-1"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  Rắn săn mồi là một phần tuổi thơ của đa số các lập trình viên.
                  Tại sao chúng ta không thử code lại tựa game này và trải
                  nghiệm thêm một lần nữa nhỉ?
                </span>
              </div>
            </div>
          </a>

          {/* Bài viết 2 */}
          <a href="/sharing/hoc-cpp-lam-duoc-gi-cho-doi">
            <div className="hover:-translate-y-1.5 duration-200 hover:opacity-100 pb-2 mb-3 grid lg:grid-cols-[160px_auto] gap-4 relative border-b">
              <div className="absolute top-[-5px] left-1 z-10">
                <div className="relative">
                  <div className="w-[94px] h-[42px] bg-orange-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-[13px]">
                      Xu hướng
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <img
                  src="https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/hoc-cpp-thi-lam-duoc-gi-63720748434.143.jpg"
                  alt=""
                  className="w-full aspect-[160/108] object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-semibold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  Học C++ Làm Được Gì Cho Đời?
                </span>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="11"
                      height="11"
                      viewBox="0 0 28 27"
                      className="text-yellow-400"
                    >
                      <path
                        d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>
                <span
                  className="text-sm text-gray-600 mt-1"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  Bài viết này sẽ chỉ cho bạn thấy C++ là một ngôn ngữ lập trình
                  "siêu chất" với vô vàn ưu điểm vượt trội về hiệu năng so với
                  các ngôn ngữ khác.
                </span>
              </div>
            </div>
          </a>

          {/* Bài viết 3 */}
          <a href="/sharing/cac-button-pho-bien-trong-thiet-ke-ui">
            <div className="hover:-translate-y-1.5 duration-200 hover:opacity-100 pb-2 mb-3 grid lg:grid-cols-[160px_auto] gap-4 relative">
              <div className="absolute top-[-5px] left-1 z-10">
                <div className="relative">
                  <div className="w-[94px] h-[42px] bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-[13px]">
                      Mới nhất
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <img
                  src="https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/how-the-shape-of-a-button-can-influence-user-perception-63722197428.1169.png"
                  alt=""
                  className="w-full aspect-[160/108] object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-semibold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  Giải Mã Các Button Phổ Biến Trong Thiết Kế UI
                </span>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      width="11"
                      height="11"
                      viewBox="0 0 28 27"
                      className="text-yellow-400"
                    >
                      <path
                        d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 28 27"
                    className="text-gray-300"
                  >
                    <path
                      d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span
                  className="text-sm text-gray-600 mt-1"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  Các nút xuất hiện rất nhiều xung quanh chúng ta trong các
                  thiết kế UI. Mỗi nút bạn thấy sẽ mang một hình dáng khác nhau.
                  Ý nghĩa đằng sau nó là gì?
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        open={detailModalOpen}
        product={selectedProduct}
        onClose={() => setDetailModalOpen(false)}
      />

      {/* Toast Notification */}
      <ToastNotification
        open={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default Home;
