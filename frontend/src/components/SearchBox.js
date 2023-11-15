import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchBox() {
    const [keyword, setKeyword] = useState('')


    const navigate = useNavigate()


    function submitHandler(e) {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        }

    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            >
            </Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'>
                SUBMIT
            </Button>

        </Form>

        // <div className="container">
        //
        //     {/*<div className="row height d-flex justify-content-center align-items-center">*/}
        //
        //     <div className="col-md-6">
        //
        //         <div className="form">
        //             <i className="fa fa-search"></i>
        //             <input type="text" className="form-control form-input" placeholder="Search anything..."/>
        //
        //         </div>
        //
        //     </div>
        //
        //     {/*</div>*/}
        //
        //     <Button
        //         type='submit'
        //         variant='outline-success'
        //         className='p-2'>
        //         SUBMIT
        //     </Button>
        // </div>
    )
}

export default SearchBox