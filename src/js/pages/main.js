import React from 'react'
import { Link } from "react-router-dom";

export default class Main extends React.Component {
    render() {
        return (
            <div className="page">
                <div className="text">hello</div>
                <Link to="/slider" className="button">Слайдер</Link>
            </div>
        )
    }
}
