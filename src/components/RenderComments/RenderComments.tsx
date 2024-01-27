import Comment from "../Comment";
import CommentCreator from "../CommentCreator/CommentCreator";

const RenderComments: React.FC = ({ comments }) => {
  console.log(comments);
  return (
    <div className="z-10">
      <ul>
        {comments
          ?.filter(
            (comment) =>
              comment?.urlPath ===
              window.location.origin + window.location.pathname
          )
          .map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
      </ul>
      <CommentCreator />
    </div>
  );
};

export default RenderComments;
