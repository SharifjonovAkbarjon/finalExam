import { MdCreateNewFolder } from "react-icons/md";
import { useCreatePostMutation, useUploadFilesMutation } from "../../redux/api/file-api";
import { FormEvent, useState } from "react";
import { useProfileQuery } from "../../redux/api/user-api";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import create from "../../assets/create.svg";

const Create = () => {
    const [uploadFiles] = useUploadFilesMutation();
    const [image, setImage] = useState<File[]>([]);  // To'g'ri state turi
    const [createPost, { isLoading }] = useCreatePostMutation();
    const [saveImages, setSaveImages] = useState<string[]>([]);
    const [caption, setCaption] = useState<string>("");
    const [contentAlt, setContentAlt] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const navigate = useNavigate();
    const { data: profile } = useProfileQuery({});

    const handleUpload = () => {
        const formData = new FormData();
        image.forEach((img: File) => {
            formData.append("files", img, img.name);
        });

        type FileObject = { url: string; type: "IMAGE" };

        uploadFiles(formData)
            .unwrap()
            .then((res) =>
                Object.keys(res).forEach((key: string) => {
                    const fileGroup = res[key as keyof typeof res];
                    if (Array.isArray(fileGroup)) {
                        fileGroup.forEach((group: FileObject[]) => {
                            group.forEach((file: FileObject) => {
                                setSaveImages((prevImages: string[]) => [
                                    ...prevImages,
                                    file.url,
                                ]);
                            });
                        });
                    }
                })
            );
    };

    const handleCreatePost = (e: FormEvent) => {
        e.preventDefault();
        const newPost = {
            caption: caption,
            location: location,
            content_alt: contentAlt,
            content: saveImages,
        };
        createPost(newPost)
            .unwrap()
            .then(() => {
                navigate("/");
            });
    };

    return (
        <div className="pt-[60px] px-4 pb-[85px] lg:pl-[40px]">
            <div>
                <h1 className="text-white text-lg lg:text-4xl font-bold flex items-center gap-x-[10px]">
                    <MdCreateNewFolder /> Create a Post
                </h1>
                <div className="flex lg:gap-x-[150px]">
                    <form className="pb-6 w-full" onSubmit={handleCreatePost}>
                        <div className="mb-4">
                            <p className="text-[#EFEFEF] lg:text-lg font-medium mb-3">Caption</p>
                            <input
                                required
                                onChange={(e: any) => setCaption(e.target.value)}
                                className="w-full lg:w-[630px] h-[114px] rounded-[10px] bg-[#101012] text-white"
                                type="text"
                                name="caption"
                            />
                        </div>
                        <div>
                            <p className="text-[#EFEFEF] lg:text-lg font-medium mb-3">Add Photos</p>
                            <div className="w-full lg:w-[630px] h-[289px] relative z-[2]">
                                <input
                                    required
                                    onChange={(e: any) => setImage(Array.from(e.target.files))}
                                    className="absolute top-0 left-0 w-full h-full opacity-0 z-20"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                />
                                <div className="flex flex-col items-center z-[3] absolute top-0 left-0 w-full h-full bg-[#101012] pt-12 rounded-[14px]">
                                    <img src={create} alt="create img" />
                                    <p className="text-[#EFEFEF] font-semibold text-lg mb-2 mt-3">
                                        Drag photos and videos here
                                    </p>
                                    <p className="text-xs text-[#5C5C7B] mb-4">
                                        SVG, PNG, JPG (max. 800x400px)
                                    </p>
                                    <div className="py-[10px] px-5 bg-[#1F1F22] rounded-lg">
                                        <p className="text-xs text-white font-semibold">
                                            Select from computer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-1">
                                {image.map((i, inx) => (
                                    <div className="relative" key={inx}>
                                        <img
                                            className="w-[150px] h-[150px] object-cover"
                                            src={URL.createObjectURL(i)}
                                            alt="photo"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setImage((prev) =>
                                                    prev.filter((_, index) => index !== inx)
                                                )
                                            }
                                            className="text-white absolute top-0 right-0 bg-black">
                                            <IoClose className="text-2xl" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {image.length > 0 && (
                                <button
                                    className="text-white py-2 px-4 rounded-lg bg-[#877EFF]"
                                    type="button"
                                    onClick={handleUpload}>
                                    Upload
                                </button>
                            )}
                        </div>
                        <div className="mb-4">
                            <p className="text-[#EFEFEF] lg:text-lg font-medium mb-3">Add Location</p>
                            <input
                                required
                                onChange={(e: any) => setLocation(e.target.value)}
                                className="w-full lg:w-[630px] h-[54px] rounded-[10px] bg-[#101012] text-white"
                                type="text"
                                name="location"
                            />
                        </div>
                        <div>
                            <p className="text-[#EFEFEF] lg:text-lg font-medium mb-3">
                                Photo/Video Alt Text
                            </p>
                            <input
                                required
                                onChange={(e: any) => setContentAlt(e.target.value)}
                                className="w-full lg:w-[630px] h-[54px] rounded-[10px] bg-[#101012] text-white"
                                type="text"
                                name="content_alt"
                            />
                        </div>
                        <button
                            className="text-white font-semibold py-3 px-5 rounded-lg bg-[#877EFF] mt-10"
                            type="submit">
                            {isLoading ? "Loading..." : "Share Post"}
                        </button>
                    </form>
                    <div className="px-11 hidden lg:block">
                        <div className="w-[330px]">
                            <div className="flex flex-col items-center ">
                                <img
                                    className="w-[130px] h-[130px] rounded-full mb-6"
                                    src={profile?.photo ? `${import.meta.env.VITE_APP_BASE_URL}${profile.photo}` : ""}
                                    alt="img"
                                />
                                <p className="text-[30px] text-white font-bold mb-3">
                                    {profile?.fullName}
                                </p>
                                <p className="text-[18px] text-[#7878A3]">@{profile?.username}</p>
                            </div>
                            <p className="text-2xl font-bold mt-14 text-white">Top posts by you</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;

