import React from "react";
import { TableSection } from "../TableSection/TableSection";
import { RowOptions } from "../TableSection/TableSection";

interface LectureProps {}

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

export class Lectures extends React.Component<LectureProps> {
    
    myHeader: string[] = [
        "Date",
        "Topic",
        "Readings",
        "Notes",
        "Additional Resources",
    ];


    myRows: RowOptions[] = [
        { cellNames: ["1/22", "Introduction to AI", "R&N Chapter 1", "Slides", " "], cellNametoLinks: new Map<string,string>([["Slides", "https://docs.google.com/presentation/d/1xpg5aYXuw2Psp1nxxzDkSOsmMQijVjdgAa2Z1oMk3Fg/edit?usp=sharing"]]),autoReleaseDate: "Jan 22, 2025 02:00:00 EDT" },
        { cellNames: ["1/24", "Blind Search", "R&N 3.0-3.4", "Notes", "Blind Search Algorithms"], cellNametoLinks: new Map<string,string>([["Notes", require("./lecture_notes/blind_search.pdf")], ["Blind Search Algorithms", "https://cs.stanford.edu/people/eroberts/courses/soco/projects/2003-04/intelligent-search/blind.html"]]),autoReleaseDate: "Jan 24, 2025 02:00:00 EDT"  },
        
        /**
        { cellNames: ["1/27", "Informed Search", "R&N 3.4-3.5.1", "Notes", "Heuristic Search Algorithms"], cellNametoLinks: new Map<string,string>([["Notes", "./lecture_notes/informed_search.pdf"], ["Heuristic Search Algorithms", "https://cs.stanford.edu/people/eroberts/courses/soco/projects/2003-04/intelligent-search/blind.html"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["1/29", "A* Search", "R&N 3.5.2-3.7", "Notes", "Pathfinding Visualizations"], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["1/31", "Adversarial Search", "R&N 5.0-5.3", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/adversarial_search.pdf"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/3", "Local Search", "R&N 4.0-4.1", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/local_search.pdf"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/5", "Prepositional Logic and Satisfiability", "R&N 7.3-7.5.2", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/satisfiability.pdf"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/7", "CSPs", "R&N 6.1, 6.4", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/CSP.pdf"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/10", "Probability Review", "R&N 13", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/probability.pdf"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["2/12", "Bayesian Networks", "R&N 14-14.5", "Notes", "Particle Filters"], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/bayes_nets.pdf"],["Particle Filters", "https://amrl.cs.utexas.edu/interactive-particle-filters/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/14", "Statistics Review", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["2/19", "Intro to Supervised Learning", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["2/21", "k Nearest Neighbors", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/24", "Naive Bayes", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/26", "Continuous Optimization", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/28", "Constrained Optimization", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/3", "Linear Algebra Review", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/5", "Linear Regression", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/7", "Bias-Variance Decomposition, Linear Regression", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/10", "Neural Nets - Perceptrons", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/12", "Neural Nets - Back-propagation", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["3/14", "Neural Nets - Logistic Regression", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/17", "Markov Chains and MDPS: Prediction (Policy Evaluation)", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["3/19", "MDPs: Control (Value Iteration)", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/21", "Reinforcement Learning", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["3/31", "MDPs with Function Approximation", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["4/2", "Deep RL", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["4/4", "MCTS", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["4/7", "MCTS + AlphaZero", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["4/9", "More LA Recap", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["4/11", "PCA", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["4/14", "Unsupervised Learning: K-means Clustering", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["4/16", "Probabilistic K-means and EM", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["4/18", "no topic yet lol", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["4/21", "Special Topics", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["4/23", "Special Topics", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["4/25", "Special Topics", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        
        */
       
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

            <section id='lectures' className="anchor">
                <div className= 'content-container'>
                    <h2>Lectures</h2>
                    <p className="mb-5">See also the <a href="#hours">course calendar</a>.</p>
                    <TableSection header={this.myHeader} rows={modifiedRows} />
                </div>

            </section>

        );
    }
}
