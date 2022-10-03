import React from 'react'
import { ReactDOM } from 'react'


const collection = [
    {name: "Bulbasaur"},
    {name: "Ivysaur"},
    {name: "Venussaur"}
]

function Pokemon(props) {
    return <h1>{props.name}</h1>
}


function Apps() {

    let [index, setIndex] = React.useState(0);


    return (

        <div>
            <button type="button" onClick={() => setIndex(index + 1)}>
                Next
            </button>
            <Pokemon name={collection[index].name} />
        </div>
    )
}
export default Apps;