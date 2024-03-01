import { Avatar } from "flowbite-react";

const CustomAvatar = () => {

    const user = {
        fname : localStorage.getItem('fname'),
        lname : localStorage.getItem('lname')
    }
       
    
        console.log(user)
    return ( 
        <Avatar rounded>
                        <div className="space-y-1 font-medium dark:text-white">
                            <div className="flex space-x-2">
                                <span>{user.fname}</span>
                                <span>{user.lname}</span>
                                </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Author</div>
                        </div>
                    </Avatar>
     );
}
 
export default CustomAvatar;