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
            if (this.state.selectedIdx == index) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><input type="date" defaultValue={value.date} /></td>
                        <td><input type="text" defaultValue={value.todo} /></td>
                        <td><input type="text" defaultValue={value.location} /></td>
                        <td><input type="text" defaultValue={value.note} /></td>
                        <td><input type="text" defaultValue={value.status} /></td>
                        <td>
                            <button className="btn btn-danger" type="button" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button>
                            <button className="btn btn-warning" type="button">Save</button>
                        </td>
                    </tr>
                )
            } else {
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
                            <button className="btn btn-warning" type="button" onClick={() => this.btEdit(index)}>Edit</button>
                        </td>
                    </tr>
                )
            }
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
                <TableData cetak={this.printData()}>
                    {this.printData()}
                </TableData>
                {/* </div> */}
            </div>
        );
    }
}

export default FormPage;