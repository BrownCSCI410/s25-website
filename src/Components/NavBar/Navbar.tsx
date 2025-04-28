import React from "react";

interface NavbarProps {}
const offset = -100; // Adjust this offset to match the height of your navbar or the amount you want to scroll up

export class Navbar extends React.Component<NavbarProps> {
    toggleNavbar = () => {
        const navbar = document.getElementById("navbar");
        if (navbar) {
            if (navbar.className === "nav-bar") {
                navbar.className += " responsive";
            } else {
                navbar.className = "nav-bar";
            }
        }
    };

    handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth"
            });
        }
    };

    render() {
        return (
            <div>
                <nav className="nav-bar" id="navbar">
                    <button className="icon" onClick={this.toggleNavbar}>
                        &#9776;
                    </button>
                    <a className="nav-link" href="#home" onClick={(e) => this.handleScroll(e, "home")} target="_self">CS 410</a>
                    <a className="nav-link" href="#lectures" onClick={(e) => this.handleScroll(e, "lectures")} target="_self">Lectures</a>
                    <a className="nav-link" href="#sections" onClick={(e) => this.handleScroll(e, "sections")} target="_self">Discussion</a>
                    <a className="nav-link" href="#assignments" onClick={(e) => this.handleScroll(e, "assignments")} target="_self">Assignments</a>
                    <a className="nav-link" href="#resources" onClick={(e) => this.handleScroll(e, "resources")} target="_self">Resources</a>
                    <a className="nav-link" href="#hours" onClick={(e) => this.handleScroll(e, "hours")} target="_self">Hours</a>
                    <a className="nav-link" href="#staff" onClick={(e) => this.handleScroll(e, "staff")} target="_self">Staff</a>
                    <a className="nav-link" href="#final" onClick={(e) => this.handleScroll(e, "Final Project Results")} target="_self">Tournament</a>
                </nav>
            </div>
        );
    }
}
