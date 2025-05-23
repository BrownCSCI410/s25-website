import React from "react";
import { RowOptions, TableSection } from "../TableSection/TableSection";

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
		{
			cellNames: ["1/22", "Introduction to AI", "R&N Chapter 1", "Slides", " "],
			cellNametoLinks: new Map<string, string>([
				[
					"Slides",
					"https://docs.google.com/presentation/d/1xpg5aYXuw2Psp1nxxzDkSOsmMQijVjdgAa2Z1oMk3Fg/edit?usp=sharing",
				],
			]),
			autoReleaseDate: "Jan 22, 2025 02:00:00 EDT",
		},
		{
			cellNames: [
				"1/24",
				"Blind Search",
				"R&N 3.0-3.4",
				"Notes",
				"Blind Search Algorithms",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/blind_search.pdf")],
				[
					"Blind Search Algorithms",
					"https://cs.stanford.edu/people/eroberts/courses/soco/projects/2003-04/intelligent-search/blind.html",
				],
			]),
			autoReleaseDate: "Jan 24, 2025 02:00:00 EDT",
		},
		{
			cellNames: [
				"1/27",
				"Informed Search",
				"R&N 3.4-3.5.1",
				"Notes",
				"Slides",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/informed_search.pdf")],
				["Slides", require("./slides/A-star Search.pdf")],
			]),
			autoReleaseDate: "Jan 29, 2025 02:00:00 EDT",
		},
		{
			cellNames: [
				"1/31",
				"A* Search",
				"R&N 3.5.2-3.7",
				"Notes",
				"Pathfinding Visualizations",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/informed_search.pdf")],
				[
					"Pathfinding Visualizations",
					"https://qiao.github.io/PathFinding.js/visual/",
				],
			]),
			autoReleaseDate: "Jan 29, 2025 02:00:00 EDT",
		},
		{
			cellNames: ["2/3", "Adversarial Search", "R&N 5.0-5.3", "Notes", " "],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/adversarial_search.pdf")],
			]),
			autoReleaseDate: "Jan 29, 2025 02:00:00 EDT",
		},
		{
			cellNames: ["2/5", "Local Search", "R&N 4.0-4.1", "Notes", " "],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/local_search.pdf")],
			]),
			autoReleaseDate: "Feb 5, 2025 02:00:00 EDT",
		},

		{
			cellNames: [
				"2/7",
				"Conjunctive Normal Form",
				"R&N 6.1, 6.4",
				"Notes",
				" ",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/cnfs.pdf")],
			]),
			autoReleaseDate: "Feb 7, 2025 04:00:00 EDT",
		},

		{
			cellNames: ["2/10", "Constraint Satisfaction", "R&N 13", "Notes", " "],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/constraint_satisfaction.pdf")],
			]),
			autoReleaseDate: "Feb 10, 2025 04:00:00 EDT",
		},

		{
			cellNames: [
				"2/12",
				"Convex Optimization",
				"R&N 14-14.5",
				"Notes",
				"Particle Filters",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/convex_optimization.pdf")],
				[
					"Particle Filters",
					"https://amrl.cs.utexas.edu/interactive-particle-filters/",
				],
			]),
			autoReleaseDate: "Feb 12, 2025 04:00:00 EDT",
		},
		{
			cellNames: ["2/14", "Linear Programming", "", "Notes", " "],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/mathematical_programming.pdf")],
			]),
			autoReleaseDate: "Feb 14, 2025 04:00:00 EDT",
		},
		{
			cellNames: ["2/19", "Mathematical Programming", "", "Notes", " "],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/mathematical_programming.pdf")],
			]),
			autoReleaseDate: "Feb 19, 2025 04:00:00 EDT",
		},

		{
			cellNames: ["2/21", "Probability", "R&N 12", "Notes", ""],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/probability.pdf")],
			]),
			autoReleaseDate: "Feb 21, 2025 04:00:00 EDT",
		},

		{
			cellNames: [
				"2/24",
				"k Nearest Neighbors",
				"R&N Chapter 3.5.2-3.7",
				"Notes",
				" ",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/knn.pdf")],
			]),
			autoReleaseDate: "Feb 24, 2025 04:00:00 EDT",
		},

		{
			cellNames: ["2/26", "Decision Trees", "", "Notes", ""],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/decision_trees.pdf")],
			]),
			autoReleaseDate: "Feb 26, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"3/3 - 3/5",
				"Linear & Polynomial Regression",
				"R&N Chapter 3.5.2-3.7",
				"Notes",
				"",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/regression.pdf")],
			]),
			autoReleaseDate: "Mar 3, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"3/10 - 3/14",
				"Neural Nets",
				"R&N Chapter 3.5.2-3.7",
				"Notes",
				" ",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/neural_nets.pdf")],
			]),
			autoReleaseDate: "Mar 10, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"3/17 - 3/31",
				"Markov Chains and MDPS",
				"R&N Chapter 3.5.2-3.7",
				"Notes",
				" ",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/mdp.pdf")],
			]),
			autoReleaseDate: "Mar 17, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"4/2 - 4/7",
				"Reinforcement Learning",
				"R&N Chapter 3.5.2-3.7",
				"Notes",
				"More Notes",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./lecture_notes/rl.pdf")],
				["More Notes", require("./lecture_notes/rl_notes.pdf")],
			]),
			autoReleaseDate: "Apr 2, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"4/9",
				"Policy Gradient Algorithms",
				"",
				"Notes",
				"",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./slides/Policy_Gradient_Algos_Notes.pdf")],
			]),
			autoReleaseDate: "Apr 9, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"4/11",
				"MCTS",
				"",
				"Notes",
				"",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./slides/MCTS.pdf")],
			]),
			autoReleaseDate: "Apr 9, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"4/14",
				"Policy Gradient Algorithms",
				"",
				"Notes",
				"",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./slides/MCTS_continued.pdf")],
			]),
			autoReleaseDate: "Apr 9, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"4/16",
				"PCA",
				"",
				"Notes",
				"",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./slides/PCA + K-means.pptx")],
			]),
			autoReleaseDate: "Apr 9, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"4/18",
				"K-Means",
				"",
				"Notes",
				"",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./slides/PCA + K-means.pptx")],
			]),
			autoReleaseDate: "Apr 9, 2025 04:00:00 EDT",
		},
		{
			cellNames: [
				"4/21",
				"GMMs and The EM Algorithm",
				"",
				"Notes",
				"",
			],
			cellNametoLinks: new Map<string, string>([
				["Notes", require("./slides/GaussianMixtureModels.pptx")],
			]),
			autoReleaseDate: "Apr 9, 2025 04:00:00 EDT",
		},

		/**
        { cellNames: ["2/24", "Naive Bayes", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/26", "Continuous Optimization", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["2/28", "Constrained Optimization", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/3", "Linear Algebra Review", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/7", "Bias-Variance Decomposition, Linear Regression", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/10", "Neural Nets - Perceptrons", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/12", "Neural Nets - Back-propagation", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]),autoReleaseDate: "Mar 16, 2025 04:00:00 EDT"  },
        { cellNames: ["3/14", "Neural Nets - Logistic Regression", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
        { cellNames: ["3/19", "MDPs: Control (Value Iteration)", "R&N Chapter 3.5.2-3.7", "Notes", " "], cellNametoLinks: new Map<string,string>([["Notes", "lecture_notes/informed_search.pdf"],["Pathfinding Visualizations", "https://qiao.github.io/PathFinding.js/visual/"]]) ,autoReleaseDate: "Mar 16, 2025 04:00:00 EDT" },
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
		const modifiedRows: RowOptions[] = this.myRows.map((row) => {
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
			<section id="lectures" className="anchor">
				<div className="content-container">
					<h2>Lectures</h2>
					<p className="mb-5">
						See also the <a href="#hours">course calendar</a>.
					</p>
					<TableSection header={this.myHeader} rows={modifiedRows} />
				</div>
			</section>
		);
	}
}
