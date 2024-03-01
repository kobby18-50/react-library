import EMPTY from '../assets/empty.png'


const EmptyCart = () => {
    return ( 
        <figure><img className="w-56 items-center justify-center" src={EMPTY} alt="empty" /> <span>No books to display</span></figure>
     );
}
 
export default EmptyCart;