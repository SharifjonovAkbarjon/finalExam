const DetailLoading = () => {
    return (
        <div>
            <div className="flex flex-col gap-y-3 mb-3 lg:flex-row items-start gap-x-8">
                <div className="w-[150px] h-[150px]  rounded-[50%] border-2 border-[#1F1F22] detailLoading"></div>
                <div className="flex flex-col gap-y-3">
                    <div className="border-[#1F1F22] border w-[400px] rounded-[50%] h-[40px] detailLoading"></div>
                    <div className="flex gap-2 mt-[40px]">
                        <div className="border-[#1F1F22] border w-[80px] rounded-[50px] h-[40px] detailLoading"></div>
                        <div className="border-[#1F1F22] border w-[80px] rounded-[50px] h-[40px] detailLoading"></div>
                        <div className="border-[#1F1F22] border w-[80px] rounded-[50px] h-[40px] detailLoading"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-3 mb-3 lg:flex-row items-start gap-x-8">
                <div className="flex flex-col gap-y-3 ml-[180px]">
                    <div className="border-[#1F1F22] border w-[400px] rounded-[50%] h-[40px] detailLoading"></div>
                    <div className="border-[#1F1F22] border w-[400px] rounded-[50%] h-[40px] detailLoading"></div>
                    <div className="border-[#1F1F22] border w-[400px] rounded-[50%] h-[40px] detailLoading"></div>
                </div>
            </div>
        </div>
    )
}

export default DetailLoading