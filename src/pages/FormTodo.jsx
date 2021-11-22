import React from 'react';
import TableData from '../components/TableData';

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            todo: "",
            location: "",
            note: "",
            selectedIdx: null,
            todoList: [
                {
                    id: 1,
                    date: "20/11/2021",
                    todo: "Intro ReactJS",
                    location: "https://media.istockphoto.com/photos/protective-face-masks-and-hand-sanitizers-on-the-desks-according-to-picture-id1290836478",
                    note: "Prepare VSCode, Node js and CRA",
                    status: "Done"
                }
            ]
        }
    }

    btSubmit = () => {
        let { date, todo, location, note, todoList } = this.state; // destructure
        let temp = [...todoList]; // spread operator
        temp.push({
            // id: temp[temp.length - 1].id + 1
            id: temp.length + 1,
            date,
            todo,
            location,
            note,
            status: "ongoing"
        })

        this.setState({ todoList: temp })
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

    render() {
        //    console.log( this.posisi)
        return (
            <div className="row m-auto p-4">
                <form className="col-md-2">
                    <div className="form-group">
                        <label for="exampleInputPassword1">Date</label>
                        <input type="date" className="form-control" id="exampleInputPassword1"
                            onChange={(event) => this.handleInput(event.target.value, "date")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">To Do</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                            onChange={(event) => this.handleInput(event.target.value, "todo")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Location</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                            onChange={(event) => this.handleInput(event.target.value, "location")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Note</label>
                        <textarea className="form-control" id="exampleInputPassword1"
                            onChange={(event) => this.handleInput(event.target.value, "note")}
                        />
                    </div>
                    <button type='button' className="btn btn-primary" onClick={this.btSubmit}>Submit</button>
                </form>
                <div className="col-md-10">
                    <TableData cetak={this.printData()}>
                        {this.printData()}
                    </TableData>
                </div>
            </div>
        );
    }
}

export default FormPage;