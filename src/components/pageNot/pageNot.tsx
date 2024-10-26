import { useNavigate } from "react-router-dom";

const PageNot = () => {
    const navigate = useNavigate();
    return (
        <div className="">
            <div className="flex flex-col px-4 lg:px-0 items-center justify-center">
                <p className="text-blue-500 text-[58px] items-center mt-[200px] font-bold mb-8">
                    This page is not done yet
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-500 py-3 px-4 rounded-[50px] border border-blue-500">
                    Back to Home
                </button>

            </div>
        </div>
    );
};

export default PageNot;
