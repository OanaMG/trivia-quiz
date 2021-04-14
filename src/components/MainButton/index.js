import React from 'react';
import { Button } from "@chakra-ui/react"

function MainButton({handleClick, buttonText}) {
    return (
        <Button ml="5%" mb="1.5%" colorScheme="teal" variant="solid" onClick={handleClick}>{buttonText}</Button>
    )
}

export default MainButton;