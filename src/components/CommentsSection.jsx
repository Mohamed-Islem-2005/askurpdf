import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, selectCurrentUser, LogOut } from "../features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const CommentsSection = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:8000/comments");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !token) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: newComment }),
      });

      if (response.ok) {
        setNewComment("");
        fetchComments(); // Refresh comments list
      } else if (response.status === 401) {
        dispatch(LogOut());
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Failed to post comment. Please try again.");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      const response = await fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (response.ok) {
        fetchComments();
      } else if (response.status === 401) {
        dispatch(LogOut());
        alert("Your session has expired. Please log in again.");
      } else {
        console.error("Failed to delete comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <section className="w-full bg-[#0B0C11] py-24 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Community Thoughts
          </h2>
          <p className="text-gray-400 mt-2 text-lg md:text-xl font-light">
            See what others are saying about AskYourPDF.
          </p>
        </div>

        {/* Comment Form */}
        <div className="w-full bg-[#13141A] border border-white/10 rounded-3xl p-6 md:p-8 mb-12 shadow-2xl transition-all hover:border-white/20">
          {token ? (
            <form onSubmit={handlePostComment} className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-white mb-2">Leave a Comment</h3>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none h-32 placeholder-gray-600"
                required
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex justify-end mt-2">
                <Button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-white mb-4">Join the Conversation</h3>
              <p className="text-gray-400 mb-6">You need to be logged in to share your thoughts.</p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl cursor-pointer"
              >
                <Link to="/login">Log In to Post</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Comments List */}
        <div className="w-full space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="w-full bg-[#13141A]/50 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 transition-all hover:bg-[#13141A] hover:border-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                      {comment.username ? comment.username.charAt(0).toUpperCase() : "A"}
                    </div>
                    <span className="text-white font-medium text-lg">{comment.username || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm bg-black/30 px-3 py-1 rounded-full">
                      {comment.timestamp
                        ? new Date(comment.timestamp).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Just now"}
                    </span>
                    {comment.username === currentUser && currentUser && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10 cursor-pointer flex items-center justify-center"
                        title="Delete comment"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed pl-16 text-lg">
                  {comment.text}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl bg-[#13141A]/30">
              <p className="text-gray-500 text-lg">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
