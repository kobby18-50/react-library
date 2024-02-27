import { Button, Card } from "flowbite-react";
import { CARDBOOK } from "../models";



const CardComponent = ({book} : CARDBOOK ) => {
    return ( 
        <Card className="max-w-xs">
            <h5 className="text-sm bg-teal-100 w-fit p-1 rounded-lg text-teal-900 font-semibold capitalize">{book.genre}</h5>
      <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        {book.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        {book.content}
      </p>
      <a href={`/book/${book._id}`}>
      <Button>
        Read more
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      </a>
    </Card>
     );
}
 
export default CardComponent;