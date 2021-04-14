import React from 'react';
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";


function RadioCategories ({value, setValue, category1Text, category2Text, category3Text}) {

    return (
        <RadioGroup onChange={setValue} value={value} colorScheme="teal">
            <Stack direction="row" wrap="wrap" border="2px" borderRadius="md" width="30%" justifyContent="space-evenly" alignItems="center" padding="0.25%" ml="5%" mb="1%" bg="yellow.600">
                <Radio id="category1" value="books" size="lg">{category1Text}</Radio>
                <Radio id="category1" value="movies" size="lg" >{category2Text}</Radio>
                <Radio id="category1" value="videoGames" size="lg" >{category3Text}</Radio>
            </Stack>
        </RadioGroup>
    )

    
}

export default RadioCategories;

