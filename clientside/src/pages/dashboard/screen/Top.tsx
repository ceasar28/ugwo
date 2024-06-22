import Rocket from '../../../assets/rocket.svg'

const Top = () => {
    return (
        <div className='w-screen grid grid-cols-1 md:grid-cols-5 gap-4 p-4'>
            <div className='col-span-5 md:col-span-1 rounded-xl w-full h-[12rem] p-8 bg-[--bg-color] block'>
                <div>
                    <p className="font-bold text-md text-[--text-extra]">Total Balance</p>
                </div>
                <div className="mt-2">
                    <p className="font-bold text-2xl text-[--text-extra]">0.00</p>
                </div>
                <div className="mt-8">
                    <p className="text-sm text-[--text-extra]">Available Balance</p>
                </div>
            </div>

            <div className='col-span-5 md:col-span-2 rounded-xl  justify-between w-[50rem] h-[12rem] p-8 bg-[--layer-color] border-b-4   hidden md:flex'>
                <div>
                    <p className="font-bold text-md text-black">Total Balance</p>
                </div>
                <img src={Rocket} alt='' />
            </div>
        </div>
    )
}

export default Top
