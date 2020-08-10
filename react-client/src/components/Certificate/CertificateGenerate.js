import React, { Component } from 'react'
import Logo from './CertificateTemplate.svg'

export class CertificateGenerate extends Component {
    render() {
        return (
            <svg id="conv-png" style={{ width: "1000px", height: "730px", position: "relative" }}>
                <image xlinkHref={Logo} width="100%" />
                <text x="67" y="278" fontSize="3.5em">{this.props.userName}</text>
                <text x="180" y="629" fontSize="1.2em">{this.props.issueDate}</text>
                <text x="180" y="665" fontSize="0.8em">{this.props.certificateNo}</text>
            </svg >
        )
    }
}

export default CertificateGenerate
