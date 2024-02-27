import { Card } from "flowbite-react";
import { CARDBOOK } from "../models";

const DashBoardCard = ({book} : CARDBOOK) => {
    return (
        <Card href={`dashboard/book/${book._id}`}>
            <p className="font-bold capitalize">{book.title}</p>

            <p className="line-clamp-2">{book.content}</p>

            <small className="bg-teal-50 w-fit text-teal-900 capitalize">{book.genre}</small>
        </Card>
    );
}

export default DashBoardCard;