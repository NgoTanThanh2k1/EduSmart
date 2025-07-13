import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CourseCard = ({
  course,
  isSelected,
  isFavorite,
  onSelect,
  onShare,
  onViewDetail,
  onFavorite,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: 350,
        border: isSelected ? "2px solid #FFA726" : "none",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.15)" },
        position: "relative",
      }}
      onClick={() => onSelect(course)}
    >
      <CardMedia
        sx={{ height: 150, width: "100%", position: "relative" }}
        component="img"
        alt={course.title}
        image={course.image}
      />
      {/* Icon trái tim ở góc trên bên phải của ảnh */}
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(4px)",
          zIndex: 1,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(course.id);
        }}
        color={isFavorite ? "error" : "default"}
      >
        <FavoriteIcon />
      </IconButton>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.4em",
            maxHeight: "2.8em", // 2 dòng x 1.4em
          }}
        >
          {course.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTop: "1px solid #eee",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            onShare(course);
          }}
        >
          Xem chi tiết
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(course);
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
