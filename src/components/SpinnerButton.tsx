import { Button, Spinner } from "flowbite-react";

const SpinnerButton = () => {
    return (
        <Button disabled className="w-full">
            <Spinner />
        </Button>
    );
}

export default SpinnerButton;