const Action = () => {
    return (
        <div className='max-w-[60rem] overflow-scroll'>
            <div className="flex items-center justify-between gap-4 overflow-x-auto sm:overflow-x-scroll">
                <button className="text-black bg-[--button-color] w-[15rem] py-4 rounded-full">Send</button>
                <button className="text-white bg-[--hover-color] w-[15rem] py-4 rounded-full">Request</button>
                <button className="text-black bg-[--base-color] w-[15rem] py-4 rounded-full">Deposit</button>               
                <button className="text-white bg-[--text-color] w-[15rem] py-4 rounded-full">Invite</button>
            </div>            
        </div>
    )
}

export default Action
