import React from 'react';
import TableData from '../components/TableData';
import axios from "axios";
import ModalAdd from '../components/ModalAdd';
import ModalEdit from '../components/ModalEdit';

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
        axios.delete(`http://localhost:2000/todoList/${this.state.todoList[idx].id}`)
            .then((response) => {
                this.getData()
            }).catch((err) => {
                console.log(err)
            })
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
                        <button className="btn btn-warning" type="button" data-toggle="modal" data-target="#editModal" onClick={() => this.btEdit(index)}>Edit</button>
                    </td>
                </tr>
            )
        })
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }

    btSave = () => {
        let { date, todo, location, note, todoList, selectedIdx } = this.state
        console.log(date, todo, location, note)
        let editData = {
            date: date == "" ? todoList[selectedIdx].date : date,
            todo: todo == "" ? todoList[selectedIdx].todo : todo,
            location: location == "" ? todoList[selectedIdx].location : location,
            note: note == "" ? todoList[selectedIdx].note : note
        }

        axios.patch(`http://localhost:2000/todoList/${todoList[selectedIdx].id}`, editData)
            .then((response) => {
                this.getData()
                this.setState({
                    date: "",
                    todo: "",
                    location: "",
                    note: "",
                    selectedIdx: null
                })
            }).catch((err) => {
                console.log(err)
            })
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
                        <ModalEdit
                            date={this.state.todoList[this.state.selectedIdx].date}
                            todo={this.state.todoList[this.state.selectedIdx].todo}
                            location={this.state.todoList[this.state.selectedIdx].location}
                            note={this.state.todoList[this.state.selectedIdx].note}
                            handleInput={this.handleInput}
                            btCancel={() => this.setState({ selectedIdx: null })}
                            btSave={this.btSave}
                        />
                        : null
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