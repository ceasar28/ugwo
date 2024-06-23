import Top from './screen/Top'
import Transaction from './screen/Transaction'



const Dashboard = () => {
    return (
        <section className='md:pl-[14rem] bg-[--text-extra] min-h-[30rem] top-0 overflow-x-hidden overflow-y-auto'>
            <div className="grid justify-between">
               <div className="max-w-[120rem] grid justify-between py-10 gap-6 mx-4">
                    <Top/>
                    <Transaction/>
                </div>
            </div>            
        </section>
    )
}

export default Dashboard
