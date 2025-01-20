import React from "react";

interface PopupSRCProps{
    title: string,
    link1: string,
    link2?: string,
    link3?: string
}

export class PopupSRC extends React.Component<PopupSRCProps> {
    constructor(props: any){
        super(props);
    }
    render () {
        return(
            <div className="card-staff">
                <h3>{this.props.title} </h3>
                <p>{this.props.link1}</p>
                <p>{this.props.link2}</p>
                <p>{this.props.link3}</p>
            </div>
        );
    }
}