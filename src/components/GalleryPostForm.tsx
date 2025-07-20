import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import axiosClient from "@/utils/axiosClient";

export default function GalleryPostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    files.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const response = await axiosClient.post("/api/v1/admin/gallery/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      // for (const pair of formData.entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }

      setTitle("");
      setDescription("");
      setFiles([]);
    } catch (error: any) {
      // toast.error(error?.response?.data?.message || "Failed to upload post");
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Create New Gallery Post</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description (optional)"
            />
          </div>
          <div>
            <Label htmlFor="media">Upload Media</Label>
            <Input
              id="media"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-24 object-cover rounded"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-24 object-cover rounded"
                      controls
                    />
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 text-red-500 hover:bg-transparent"
                    onClick={() => removeFile(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!title || files.length === 0}
          >
            Upload Gallery Post
          </Button>
        </div>
      </Card>
    </div>
  );
}
