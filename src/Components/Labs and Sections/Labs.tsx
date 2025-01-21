import React from "react";
import { TableSection } from "../TableSection/TableSection";
import {RowOptions } from "../TableSection/TableSection";

interface LabProps {}

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

export class Labs extends React.Component<LabProps> {
    
    myHeader: string[] = [
        "Number",
        "Type",
        "Topic",
    ];

    myRows: RowOptions[] = [
        { cellNames: ["1", "SRC", "AI Policy"], 
            cellNametoLinks: new Map<string,string>([
                ["AI Policy", "https://docs.google.com/presentation/d/15RoAzqSn6n0et0vuz3wVfKwzR2j8hRHZt6AhLh6gAiU/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["2", "Conceptual", "HW 0 & 1"], 
            cellNametoLinks: new Map<string,string>([
                ["HW 0 & 1", "https://docs.google.com/presentation/d/1TRS4-CC0Z3uulEVKo0zqrslVNisIGql4Eq0UMcHG-2s/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["3", "SRC", "AI Energy Consumption"], 
            cellNametoLinks: new Map<string,string>([
                ["AI Energy Consumption", "https://docs.google.com/presentation/d/1fupjc6023mVVUJaY6cH0R9Noo75rYc8AHD3pExLT9w8/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["4", "Conceptual", "HW 2 & 3"], 
            cellNametoLinks: new Map<string,string>([
                ["HW 2 & 3", "https://docs.google.com/presentation/d/1RA8larz61mzTjGtP4Hr8Uie_JU7s6Gn8rtU5-IUWkd4/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["5", "SRC", "Algorithmic & Data Bias"], 
            cellNametoLinks: new Map<string,string>([
                ["Algorithmic & Data Bias", "https://docs.google.com/presentation/d/1792_1e7TOm1ez9-gzIdcxKDO8ZFycpmSqKr8k9ztUHE/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["6", "Conceptual", "HW 4 & 5"], 
            cellNametoLinks: new Map<string,string>([
                ["HW 4 & 5", "https://docs.google.com/presentation/d/1II1d81zPOD-5_hlc26ayx13Y8bN8LfINsWcG_kfljHU/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["7", "SRC", "Automation and Job Displacement"], 
            cellNametoLinks: new Map<string,string>([
                ["Automation and Job Displacement", "https://docs.google.com/presentation/d/16SP-71By8lvwx3emyMQBjpdkB-GlDHBYXOcUb20mfNE/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["8", "Conceptual", "HW 6 & 7"], 
            cellNametoLinks: new Map<string,string>([
                ["HW 6 & 7", "https://docs.google.com/presentation/d/1BFWSPdTQa2DIi2LsiFsIHza7fOT-0pvVHR1ix3w0QE4/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["9", "SRC", "Explainable AI & Imitation"], 
            cellNametoLinks: new Map<string,string>([
                ["Explainable AI & Imitation", "https://docs.google.com/presentation/d/1Mn3QS6nS_hFa0IC-rDLmzY4XT0bHypuQmc4Ge0oEK4o/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["10", "Conceptual", "HW 8 & 9"], 
            cellNametoLinks: new Map<string,string>([
                ["HW 8 & 9", "https://docs.google.com/presentation/d/1E0wKNS066tNrDkZleNprqc5sNQCDGwbra876QNbEPls/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        { cellNames: ["11", "SRC", "AI Warfare"], 
            cellNametoLinks: new Map<string,string>([
                ["AI & Warfare", "https://docs.google.com/presentation/d/1asIhTkBmGsnHUQ51kTtpS5plE7fDp3DiH6rUkQ33t4o/edit?usp=sharing"],
            ]),
            autoReleaseDate: "Mar 10, 2025 10:30:00 EDT",
        },
        
        
        
    ];

    render() {
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
            <section id = 'sections' className="anchor">
                <div className="content-container">
                    
                    <h2>Discussion Schedule</h2>
                    <TableSection header={this.myHeader} rows={modifiedRows} />
                        
                    
                </div>
            </section>

        );
    }
}
