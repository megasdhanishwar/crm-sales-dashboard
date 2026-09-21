import React from "react";
import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "Nothing found",
  text = "Try adjusting your search or filters.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <SearchX size={25} />
      </div>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
