import CommentSection from "../comments/comment-section";
import CommentsList from "../comments/comments-list";
export default function ProductPage({ product, addProductToCart }) {
  return (
    <div className="z-50">
      <h2>{product.title}</h2>
      <form action={addProductToCart.bind(null, product.id)}>
        <button
          className="bg-blue-300 cursor-pointer z-50 size-10"
          type="submit"
        >
          Buy
        </button>
      </form>
      <CommentSection targetType="PRODUCT" targetId={product.id} />
      <div>
        <CommentsList targetType="PRODUCT" targetId={product.id} />
      </div>
    </div>
  );
}
