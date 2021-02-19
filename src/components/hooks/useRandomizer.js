import { useState} from 'react';

function useRandomizer(min = 1, max = 151)
{
    const [number, setNumber] = useState(min);

    function randomize()
    {
        setNumber(Math.floor(Math.random()*max)+min)
    }

    return [number, randomize];
}

export default useRandomizer