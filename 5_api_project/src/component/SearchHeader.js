import { useState } from "react";


function SearchHeader({ search }) {

    // input deki degeri tutacak
    const [valueInput, setValueInput] = useState('');

    // form submit olunca çalısacak
    const handleFormSubmit = (event) => {
        event.preventDefault(); // sayfa yenilenmesini engeller
        search(valueInput);
    };

    const handleChange = (event) => {
        setValueInput(event.target.value); // input deki degeri al
    };

    return (
        <div className="searchDiv">
            <form onSubmit={handleFormSubmit}>
                <label>Ne Arıyorsunuz?</label>
                <input value={valueInput} onChange={handleChange} />
            </form>
        </div>
    );
}

export default SearchHeader;