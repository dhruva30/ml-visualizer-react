import React, { Component } from 'react'

export default class Table extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            {
                             this.props.columns.map((column,colIndex) =>  <th key={colIndex}>{column}</th>) 
                            }
                        </tr>
                    </thead>
                    <tbody>
                       {
                           this.props.data.map((row,rowIndex) => <tr key={rowIndex}>
                               {
                                   row.map((col,index) => <td key={index}>{col}</td >)
                               }
                           </tr>)
                       }
                    </tbody>
                </table>

            </div>
        )
    }
}
