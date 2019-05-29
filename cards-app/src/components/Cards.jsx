import React from "react";
import {Card} from "./Card";

export const Cards = (props) => {
    return (
        <React.Fragment>
            {props.profiles.map((userInfo) => {
                return <Card className="card-test" key={userInfo.id} name={userInfo.name} avatar_url={userInfo.avatar_url} />
            })}
        </React.Fragment>
    )
}