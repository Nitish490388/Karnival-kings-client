// components/gallery/GalleryView.tsx
import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axiosClient from "@/utils/axiosClient";
import { GalleryPost } from "@/types/gallery";
import GallerySlider from "@/components/GallerySlider";

export default function Gallery() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [isOpenSlider, setIsOpenSlider] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  // Flat list of all images
  const images = useMemo(() => {
    return posts.flatMap((post) =>
      post.media.filter((m) => m.type === "IMAGE")
    );
  }, [posts]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axiosClient.get("/api/v1/gallery");
        setPosts(response.data.result.posts);
        console.log(response.data.result.posts);
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-6">🏏 Karnival Kings Gallery</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
              {post.media.map((mediaItem) =>
                mediaItem.type === "VIDEO" ? (
                  <video
                    key={mediaItem.id}
                    src={mediaItem.url}
                    className="rounded shadow w-full h-48 object-cover"
                    controls
                  />
                ) : (
                  <div
                    key={mediaItem.id}
                    className="aspect-w-16 aspect-h-9 cursor-pointer"
                    onClick={() => {
                      const imageIndex = images.findIndex(
                        (img) => img.id === mediaItem.id
                      );
                      setIndex(imageIndex);
                      setIsOpenSlider(true);
                    }}
                  >
                    <img
                      src={mediaItem.url}
                      alt="gallery-media"
                      className="rounded shadow object-contain w-full h-full"
                    />
                  </div>
                )
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Global GallerySlider outside of the loop */}
      {isOpenSlider && (
        <GallerySlider
          images={images}
          index={index}
          setIndex={setIndex}
          close={() => setIsOpenSlider(false)}
        />
      )}
    </div>
  );
}
