import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';
// Icons
import { AiOutlineInfoCircle } from "react-icons/ai";
// Components
import List_element from './components/list-element.js';
// Variables
let json_data = require('./data.json');
const filter_options = [
  { value: 2, label: 'Show all tasks' },
  { value: 1, label: 'Show all complete tasks' },
  { value: 0, label: 'Show all incomplete tasks' }
];
const state_options = [
  { value: 0, label: 'Incomplete' },
  { value: 1, label: 'Complete' }
]
//
function App() {
  const [data, set_data] = useState(json_data);
  const [filter, set_filter] = useState(2);
  const [show_creation, set_show_creation] = useState(false);
  // Task creation
  const [new_name, set_new_name] = useState("");
  const [new_description, set_new_description] = useState("");
  const [new_state, set_new_state] = useState(0);
  const [name_err, set_name_err] = useState(false);

  useEffect(() => {
    if (filter === 2) {
      set_data(json_data);
      return;
    }
    set_data([])
    let temp_arr = []

    json_data.filter((dat, i) => {
      if (dat.state == filter) {
        dat.index = i
        temp_arr.push(dat)
      }
    })

    set_data(temp_arr)
  }, [filter])

  function _update_data(new_data, index) {
    json_data[index] = new_data;
    set_filter(filter)
  }

  function _delete_data(index) {
    json_data.splice(index, 1)
    set_filter(filter)
  }

  /* Functions for Task creation*/
  function variable_reset_for_task_creation() {
    set_show_creation(false);
    set_new_name("");
    set_new_description("");
    set_new_state(0);
  }

  function create_task() {
    if (new_name.trim() == "") {
      set_name_err(true);
      return
    }

    json_data.push({
      "name": new_name.trim(),
      "description": new_description.trim(),
      "state": new_state,
      "index": json_data.length
    })
    set_filter(filter)
    variable_reset_for_task_creation();
  }

  return (
    <>
      <Helmet>
        <title> TO-DO LIST | Koriťák Ondřej </title>
        <style>{"body { background-color: lightgrey }"}</style>
      </Helmet>
      {/* Body */}
      <body>
        <div className='container'>
          <div className='card border-0 shadow my-5'>
            <div className='card-body p-5'>
              <h1> <b> TO-DO LIST </b> </h1>
              <div className='row' style={{ marginBottom: "5px" }}>
                <div className='col-sm-5 col-md-6 col-lg-7 mx-auto'>
                  {data.length != 0 ? <h4> Number of tasks to do: {data.length} </h4> :
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto data-result"> <p> <b> NO TASKS TO DO </b> </p> </div>}
                </div>
                <div className='col-sm-5 col-md-4 col-lg-3 mx-auto'>
                  <Select
                    aria-labelledby="aria-label"
                    inputId="aria-example-input"
                    name="aria-live-color"
                    placeholder="Choose filter"
                    onChange={(e) => { set_filter(e.value) }}
                    options={filter_options}
                    defaultValue={filter_options[0]} />
                </div>
                <div className='col-sm-2 col-md-2 col-lg-2 mx-auto'>
                  <button
                    type="button"
                    className="btn btn-success btn-lg col-sm-12 col-md-12 col-lg-12"
                    onClick={() => { set_show_creation(true) }}>
                    Add task
                  </button>
                </div>
              </div>
              {
                data.map((val, i) => {
                  return (
                    <>
                      {i != 0 ? "" :
                        <>

                        </>}
                      <List_element data={val} index={i} update_data={_update_data} delete_data={_delete_data} />
                    </>
                  );
                })
              }
            </div>
          </div>
        </div>
      </body >
      {/* Modal for creation of a new task */}
      <Modal
        show={show_creation}
        size="lg"
        onHide={() => { variable_reset_for_task_creation() }}
        keyboard={false}
      //backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title> <b> ADD TASK </b></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingLeft: '15px' }}>
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12 mx-auto'>
              <TextField
                error={name_err}
                className='col-sm-12 col-md-12 col-lg-12'
                label="Task title*"
                type="text"
                defaultValue=""
                value={new_name}
                onChange={(e) => { set_new_name(e.target.value); set_name_err(false) }}
              />
            </div>
          </div>
          <div className='new-line' />
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12 mx-auto'>
              <TextField
                className='col-sm-12 col-md-12 col-lg-12'
                label="Task description"
                type="text"
                defaultValue=""
                value={new_description}
                multiline
                rows={5}
                onChange={(e) => { set_new_description(e.target.value); }}
              />
            </div>
          </div>
          <div className='new-line' />
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12 mx-auto'>
              <label> State of the task </label>
              <Select
                className='col-sm-12 col-md-12 col-lg-12'
                aria-labelledby="aria-label"
                inputId="aria-example-input"
                name="aria-live-color"
                placeholder="Choose task state"
                onChange={(e) => { set_new_state(e.value) }}
                options={state_options}
                defaultValue={state_options[0]} />
            </div>
          </div>
          <div className='new-line' />
          <a> <i> <AiOutlineInfoCircle /> * Must be filled in </i> </a>
          <div className='new-line' />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary" onClick={() => { create_task() }}>
            CREATE TASK
          </button>
          <button type="button" className="btn btn-danger" onClick={() => { variable_reset_for_task_creation() }}> CLOSE </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
