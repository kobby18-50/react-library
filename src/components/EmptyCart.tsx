import EMPTY from '../assets/empty.png'


const EmptyCart = () => {
    return ( 
        <figure className='flex flex-col'>
            <img className="w-56 items-center justify-center" src={EMPTY} alt="empty" />
             <p className='text-center'>No books to display</p>
             </figure>
     );
}
 
export default EmptyCart;