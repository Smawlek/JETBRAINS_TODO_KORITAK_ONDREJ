import '../App.css';

import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
// Material
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
// React-icons
import { FaCircle } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
//
function List_element({ data, index, update_data, delete_data }) {
    const [name, set_name] = useState(data.name)
    const [show_detail, set_show_detail] = useState(false);
    const [show_component, set_show_component] = useState(true);
    //
    const [description, set_description] = useState(data.description)
    const [state, set_state] = useState(data.state)
    //
    useEffect(() => {
        set_name(data.name)
        set_description(data.description)
        set_state(data.state)
    }, [data])

    return (
        <>
            {!show_component ? "" :
                <div className='list_element-div margin-bottom'>
                    <div className='row'>
                        <div className='col-sm-1 col-md-1 col-lg-1 mx-auto list_element-div-content'>
                            <Tooltip placement='right' title={"State of task: " + (state == 0 ? 'Incomplete' : 'Complete')}>
                                <IconButton onClick={() => { set_state(!state); update_data(data, data.index); }}>
                                    <FaCircle className={state == 0 ? 'red' : 'green'} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className='col-sm-9 col-md-4 col-lg-6 mx-auto list_element-div-content'>
                            <h4> {name} </h4>
                        </div>
                        <div className='col-sm-2 col-md-4 col-lg-4 mx-auto list_element-div-content list_element-controller'>
                            <Tooltip placement='bottom' title={"Show task details"}>
                                <IconButton onClick={() => { set_show_detail(!show_detail) }}>
                                    <BiDetail />
                                </IconButton>
                            </Tooltip>
                            <Tooltip placement='bottom' title={"Delete task"}>
                                <IconButton onClick={() => { delete_data(data.index); set_show_component(false); }}>
                                    <FaTrash className='red' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>}
            {/* Modal for detailed view of the task */}
            <Modal
                show={show_detail}
                size="lg"
                onHide={() => { set_show_detail(false) }}
                keyboard={false}
                //backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title> <b> {name} </b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> <b> Description: </b> {description} </p>
                    <p> <b> State: </b>  {state == 0 ? <span className='red'> Incomplete </span> : <span className='green'> Complete </span>} </p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={() => { set_state(!state); update_data(data, data.index); }}> 
                    CHANGE STATE
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => { set_show_detail(false); delete_data(data.index); set_show_component(false); }}>
                        <FaTrash className='white' />
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => { set_show_detail(false) }}> CLOSE </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default List_element;
