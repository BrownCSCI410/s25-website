import React from "react";
import { TableSection } from "../TableSection/TableSection";
import {RowOptions } from "../TableSection/TableSection";

interface CodeAlongProps {}

export class CodeAlong extends React.Component<CodeAlongProps> {
    
    myHeader: string[] = [ "Code-Along", "Related To", "Date #1", "Date #2", "Video", "Stencil" ,
    ];

    myRows: RowOptions[] = [
        { cellNames: ["Java Syntax", "Rattytouille", "Sept 13 from 5 - 6 PM \n MacMillan 117", "Sept 15 from 3 - 4:30 PM \n MacMillan 117", "Video", "Stencil"], cellNametoLinks: new Map<string,string>() },
        { cellNames: ["Writing Classes", "AndyBot, Pong, Tictactoe", "Sept 19 from 7 - 8:30 PM \n Friedman 202", "Sept 21 from 3 - 4:30 PM  \n Friedman 202", "Video", "Stencil"], cellNametoLinks: new Map<string,string>() },
        { cellNames: ["Polymorphism", "Fruit Ninja", "Oct 2 from 5:30 - 7 PM \n MacMillan 117", "Oct 4 from 4 - 5 PM \n MacMillan 117", "Video", "Stencil"], cellNametoLinks: new Map<string,string>() },
        { cellNames: ["JavaFX & Design", "Cartoon", "Oct 10 from 7 - 8:30 PM \n Friedman 202", "Oct 15 from 4 - 5:30PM \n LOCATION TBD", "Video", "Stencil"], cellNametoLinks: new Map<string,string>() },
        { cellNames: ["Github & Debugging", "Doodle Jump", "Oct 22 from 5:30 - 7 PM \n MacMillan 117 ", "Oct 24 from 6 - 7:30 PM \n LOCATION TBD", "Video", "Stencil"], cellNametoLinks: new Map<string,string>() },
        { cellNames: ["Tetris Pieces", "Tetris", "Nov 3 from 3 - 4:30 PM \n MacMillan 117", "Nov 4 from 5:30 - 7 PM \n MacMillan 117", "Video", "Stencil"], cellNametoLinks: new Map<string,string>() },

    
    
    
    ];

    render() {
        return (

            <section id= 'codealong' className= 'anchor'>




            <div className = 'content-container'>

                <h2>Code Alongs</h2>
                <TableSection header={this.myHeader} rows={this.myRows} 
                blurb= {`CS15 Code-Alongs are your one stop shop for getting hands-on experience with guided coding exercises in order to better understand the concepts of OOP! We know that lectures can at times feel very abstract, and that we sometimes need examples in code in order to fully understand how these concepts work.
                Throughout the semester, we will host various code-alongs in order to assist you all with the skills necessary for succeeding in the course!`} />
            </div>
            
            </section>



        );
    }
}
