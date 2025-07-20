export type GalleryPost = {
  id: string;
  title: string;
  description?: string;
  media: GalleryMedia[];
  createdAt: string;
};

export type GalleryMedia = {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  thumbnail?: string;
};
