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

    renderTable () {
        let regRows: JSX.Element[] = []

        for(let i=0; i< this.props.rows.length; i++){
            regRows.push(this.renderRow(this.props.rows[i], i))
        }
        

        return(
            <div className = 'table-container'>

                <table>
                    <tbody>
                    {this.renderRow(undefined, 'header')}
                    {regRows}
                    </tbody>

                </table>
            </div>

        )
   
    }

    renderRow(cells?: RowOptions, key?: number | string) {
        let row: JSX.Element[] = [];
        
        if (cells){
            for (let i = 0; i < cells.cellNames.length; i++) { //rendering the normal rows
                const link = cells.cellNametoLinks.get(cells.cellNames[i]);
                const data = link ? (
                    <td key={`${key}-cell-${i}`}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {cells.cellNames[i]}
                    </a>
                  </td>
                ) : (
                  <td key={`${key}-cell-${i}`}>{cells.cellNames[i]}</td>
                );
                row.push(data);
            }
        }

        else{
            for (let i=0; i < this.props.header.length; i++){ //rendering the headers 
                row.push(<th key={`header-${i}`}> {this.props.header[i]}</th>)             
            }

        }

        return (
            <tr key={key}>
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