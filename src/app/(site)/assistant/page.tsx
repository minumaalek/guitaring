import Input from "@/components/common/input";
import { EllipsisVertical } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="grid grid-cols-[1fr_4fr] h-screen">
      <div className="bg-gray-100 h-full p-2 flex flex-col">
        <h2>Recent chats</h2>
        <div className="w-full">
          <div className="w-full border h-10 p-1 bg-blue-200 rounded flex items-center justify-between">
            <span>chat title</span>
            <EllipsisVertical />
          </div>
        </div>
      </div>
      <div className="bg-blue-100 h-full">
        <div className="absolute bottom-0 w-full">
          <Input
            type="text"
            name="content"
            placeholder="What's in your mind?"
            className="w-1/3 rounded-xl border"
          />

          <button type="submit" className="absolute right-0">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
