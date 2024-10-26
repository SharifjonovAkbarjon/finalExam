const Loading = () => {
    return (
        <div>
            <div className="dark-skeleton rounded-[20px]  w-[600px] h-[200px]  my-[30px]"></div>
            <div className="flex gap-x-4">
                <div className="dark-skeleton w-[100px] h-[30px] rounded-[20px] "></div>
                <div className="dark-skeleton w-[100px] h-[30px] rounded-[20px] "></div>
                <div className="dark-skeleton w-[100px] h-[30px] rounded-[20px] "></div>
            </div>
        </div>

    )
}

export default Loading