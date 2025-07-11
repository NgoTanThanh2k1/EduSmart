import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const suggestedCourses = [
  {
    id: 1,
    title: "React Cơ bản",
    description:
      "Học React từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu.",
    image: "/image/bg1.png",
  },
  {
    id: 2,
    title: "Lập trình Python",
    description: "Khóa học Python nền tảng, thực hành nhiều ví dụ thực tế.",
    image: "/image/bg1.png",
  },
];

const learningCourses = [
  {
    id: 3,
    title: "Javascript Nâng cao",
    description: "Nắm vững Javascript, ES6+, ứng dụng thực tế.",
    image: "/image/bg1.png",
  },
  {
    id: 4,
    title: "HTML & CSS Pro",
    description: "Thiết kế web hiện đại với HTML5, CSS3, Flexbox, Grid.",
    image: "/image/bg1.png",
  },
];

function Home() {
  const [tab, setTab] = useState("suggested");
  const [favorites, setFavorites] = useState([]); // id các khóa học yêu thích
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = tab === "suggested" ? suggestedCourses : learningCourses;

  const handleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {courses.map((course) => (
          <Card
            key={course.id}
            sx={{
              maxWidth: 345,
              height: 350,
              border:
                selectedCourse?.id === course.id ? "2px solid #FFA726" : "none",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.15)" },
            }}
            onClick={() => handleSelectCourse(course)}
          >
            <CardMedia
              sx={{ height: 150, width: "100%" }}
              component="img"
              alt={course.title}
              image={course.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {course.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(course.id);
                }}
                color={favorites.includes(course.id) ? "error" : "default"}
              >
                <FavoriteIcon />
              </IconButton>
              <Button size="small">Chia sẻ</Button>
              <Button size="small">Xem chi tiết</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {/* Hiển thị chi tiết khóa học */}
      {selectedCourse && (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-orange-200 max-w-xl mx-auto mb-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-2 text-orange-600">
            {selectedCourse.title}
          </h2>
          <img
            src={selectedCourse.image}
            alt={selectedCourse.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <p className="mb-2">{selectedCourse.description}</p>
          <Button variant="contained" color="warning">
            Vào học ngay
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
