import { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({
    fullWidth: document.documentElement.clientWidth,
    fullHeight: document.documentElement.clientHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        fullWidth: document.documentElement.clientWidth,
        fullHeight: document.documentElement.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen) {
      if (event.currentTarget instanceof HTMLDivElement) {
        event.currentTarget.style.width = "40px";
        event.currentTarget.style.height = "40px";
        event.currentTarget.style.borderRadius = "50%";
        event.currentTarget.style.overflow = "hidden";
      }
      setIsOpen(false);
    } else if (event.currentTarget instanceof HTMLDivElement) {
      event.currentTarget.style.width = "140px"; // Adjust the expanded width
      event.currentTarget.style.height = "100px"; // Adjust the expanded width
      event.currentTarget.style.borderRadius = "10%"; // Remove roundedness
      event.currentTarget.style.overflow = "visible"; // Show hidden content
      setIsOpen(true);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${Number(comment.locationX) * dimensions.fullWidth}px`,
        top: `${Number(comment.locationY) * dimensions.fullHeight}px`,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        overflow: "hidden", // Hide overflow content
        transition: "width 0.3s, height 0.3s, border-radius 0.3s", // Smooth transition effect
      }}
      onClick={(e) => handleMouseClick(e)}
      // onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <div className={`text-white text-[12px] ${isOpen ? "block" : "hidden"}`}>
        <p className="absolute top-2 left-2">Rahul</p>
        <p style={{ fontSize: "12px" }}>{comment.content}</p>
      </div>
      <p className={`text-white ${!isOpen ? "block" : "hidden"}`}>A</p>
    </div>
  );
};

export default Comment;
