import { Link, NavLink, Outlet } from "react-router-dom";
import { RiHome3Line } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { HiOutlineSaveAs } from "react-icons/hi";
import { TfiVideoClapper } from "react-icons/tfi";
import { TbLibraryPhoto, TbLogout2 } from "react-icons/tb";
import { IoChatbubbleEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { logout } from "../../redux/slice/auth-slice";
import { useProfileQuery } from "../../redux/api/user-api";
import { useState } from "react";
import logo from "../../assets/logo.svg";

const Home = () => {
    const { data: prodata } = useProfileQuery({});
    const userState = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logout());
    };
    const [display, setDisplay] = useState(false);
    return (
        <div className="container mx-auto">
            <div className="w-[266px] z-10 fixed left-0 bg-[#18141A] pt-7 pb-8 px-6  border-[#1F1F22]">
                <div className="flex flex-col ml-[27px]  bg-[#18141A]">
                    <Link to={"/"}>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className="flex items-center gap-x-2">
                        <div className="last__box">
                            <NavLink to={"/profile"}>
                                <div className="flex items-center gap-x-[11px] py-3">
                                    <img
                                        className="w-[30px] h-[30px] rounded-full"
                                        src={
                                            import.meta.env.VITE_APP_BASE_URL +
                                            userState?.photo
                                        }
                                        alt="User img"
                                    />
                                    <div>
                                        <h3 className="text-lg text-white font-bold">
                                            {userState?.fullName}
                                        </h3>
                                        <p className="text-sm text-[#7878A3]">
                                            {prodata?.username}
                                        </p>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-col gap-y-3 justify-between py-3 px-5 bg-[#18141A] list_box">
                    <li>
                        <NavLink
                            className="flex items-center gap-[10px] p-[10px] rounded-[8px] text-white hover:text-white hover:bg-[rgb(135,126,255)]"
                            to={"/"}>
                            <RiHome3Line className="w-[24px] h-[24px] text-[#877EFF] " />
                            <p className="text-[18px]">Home</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex items-center gap-[10px] p-[10px] rounded-[8px] text-white hover:text-white hover:bg-[rgb(135,126,255)]"
                            to={"/pageNot"}>
                            <TbLibraryPhoto className="w-[24px] h-[24px] text-[#877EFF] " />
                            <p className="text-[18px]">Explore</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex items-center gap-[10px] p-[10px] rounded-[8px] text-white hover:text-white hover:bg-[rgb(135,126,255)]"
                            to={"/people"}>
                            <BsPeople className="w-[24px] h-[24px] text-[#877EFF] " />
                            <p className="text-[18px]">People</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex items-center gap-[10px] p-[10px] rounded-[8px] text-white hover:text-white hover:bg-[rgb(135,126,255)]"
                            to={"/pageNot"}>
                            <HiOutlineSaveAs className="w-[24px] h-[24px] text-[#877EFF] " />
                            <p className="text-[18px]">Saved</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex items-center gap-[10px] p-[10px] rounded-[8px] text-white hover:text-white hover:bg-[rgb(135,126,255)]"
                            to={"/pageNot"}>
                            <TfiVideoClapper className="w-[24px] h-[24px] text-[#877EFF] " />
                            <p className="text-[18px]">Reels</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex items-center gap-[10px] p-[10px] rounded-[8px] text-white hover:text-white hover:bg-[rgb(135,126,255)]"
                            to={"/pageNot"}>
                            <IoChatbubbleEllipsesOutline className="w-[24px] h-[24px] text-[#877EFF] " />
                            <p className="text-[18px]">Chats</p>
                        </NavLink>
                    </li>
                    <li>
                    </li>
                </ul>
                {display === true ? (
                    <div className="list_box fixed right-0 top-[55px] bg-[#18141A] flex flex-col gap-y-2">
                        <button
                            onClick={() => handleLogOut()}
                            className="px-4 py-2 w-full rounded-lg text-lg hover:bg-neutral-300 hover:text-red-500 home_btn text-[#EFEFEF] font-medium flex items-center gap-x-4">
                            <TbLogout2 className="text-2xl text-[#877EFF] link__icon" />
                            Logout
                        </button>
                        <NavLink
                            onClick={() => setDisplay(false)}
                            className="px-4 py-2 w-full home_nav hover:bg-[#877EFF] rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/"}>
                            <IoSettingsOutline className="text-2xl text-[#877EFF] link__icon" />
                            Settings
                        </NavLink>
                    </div>
                ) : (
                    <div className="p-4 right-0 top-[55px] bg-[#18141A] flex flex-col gap-y-2">
                        <button onClick={() => handleLogOut()} className="px-4 py-2 w-full rounded-lg text-lg hover:bg-[#877EFF] text-[#EFEFEF] font-medium flex items-center gap-x-4">
                            <TbLogout2 className="text-2xl text-[#877EFF] link__icon" /> Logout
                        </button>
                        <NavLink onClick={() => setDisplay(false)}  className="px-4 py-2 w-full home_nav hover:bg-[#877EFF] rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4" to={"/pageNot"}>
                            <IoSettingsOutline className="text-2xl text-[#877EFF] link__icon" /> Settings
                        </NavLink>
                    </div>
                )}
            </div>
            <div className="ml-[266px] mx-auto container w-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
