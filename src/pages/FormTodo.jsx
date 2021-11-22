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
        alert(`${this.state.date} ${this.state.todo}`)

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
                </tr>
            )
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
                        <input type="date" className="form-control" id="exampleInputPassword1" onChange={(event) => this.handleInput(event.target.value, "date")} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">To Do</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" onChange={(event) => this.handleInput(event.target.value, "todo")} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Location</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Note</label>
                        <textarea className="form-control" id="exampleInputPassword1" />
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