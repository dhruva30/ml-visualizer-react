import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';


export default class Codeblock extends Component {
    render() {
        return (
            <div className="card">
            <h6 className="card-title" style={{textAlign:'center'}}>Code</h6>
            <SyntaxHighlighter language={this.props.language} style={dracula}>
              {this.props.code}
            </SyntaxHighlighter>
            </div>
        )
    }
}
