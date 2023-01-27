import React, { Component } from 'react';

import Form from './components/Form';
import Content from './components/Content';
import Questions from './components/Questions';

const callisto_api = window.location.href + "api/"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      term: "",
      content: "",
      questions: []
    }
    this.onSearchTerm = this.onSearchTerm.bind(this)
  }

  onSearchTerm(term) {
    this.setState({ term, content: "", questions: [] })
    fetch(callisto_api + term)
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      let temp = []
      let questions = data.semantic_roles.filter((role) => {
        if (temp.includes(role.sentence)) { return false } else { temp.push(role.sentence); return true }
      })

      questions = questions.map((q, i) => {
        return {
          id: i,
          question: q.sentence.replace(q.subject.text.trim(), new Array(q.subject.text.length).fill("_").join('')),
          answer: q.subject.text.trim()
        }
      })

      this.setState({ term: this.state.term, content: data.analyzed_text.trim().replace(/[^\x20-\x7E]/gmi, ""), questions })

    })
  }

  render() {
    return (
      <div className="app">
        <h1>Callisto</h1>
        <Form searchTerm={this.onSearchTerm} />
        <Content content={this.state.content} />
        <Questions questions={this.state.questions} />
      </div>
    );
  }
}


