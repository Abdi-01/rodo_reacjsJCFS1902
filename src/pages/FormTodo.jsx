import React from 'react';
import TableData from '../components/TableData';
import axios from "axios";
import ModalAdd from '../components/ModalAdd';

class FormPage extends React.Component {
    // 1. urutan render pertama compoenent react
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            todo: "",
            location: "",
            note: "",
            selectedIdx: null,
            todoList: []
        }
    }

    // 3. urutan ke 3
    // menjalankan sebuah fungsi secara otomatis, pertama kali saat component atau page react js di render
    componentDidMount() {
        // fungsi yang digunakan untuk melakukan request data pertama kali ke backend
        this.getData();
    }


    getData = () => {
        // Axios : melakukan request data ke back-end atau API
        axios.get(`http://localhost:2000/todoList`)
            .then((response) => {
                // Masuk kedalam then ketika berhasil mendapat response dari json-server
                // console.log(response.data)
                // menyimpan data response kedalam state
                this.setState({ todoList: response.data })
            }).catch((err) => {
                // Masuk kedalam catch ketika gagal mendapat response dari json-server
                console.log(err)
            })
    }



    btSubmit = () => {
        let { date, todo, location, note } = this.state; // destructure
        //    axios
        axios.post(`http://localhost:2000/todoList`, {
            date,
            todo,
            location,
            note,
            status: "on going"
        }).then((response) => {
            console.log(response.data)
            // memanggil data terbaru untuk memperbarui data pada state
            this.getData()
            this.setState({
                date: "",
                todo: "",
                location: "",
                note: ""
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    btDelete = (idx) => {
        let temp = [...this.state.todoList]
        temp.splice(idx, 1)
        this.setState({ todoList: temp })
    }

    btEdit = (idx) => {
        this.setState({ selectedIdx: idx })
    }

    printData = () => {
        return this.state.todoList.map((value, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{value.date}</td>
                    <td>{value.todo}</td>
                    <td><img src={value.location} width="50%" alt="..." /></td>
                    <td>{value.note}</td>
                    <td>{value.status}</td>
                    <td>
                        <button className="btn btn-danger" type="button" onClick={() => this.btDelete(index)}>Delete</button>
                        <button className="btn btn-warning" type="button" onClick={() => this.btEdit(index)} data-toggle="modal" data-target="#editModal">Edit</button>
                    </td>
                </tr>
            )
        })
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }


    // 2. urutan kedua 
    render() {
        //    console.log( this.posisi)
        return (
            <div className="m-auto p-4">
                <ModalAdd
                    handleInput={this.handleInput}
                    date={this.state.date}
                    todo={this.state.todo}
                    location={this.state.location}
                    note={this.state.note}
                    btSubmit={this.btSubmit}
                />
                {/* Modal Edit */}
                {
                    this.state.todoList.length > 0 && this.state.selectedIdx != null ?
                        <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="editModalLabel">Add Product</h5>
                                        <button type="button" className="btn btn-outline-secondary close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form >
                                            <div className="form-group">
                                                <label for="exampleInputPassword1">Date</label>
                                                <input type="date" className="form-control" id="exampleInputPassword1"
                                                    defaultValue={this.state.todoList[this.state.selectedIdx].date} onChange={(event) => this.props.handleInput(event.target.value, "date")}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputPassword1">To Do</label>
                                                <input type="text" className="form-control" id="exampleInputPassword1"
                                                    defaultValue={this.state.todoList[this.state.selectedIdx].todo} onChange={(event) => this.props.handleInput(event.target.value, "todo")}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputPassword1">Location</label>
                                                <input type="text" className="form-control" id="exampleInputPassword1"
                                                    defaultValue={this.state.todoList[this.state.selectedIdx].location} onChange={(event) => this.props.handleInput(event.target.value, "location")}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputPassword1">Note</label>
                                                <textarea className="form-control" id="exampleInputPassword1"
                                                    defaultValue={this.state.todoList[this.state.selectedIdx].note} onChange={(event) => this.props.handleInput(event.target.value, "note")}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button>
                                        <button type="button" className="btn btn-primary" >Save</button>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }
                <TableData cetak={this.printData()}>
                    {this.printData()}
                </TableData>
                {/* </div> */}
            </div>
        );
    }
}

export default FormPage;