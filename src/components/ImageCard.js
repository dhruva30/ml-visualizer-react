import React, { Component } from 'react'

export default class ImageCard extends Component {
    render() {
        return (
            <div className="card" style={{ textAlign: 'center' }}>
                <h5 className="card-title">{this.props.title}</h5>
                <span className="card-body-text">
                            {this.props.description}
                                    </span>
                <img  src={`${this.props.imageUrl}?${Date.now()}`} alt="training_result" height="400px" />
            </div>
        )
    }
}
