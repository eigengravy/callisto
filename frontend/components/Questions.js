import React from 'react'
import { Question } from './Question';

export default function Questions(props) {
    return (
        <div>
            {
                props.questions.map((question) => {
                    return <Question q = { question.question } a = {question.answer} key = {question.id} />
               })
            }
        </div>
    )
}
