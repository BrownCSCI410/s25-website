import React, { JSX } from "react";



export interface RowOptions {
    cellNames: string[]
    cellNametoLinks: Map<string,string>
    autoReleaseDate?: string;
}


interface TableSectionProps {
    blurb?: string
    header: string[]
    rows: RowOptions[]
    
}

export class TableSection extends React.Component<TableSectionProps> {

    constructor(props: any) {
        super(props);
    }

    renderTable () {
        let regRows: JSX.Element[] = []

        for(let i=0; i< this.props.rows.length; i++){
            regRows.push(this.renderRow(this.props.rows[i]))
        }
        

        return(
            <div className = 'table-container'>

                <table>
                    <tbody>
                    {this.renderRow()}
                    {regRows}
                    </tbody>

                </table>
            </div>

        )
   
    }

    renderRow(cells?: RowOptions) {
        let row: JSX.Element[] = [];
        
        if (cells){
            for (let i = 0; i < cells.cellNames.length; i++) { //rendering the normal rows

                const data = cells.cellNametoLinks.get(cells.cellNames[i]) ? <td key={i}> <a href= {`${cells.cellNametoLinks.get(cells.cellNames[i])}`}> {cells.cellNames[i]} </a></td> : <td key={i}> {cells.cellNames[i]}</td>
                row.push(data);
            }
        }

        else{
            for (let i=0; i < this.props.header.length; i++){ //rendering the headers 
                row.push(<th key={i}> {this.props.header[i]}</th>)             
            }

        }

        return (
            <tr>
                {row}
            </tr>
        );
    }
    

   render() {
    return(
        <div>
            {this.props.blurb ? <div className="description">
                <p> {this.props.blurb}</p>
            </div> : ""}
            {this.renderTable()}
        </div>
    )
   }



}