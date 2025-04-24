import React from "react";
import { RowOptions, TableSection } from "../TableSection/TableSection";

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
	myHeader: string[] = ["Assignment", "Out", "Due"];

	myRows: RowOptions[] = [
		{
			cellNames: ["Homework 0: Uninformed Search", "1/22", "2/4"],
			cellNametoLinks: new Map<string, string>([
				[
					"Homework 0: Uninformed Search",
					"https://hackmd.io/@cs410/HyVxfCLP1l",
				],
			]),
			autoReleaseDate: "Jan 22, 2025 02:00:00 EDT",
		},

		{
			cellNames: ["Homework 1: A*", "1/29", "2/4"],
			cellNametoLinks: new Map<string, string>([
				["Homework 1: A*", "https://hackmd.io/@cs410/Bkz77CUw1g"],
			]),
			autoReleaseDate: "Jan 29, 2025 02:00:00 EDT",
		},
		{
			cellNames: ["Homework 2: Adversarial Search", "2/5", "2/11"],
			cellNametoLinks: new Map<string, string>([
				[
					"Homework 2: Adversarial Search",
					"https://hackmd.io/@cs410/SkwkZLaPkg",
				],
			]),
			autoReleaseDate: "Feb 05, 2025 02:00:00 EDT",
		},
		{
			cellNames: ["Homework 3: SAT", "2/12", "2/21"],
			cellNametoLinks: new Map<string, string>([
				["Homework 3: SAT", "https://hackmd.io/@cs410/B1EeC7OP1g"],
			]),
			autoReleaseDate: "Feb 12, 2025 02:00:00 EDT",
		},
		{
			cellNames: ["Homework 4: Constrained Optimization", "2/21", "2/28"],
			cellNametoLinks: new Map<string, string>([
				["Homework 4: Constrained Optimization", "https://hackmd.io/@cs410/SJyDMKBK1g"],
			]),
			autoReleaseDate: "Feb 21, 2025 02:00:00 EDT",
		},
		{
			cellNames: [
				"Homework 5: Model Selection",
				"2/26",
				"3/4",
			],
			cellNametoLinks: new Map<string, string>([
				[
					"Homework 5: Model Selection",
					"https://hackmd.io/@cs410/B1Tna4pv1e",
				],
			]),
			autoReleaseDate: "Feb 26, 2025 14:00:00 EDT",
		},
		{
			cellNames: ["Homework 6: Linear Regression and Bias-Variance Tradeoff", "3/5", "3/11"],
			cellNametoLinks: new Map<string, string>([
				[
					"Homework 6: Linear Regression and Bias-Variance Tradeoff",
					"https://hackmd.io/@cs410/ryQGJ_pwyg",
				],
			]),
			autoReleaseDate: "Mar 05, 2025 14:00:00 EDT",
		},
		{
			cellNames: ["Homework 7: Neural Networks", "3/12", "3/18"],
			cellNametoLinks: new Map<string, string>([
				["Homework 7: Neural Networks", "https://hackmd.io/@cs410/H1t_ms13yg"],
			]),
			autoReleaseDate: "Mar 12, 2025 14:00:00 EDT",
		},
		{
			cellNames: ["Homework 8: MDPs and Reinforcement Learning", "3/19", "4/8"],
			cellNametoLinks: new Map<string, string>([
				[
					"Homework 8: MDPs and Reinforcement Learning",
					"https://hackmd.io/@cs410/Hy9_EcEh1l",
				],
			]),
			autoReleaseDate: "Mar 19, 2025 14:00:00 EDT",
		},
		{
			cellNames: [
				"Homework 9: Reinforcement Learning and Function Approximation",
				"4/2",
				"4/8",
			],
			cellNametoLinks: new Map<string, string>([
				[
					"Homework 9: Reinforcement Learning and Function Approximation",
					"https://hackmd.io/@cs410/SJO5MTca1e",
				],
			]),
			autoReleaseDate: "Apr 02, 2025 14:00:00 EDT",
		},
		{
			cellNames: ["Final Project Part 1", "4/9", "4/16"],
			cellNametoLinks: new Map<string, string>([
				["Final Project Part 1", require("./handouts/Final_Project_Pt_1.pdf")],
			]),
			autoReleaseDate: "Apr 09, 2025 14:00:00 EDT",
		},
		{
			cellNames: ["Final Project Part 2", "4/16", "4/25"],
			cellNametoLinks: new Map<string, string>([
				["Final Project Part 2", require("./handouts/CSCI_410_Final_Project_part_2.pdf")],
			]),
			autoReleaseDate: "Apr 16, 2025 14:00:00 EDT",
		},
		{
			cellNames: ["Final Project Part 3", "4/25", "5/6"],
			cellNametoLinks: new Map<string, string>([
				["Final Project Part 3", require("./handouts/part3.pdf")],
			]),
			autoReleaseDate: "Apr 23, 2025 14:00:00 EDT",
		},
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
			<section id="assignments" className="anchor">
				<div className="content-container">
					<h2>Assignments</h2>
					<p className="mb-5">
						Assignments will typically be released at 2:00 PM EST on Wednesdays
						and due at 11:59 PM EST on Tuesdays
					</p>
					<TableSection header={this.myHeader} rows={modifiedRows} />
				</div>
			</section>
		);
	}
}
