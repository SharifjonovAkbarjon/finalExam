import { useState } from "react";
import { useGetUserPostsQuery } from "../../redux/api/file-api";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Posts = ({ userId }: any) => {
    const { data: posts } = useGetUserPostsQuery({ userId });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };
    const closeModal = () => {
        setSelectedImage(null);
    };
    const pagination = {
        clickable: true,
        renderBullet: function (_: any, className: string) {
            return `<span class="${className} bg-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
        },
    };

    return (
        <div className="grid grid-cols-3 gap-x-[30px] gap-y-[45px]">
            {posts?.map((post: any, inx: number) => (
                <div key={inx} className="border border-white rounded-2xl">
                    <Swiper
                        modules={[Pagination]}
                        pagination={pagination}
                        spaceBetween={50}
                        slidesPerView={1}>
                        {post?.content?.map((media: any, mediaIdx: number) => (
                            <SwiperSlide key={mediaIdx}>
                                <div>
                                    {media.type === "IMAGE" && (
                                        <img
                                            src={media.url}
                                            alt={`Post ${inx} content ${mediaIdx}`}
                                            className="cursor-pointer object-cover w-full h-64 rounded-2xl border"
                                            onClick={() =>
                                                handleImageClick(media.url)
                                            }
                                        />
                                    )}
                                    {media.type === "VIDEO" && (
                                        <video
                                            src={media.url}
                                            controls
                                            className="w-full h-64  cursor-pointer rounded-2xl border"></video>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}>
                    <div className="relative max-w-full max-h-full">
                        <img
                            src={selectedImage}
                            alt="Zoomed"
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            className="absolute top-2 right-2 text-white text-2xl bg-gray-900 rounded-full px-3 py-1"
                            onClick={closeModal}>
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
