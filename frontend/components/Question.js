import React, { Component } from 'react'

export class Question extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: "",
            mark: ""
        }
        this.onAnswerChange = this.onAnswerChange.bind(this)
    }

    onAnswerChange(e) {
        this.setState({ value: e.target.value }, () => {
            if (this.state.value.toLowerCase() === this.props.a.toLowerCase()) {
                this.setState({ value: this.state.value, mark: "o" })
            } else {
                this.setState({ value: this.state.value, mark: "" })
            }
        })
    }

    render() {
        return (
            <div>
                <p>{this.props.q}</p>
                <input type="text" value={this.state.value} onChange={this.onAnswerChange} />
                <p style={{ color: 'green' }}> {this.state.mark} </p>
            </div>
        )
    }
}


