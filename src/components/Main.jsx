import React from "react"
import Card from "./Card"
import CardInfo from "./CardInfo"

export default function Main() {
    return(
        <div className="container">
            <div className="leftSpace">
            <Card />
            <Card />
            <Card />
            <Card />
            </div>
            <div className="rightSpace">
            <CardInfo />
            </div>
        </div>
    )
}