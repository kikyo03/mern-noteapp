import api from "./axios";
import toast from "react-hot-toast";

export const handleDelete = async (e, id, options = {}) => {
  // options = { navigate, setNotes }
  if (e) e.preventDefault(); // prevent navigation if called from a link

  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    await api.delete(`/notes/${id}`);
    toast.success("Note deleted successfully");

    if (options.setNotes) {
      // used in note list (removes from UI)
      options.setNotes((prev) => prev.filter((note) => note._id !== id));
    }

    if (options.navigate) {
      // used in single note page (redirect)
      options.navigate("/");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    toast.error("Failed to delete note");
  }
};
