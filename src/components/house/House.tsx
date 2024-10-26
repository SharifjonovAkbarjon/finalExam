import { useSelector } from "react-redux";
import { useFollowMutation, useGetUsersQuery } from "../../redux/api/user-api";
import { useGetPostsQuery } from "../../redux/api/file-api";
import rasm from "../../assets/my.png";
import rasm2 from "../../assets/john.png";
import rasm3 from "../../assets/ednamz.png";
import rasm4 from "../../assets/harry.png";
import rasm5 from "../../assets/joe.png";
import rasm6 from "../../assets/roman.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useToggleLikeMutation } from "../../redux/api/likecommit-api";
import { FcLike } from "react-icons/fc";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import { User } from "../../types";
import { RootState } from "../../redux";
import Loading from "../loading/Loading";
import UserLoading from "../userLoading/UserLoading";

interface PostType {
    _id: string;
    caption: string;
    content_alt: string;
    createdAt: string;
    content: [
        {
            url: string;
            type: "IMAGE" | "VIDEO";
        }
    ];
    likes_count: number;
    comments_count: number;
    shares_count: number;
    location: string;
    likes: string;
}



const House = () => {
    const { data: proData, isLoading: isProLoading } = useGetPostsQuery({});
    const [toggleLike] = useToggleLikeMutation({});
    const handleLike = (_id: string) => toggleLike(_id);

    const proPosts = proData?.posts?.map((e: PostType) => (
        <div key={e._id}>
            <div className="flex text-sm lg:text-base items-center gap-x-5 mt-5">
                <p>{e?.content_alt}</p>
                <p className="text-[#5C5C7B]">#{e?.location}</p>
            </div>
            <div className="flex flex-col  items-center">
                <div className="w-[280px] 2xl:w-[600px] min-[1280px]:w-[400px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] lg:w-[600px]">
                    <Swiper
                        pagination={{
                            type: "fraction",
                        }}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper w-[280px] 2xl:w-[600px] min-[1280px]:w-[400px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] lg:w-[600px]">
                        {e?.content?.map((i, inx) => (
                            <SwiperSlide
                                className="w-full lg:w-[600px]"
                                key={inx}>
                                <div>
                                    {i.type === "IMAGE" && (
                                        <img
                                            className="rounded-3xl 2xl:w-[600px] min-[1280px]:w-[400px] w-[280px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] h-[200px] lg:w-[600px] 2xl:h-[250px] lg:h-[400px] object-cover my-[30px]"
                                            src={i.url}
                                            alt=""
                                        />
                                    )}
                                    {i.type === "VIDEO" && (
                                        <video
                                            className="rounded-3xl 2xl:w-[600px] min-[1280px]:w-[400px] w-[280px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] h-[200px] lg:w-[600px] lg:h-[400px] 2xl:h-[250px] object-cover my-[30px]"
                                            src={i.url}
                                            controls></video>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex items-start w-full gap-x-[30px]">
                    <div className="flex items-center gap-x-2">
                        <button
                            onClick={() => handleLike(e?._id)}
                            className="flex active:scale-125 items-center gap-x-[6px]">
                            {e?.likes?.length >= 1 ? (
                                <FcLike className="text-xl " />
                            ) : (
                                <GoHeart className="text-xl " />
                            )}
                        </button>
                        <p>{e?.likes?.length}</p>
                    </div>
                    <p className="flex items-center gap-x-[6px]">
                        <IoChatbubbleEllipsesOutline className="text-xl text-[#877EFF]" />
                        17.2 k
                    </p>
                    <p className="flex items-center gap-x-[6px]">
                        <RiShareForwardLine className="text-xl text-[#877EFF]" />
                        32.1 k
                    </p>
                </div>
            </div>
        </div>
    ));


    interface Profile {
        name: string;
        profileImg: string;
    }

    const profileData: Profile[] = [
        { name: "My Story", profileImg: rasm },
        { name: "johnsc", profileImg: rasm2 },
        { name: "ednamz", profileImg: rasm3 },
        { name: "Harrypres", profileImg: rasm4 },
        { name: "joeburto", profileImg: rasm5 },
        { name: "romanrie", profileImg: rasm6 }
    ];

    const story: JSX.Element[] = profileData.map((profile, index) => (
        <div key={index} className="flex flex-col items-center">
            <div className="w-[50px] h-[50px] lg:w-[72px] lg:h-[72px] rounded-full">
                <img
                    className="rounded-full m-[3px] border-[3px] border-[#877EFF]"
                    src={profile.profileImg}
                    alt={profile.name}
                />
            </div>
            <p className="text-white text-[9px] lg:text-xs font-semibold">
                {profile.name}
            </p>
        </div>
    ));


    const { data, isLoading } = useGetUsersQuery({ limit: 8 });
    const [followUser] = useFollowMutation();
    const userState = useSelector((state: RootState) => state.auth.user);
    const handleFollow = (username: string) => followUser(username);

    const TopCreators: JSX.Element[] = data?.map(
        (user: User): JSX.Element => (
            <div className="border border-[#1F1F22] rounded-[20px] py-[24px]  flex flex-col" key={user._id}>
                <div className="flex flex-col items-center">
                    <Link to={`/users/${user?.username}`}>
                        <img className="w-[54px] h-[54px] rounded-full" src={import.meta.env.VITE_APP_BASE_URL + user.photo} alt="User img" />
                    </Link>
                    <p className="text-white flex text-center font-semibold ">{user.fullName}</p>
                    <p className="text-[10px] font-medium text-[rgb(120,120,163)] text-center mb-3">
                        Followed by Akbarjon
                    </p>
                    {user.followers.some(
                        (item) => item._id === userState?._id
                    ) ? (
                        <button
                            onClick={() =>
                                handleFollow("unfollow/" + user.username)
                            }
                            className="block text-xs text-neutral-700 font-semibold py-[6px] px-[18px] rounded-lg bg-[#FFB620]">
                            Unfollow
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                handleFollow("follow/" + user.username)
                            }
                            className="block text-xs text-white font-semibold py-[6px] px-[18px] rounded-lg bg-[#877EFF]">
                            Follow
                        </button>
                    )}
                </div>
            </div>
        )
    );
    return (
        <div className="flex justify-between items-start">
            <div className="pt-5 px-3 lg:pt-[60px] w-full lg:w-[705px] 2xl:px-[54px]">
                <div className="">
                    <div className="flex items-center overflow-hidden gap-x-[21px]">
                        {story}
                    </div>
                </div>
                <div className="">
                    <h2 className="text-lg lg:text-[30px] font-bold text-white py-10">
                        Home Feed
                    </h2>
                    <div className="text-white lg:px-7 2xl:py-8">
                        <div>
                            <div className="flex items-center gap-x-[10px]">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={
                                        import.meta.env.VITE_APP_BASE_URL +
                                        userState?.photo
                                    }
                                    alt="img"
                                />
                                <div>
                                    <p className="text-lg font-bold">
                                        {userState?.username}
                                    </p>
                                    <p className="text-sm text-[#7878A3]">
                                        {userState?.fullName}
                                    </p>
                                </div>
                            </div>
                            {isProLoading ? (
                                <div className="flex flex-col w-[420px] 2xl:w-auto items-center">
                                    <Loading />
                                </div>
                            ) : (
                                <div className="flex flex-col min-[480px]:w-[420px] pb-20 2xl:w-auto items-center">
                                    {proPosts}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[465px] hidden min-[1280px]:block fixed top-0 right-0 z-10 min-h-screen bg-[#09090A] border-l border-[#1F1F22]">
                <div className="pt-12 pl-6 w-[465px] pr-[37px] pb-10">
                    <h3 className="text-white text-[24px] font-bold mb-10">Top Creators</h3>
                    {isLoading ? (
                        <UserLoading/>
                    ) : (
                        <div className="grid grid-cols-2 gap-[24px] h-[100vh] overflow-x-auto overflow-scroll pb-[150px]">{TopCreators}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default House;
