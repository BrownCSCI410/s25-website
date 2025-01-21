import React from "react";
import { TableSection } from "../TableSection/TableSection";
import {RowOptions } from "../TableSection/TableSection";

interface AssignmentProps {}

/**
 * Returns whether or not <assignment> should appear as released yet
 * @param assignment the assignment that should or should not be released
 * @return true if "now" is after/on the release date, false otherwise
 */
function shouldRelease(assignment: RowOptions): boolean {
    if (assignment.autoReleaseDate === undefined) {
      return true; // If no defined release date, treat it as released if it has an href
    }
  
    const now = new Date();
  
    // Convert now into EST, if it isn't already
    const nowEST = new Date(
      now.toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
  
    return nowEST > new Date(assignment.autoReleaseDate);
}

export class Assignments extends React.Component<AssignmentProps> {
    
    myHeader: string[] = [
         "Assignment",
         "Out",
         "Due",
    ];

    myRows: RowOptions[] = [
        {
            cellNames: ["Homework 0: Uninformed Search", "1/22", "1/29"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 0: Uninformed Search", "https://hackmd.io/@cs410/HyJcHGsOR"]
            ]),
            autoReleaseDate: "Jan 22, 2025 01:00:00 EDT",
        },
        
        {
            cellNames: ["Homework 1: A*", "1/29", "2/5"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 1: A*", "https://hackmd.io/@cs410/SyRfGzVuA"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },        
        {
            cellNames: ["Homework 2: Adversarial Search", "2/5", "2/12"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 2: Adversarial Search", "https://hackmd.io/@cs410/HkoGT4muA"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Homework 3: SAT", "2/12", "2/19"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 3: SAT", "https://hackmd.io/@cs410/ryRXQUZcA"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Homework 4: Decision Trees", "2/19", "2/26"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 4: Decision Trees", "https://hackmd.io/@cs410/BkC3wh2i0"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Homework 5: Numpy/Linear Algebra/Probability Review, LP", "2/26", "3/5"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 5: Numpy/Linear Algebra/Probability Review, LP", "https://hackmd.io/@cs410/HyDxsO4JJe"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Homework 6: Linear Regression", "3/5", "3/12"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 6: Linear Regression", "https://hackmd.io/@cs410/H1zf78Z5R"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Homework 7: Neural Networks", "3/12", "3/19"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 7: Neural Networks", "https://hackmd.io/@cs410/BkAJXzKKA"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Homework 8: MDPs and Reinforcement Learning", "3/19", "4/2"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 8: MDPs and Reinforcement Learning", "https://hackmd.io/b5v4YzLPTgCN850dxSt2hg?view"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Homework 9: Reinforcement Learning and Function Approximation", "4/2", "4/9"], 
            cellNametoLinks: new Map<string, string>([
                ["Homework 9: Reinforcement Learning and Function Approximation", "https://hackmd.io/@cs410/HJCWTN7OA"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Final Project Part 1", "4/9", "4/16"], 
            cellNametoLinks: new Map<string, string>([
                ["Final Project Part 1", "assignments/Final_Project_Part_1.pdf"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Final Project Part 2", "4/16", "4/25"], 
            cellNametoLinks: new Map<string, string>([
                ["Final Project Part 2", "assignments/Final_Project_Part_2.pdf"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        {
            cellNames: ["Final Project Part 3", "4/25", "tbd"], 
            cellNametoLinks: new Map<string, string>([
                ["Final Project Part 3", "assignments/Final_Project_Part_3.pdf"]
            ]),
            autoReleaseDate: "Mar 16, 2025 04:00:00 EDT",
        },
        
    ];

    render() {
        // Modify the cellNametoLinks map based on the release status
        const modifiedRows: RowOptions[] = this.myRows.map(row => {
            if (!shouldRelease(row)) {
                const updatedLinks = new Map<string, string>();

                // Iterate over the original links and replace or remove them if necessary
                row.cellNametoLinks.forEach((value, key) => {
                    updatedLinks.set(key, "");
                });

                return {
                    ...row,
                    cellNametoLinks: updatedLinks,
                };
            }
            return row;
        });

        return (
            <section id= 'assignments' className = 'anchor'>
                <div className="content-container">
                    
                    <h2>Assignments</h2>
                    <p className="mb-5">Assignments will typically be released at 4:00 PM EST on Tuesdays and due at 11:59 PM EST on Tuesdays</p>
                    <TableSection header={this.myHeader} rows={modifiedRows} />
                        
                    
                </div>
            </section>

        );
    }
}
