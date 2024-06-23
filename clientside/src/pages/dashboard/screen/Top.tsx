import Rocket from '../../../assets/rocket.svg'

const Top = () => {
    return (
        <div className='w-screen grid grid-cols-1 md:grid-cols-5 gap-4 p-4 overflow-x-hidden'>
            <div className='col-span-5 md:col-span-1 rounded-xl bg-[var(--layer-color)] w-full h-[12rem] p-8 border-b-4 border-[--bg-color] block'>
                <div>
                    <p className="font-bold text-md ">Total Balance</p>
                </div>
                <div className="mt-2">
                    <p className="font-bold text-2xl">0.00</p>
                </div>
                <div className="mt-8">
                    <p className="text-sm ">Available Balance</p>
                </div>
            </div>

            <div className='col-span-5 md:col-span-2 rounded-xl justify-between w-[45rem] h-[12rem] p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  hidden md:flex'>
    <div className='grid gap-3'>
        <div>
         <p className="text-md text-white">Hi Victor</p>
        <p className="font-bold text-3xl text-white">Get Started with Ugwo</p>
        </div>       
        <button className="w-[6rem] bg-[--text-color] rounded-full text-sm text-white" onClick={() => '/deposit'}>Start Now</button>
    </div>
    <img src={Rocket} alt='' />
</div>

        </div>
    )
}

export default Top
