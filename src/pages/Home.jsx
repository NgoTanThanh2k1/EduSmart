import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import apiCourse from "../apis/apiCourse";
import apiUserCourse from "../apis/apiUserCourse";

function Home() {
  const [tab, setTab] = useState("suggested");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [favorites, setFavorites] = useState([]); // id các khóa học yêu thích

  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

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

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleShare = (course) => {
    console.log("Xem chi tiết khóa học:", course.title);
    // Thêm logic xem chi tiết ở đây
  };

  const handleViewDetail = (course) => {
    console.log("Thêm vào giỏ hàng:", course.title);
    // Thêm logic thêm vào giỏ hàng ở đây
  };

  return (
    <div className="content-wrapper max-w-screen-2xl text-base mx-auto px-8">
      <img
        src="/image/bg1.png"
        alt="bg"
        className="w-full h-auto bg-cover bg-center bg-no-repeat relative mb-8"
      />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full px-4">
        {currentCourses.slice(0, 4).map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isSelected={selectedCourse?.id === course.id}
            isFavorite={favorites.includes(course.id)}
            onSelect={handleSelectCourse}
            onFavorite={handleFavorite}
            onShare={handleShare}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>
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
                <div>
                  Đã đăng ký&nbsp;
                  <span className="text-[#e8505b] text-[24px]">190</span>
                  &nbsp;Cá nhân
                </div>
              </div>
            </div>
          </div>
        </a>

        <a
          href="/fights/detail/529"
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
                ĐƯỜNG ĐUA LẬP TRÌNH 2024-2025 KHỐI THCS - VÒNG BỨT PHÁ
              </h1>
            </span>
            <div className="mb-2 mt-1 min-h-[40px]">
              Các thí sinh sẽ hoàn thành các bài tập mà Ban tổ chức đưa ra, từ
              đó rèn luyện tư duy sáng tạo và kỹ năng lập trình, hướng tới xây
              dựng nền tảng vững chắc cho tương lai.
            </div>
            <div className="mt-auto lg:flex-row flex-col">
              <div>
                <div>
                  Đã đăng ký&nbsp;
                  <span className="text-[#e8505b] text-[24px]">342</span>
                  &nbsp;Cá nhân
                </div>
              </div>
              <div className="text-[#3b3c54] font-semibold flex justify-between">
                <div>Cuộc thi đã kết thúc ngày&nbsp;13/04/2025</div>
                <div>Đã kết thúc</div>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Phần Luyện tập hàng ngày và Chia sẻ */}
      <div className="grid lg:grid-cols-[7fr_5fr] lg:gap-8 gap-5 mb-8">
        {/* Luyện tập hàng ngày */}
        <div className="flex flex-col h-full">
          <div className="flex gap-5 flex-wrap justify-between items-center">
            <h3 className="my-0 font-bold text-[#2c31cf] text-[26px]">
              Luyện tập hàng ngày
            </h3>
            <a href="/training" className="text-blue-600 hover:text-blue-800">
              Xem tất cả
            </a>
          </div>
          <div className="mt-5 bg-white p-5 rounded-md flex-auto border border-none">
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="lg:text-[24px] border border-dashed p-4 flex flex-col rounded-md">
                <div className="font-semibold text-[#7bc043]">0/851</div>
                <div>Dễ</div>
              </div>
              <div className="lg:text-[24px] border border-dashed p-4 flex flex-col rounded-md">
                <div className="font-semibold text-[#faa05e]">0/594</div>
                <div>Trung bình</div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 lg:mt-7 mt-5 lg:gap-7 gap-5">
              {/* Card bài tập 1 */}
              <a
                href="/training/3090"
                className="hover:opacity-100 h-full flex flex-col justify-between bg-white shadow-md border rounded-xl flex-auto transition-all hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <span
                      className="font-semibold text-center lg:text-xl text-base text-[#1E266D]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      maxIncreaseSubArray
                    </span>
                    <div className="text-sm h-[24px] font-semibold flex-none px-3 rounded-xl text-white flex items-center justify-center capitalize bg-[#77C148]">
                      Dễ
                    </div>
                  </div>
                  <div className="flex-wrap h-[25px] overflow-hidden justify-center flex gap-2 text-xs text-[#333] mt-3">
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      Algorithm
                    </div>
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      Array
                    </div>
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      Training
                    </div>
                  </div>
                </div>
                <div className="rounded-b-xl mt-auto h-[42px] font-semibold text-sm text-[#65656D] bg-[#F5F6F7] px-4 flex items-center justify-between">
                  <div className="flex gap-[6px] items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="#65656D"
                      />
                    </svg>
                    <span>92,9%</span>
                  </div>
                  <div className="flex gap-[6px] items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="#FF6B6B"
                      />
                    </svg>
                    <span>100</span>
                  </div>
                </div>
              </a>

              {/* Card bài tập 2 */}
              <a
                href="/training/1814"
                className="hover:opacity-100 h-full flex flex-col justify-between bg-white shadow-md border rounded-xl flex-auto transition-all hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <span
                      className="font-semibold text-center lg:text-xl text-base text-[#1E266D]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      typeOfTriangle
                    </span>
                    <div className="text-sm h-[24px] font-semibold flex-none px-3 rounded-xl text-white flex items-center justify-center capitalize bg-[#77C148]">
                      Dễ
                    </div>
                  </div>
                  <div className="flex-wrap h-[25px] overflow-hidden justify-center flex gap-2 text-xs text-[#333] mt-3">
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      Geometry
                    </div>
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      Algorithm
                    </div>
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      contest
                    </div>
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      Training
                    </div>
                  </div>
                </div>
                <div className="rounded-b-xl mt-auto h-[42px] font-semibold text-sm text-[#65656D] bg-[#F5F6F7] px-4 flex items-center justify-between">
                  <div className="flex gap-[6px] items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="#65656D"
                      />
                    </svg>
                    <span>90,3%</span>
                  </div>
                  <div className="flex gap-[6px] items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="#FF6B6B"
                      />
                    </svg>
                    <span>100</span>
                  </div>
                </div>
              </a>

              {/* Card bài tập 3 */}
              <a
                href="/training/1883"
                className="hover:opacity-100 h-full flex flex-col justify-between bg-white shadow-md border rounded-xl flex-auto transition-all hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <span
                      className="font-semibold text-center lg:text-xl text-base text-[#1E266D]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      soloBingoGame
                    </span>
                    <div className="text-sm h-[24px] font-semibold flex-none px-3 rounded-xl text-white flex items-center justify-center capitalize bg-[#faa05e]">
                      Trung bình
                    </div>
                  </div>
                  <div className="flex-wrap h-[25px] overflow-hidden justify-center flex gap-2 text-xs text-[#333] mt-3">
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      game
                    </div>
                    <div className="bg-[#F5F6F7] px-[10px] h-[25px] flex items-center rounded-md">
                      Training
                    </div>
                  </div>
                </div>
                <div className="rounded-b-xl mt-auto h-[42px] font-semibold text-sm text-[#65656D] bg-[#F5F6F7] px-4 flex items-center justify-between">
                  <div className="flex gap-[6px] items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="#65656D"
                      />
                    </svg>
                    <span>93,2%</span>
                  </div>
                  <div className="flex gap-[6px] items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="#FF6B6B"
                      />
                    </svg>
                    <span>150</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Chia sẻ */}
        <div className="flex flex-col h-full">
          <div className="flex gap-5 flex-wrap justify-between items-center">
            <h3 className="my-0 font-bold text-[#2c31cf] text-[26px]">
              Chia sẻ
            </h3>
            <a href="/sharing" className="text-blue-600 hover:text-blue-800">
              Xem tất cả
            </a>
          </div>
          <div className="mt-5 flex flex-col gap-3 bg-white px-5 pt-5 rounded-md flex-auto border">
            {/* Bài viết 1 */}
            <a href="/sharing/huong-dan-code-game-ran-san-moi">
              <div className="hover:-translate-y-1.5 duration-200 hover:opacity-100 pb-2 mb-3 grid lg:grid-cols-[160px_auto] gap-4 relative border-b">
                <div className="absolute top-[-5px] left-1 z-10">
                  <div className="relative">
                    <div className="w-[94px] h-[42px] bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-[13px]">
                        Nổi bật
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
                    Rắn săn mồi là một phần tuổi thơ của đa số các lập trình
                    viên. Tại sao chúng ta không thử code lại tựa game này và
                    trải nghiệm thêm một lần nữa nhỉ?
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
                    Bài viết này sẽ chỉ cho bạn thấy C++ là một ngôn ngữ lập
                    trình "siêu chất" với vô vàn ưu điểm vượt trội về hiệu năng
                    so với các ngôn ngữ khác.
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
                    thiết kế UI. Mỗi nút bạn thấy sẽ mang một hình dáng khác
                    nhau. Ý nghĩa đằng sau nó là gì?
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
