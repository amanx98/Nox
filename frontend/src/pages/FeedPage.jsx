import { useState } from "react";
import TagList from "../TagList";
import ThreadList from "../ThreadList";
import ThreadView from "../ThreadView";

export default function FeedPage() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);

  if (selectedThread) {
    return <ThreadView thread={selectedThread} onBack={() => setSelectedThread(null)} />;
  }

  if (selectedTag) {
    return (
      <ThreadList
        tag={selectedTag}
        onSelectThread={setSelectedThread}
        onBack={() => setSelectedTag(null)}
      />
    );
  }

  return <TagList onSelectTag={setSelectedTag} />;
}