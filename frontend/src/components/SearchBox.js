import {Button, Form, FormControl} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function SearchBox() {
    const [keyword, setKeyword] = useState('')


    const navigate = useNavigate()


    function submitHandler(e) {
        e.preventDefault()
        if (keyword === '') {
            navigate(`/`)
        }
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        }


    }

    return (

        <Form onSubmit={submitHandler} className="d-flex align-items-center">
            <FormControl
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
            <Button type='submit' className='search-button'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </Button>

            <style jsx>{`
              /* Styles for larger screens */
              .search-input {
                width: 400px;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-right: 10px;
              }

              .search-button {
                background-color: #007bff;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
              }

              /* Media query for smaller screens (e.g., smartphones) */
              @media (max-width: 576px) {
                .search-input {
                  margin-left: 2px;
                  width: 90%; /* Take up full width */
                  margin-right: 0; /* No margin on small screens */
                  margin-bottom: 10px; /* Add some space between input and button */
                  margin-top: 10px; /* Add some space between input and button */
                }

                .search-button {
                  margin-left: 3px;
                  width: auto; /* Take up full width */
                }
              }
            `}</style>
        </Form>

    )
}

export default SearchBox