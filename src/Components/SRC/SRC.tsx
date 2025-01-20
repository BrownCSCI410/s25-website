import React from "react";

interface SRCProps {}

export class SRC extends React.Component<SRCProps> {
    render(){
        return(
            <div id="src">
                <div className = "content-container">
                    <div className ="header-container">
                    <h2>SRC</h2>
                    </div>

                    <div className="src-container">
                        <div className="src-topics>"></div>
                        <div className ="src-item">
                            <h3>What is SRC?</h3>
                            <p>As awareness of technology's consequences increases, attention turns to how computer scientists are trained. In response, the CS department created the "Socially Responsible Computing" initiative in 2019 to integrate ethics and social impact topics broadly across its curriculum. At Brown, SRC is embedded into most major CS courses. Our goals in CS15 are to give a broad overview of today's technological landscape so that you are familiar with these concepts when you are eventually faced with ethical design decisions further down your CS journey.</p>
                            <h3>How Does This Fit In To The CS15 Curriculum?</h3>
                            <ul>
                                <li>Mini-Assignments</li>
                                <li>Lab activities about lecture content</li>
                                <li>Two extra credit discussion sections with details TBA</li>
                            </ul>
                        </div>
                        <div className = "src-item">
                            <h3>How can I get involved?</h3>
                            <br></br>
                            <h4>Groups @ Brown:</h4>
                            <ul>
                                <li>SRC Reading group: ARG@Brown</li>
                                <li>AIRES (AI Robotics Ethics Society@Brown)</li>
                                <li>Human Centered Robotics Initiative</li>
                                <li>Design for America @ Brown</li>
                            </ul>
                            <h4>Alum-founded groups & others:</h4>
                            <ul>
                                <li>Better World by Design</li>
                                <li>Impact Labs</li>
                                <li>Coding it Forward</li>
                                <li>TechCongress</li>
                            </ul>
                            <h4>Classes @ Brown:</h4>
                            <ul>
                                <li>CSCI1870: Cybersecurity Ethics</li>
                                <li>CSCI1951I: CS for Social Change</li>
                                <li>DATA0080: Data, Ethics and Privacy</li>
                                <li>MCM0230: Digital Media</li>
                                <li>PHIL401: Ethics of Digital Technology</li>
                                <li>STS 1700T: Race, Gender, and Technology in Everyday Life</li>
                                <li>Classes under the 'Science, Technology, and Society' (STS) department</li>
                                <li>...and more!</li>
                            </ul>

                        </div>
                    </div>
                    <br></br>
                    <div>
                        <h3>Topics in Socially Responsible Computing</h3>
                        <div id="flip-card-container" className = "cards-container">
                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Big Tech</h3>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>Big Tech</h3>
                                        <ul>
                                            <div className="box">
                                                {/* <a className="button" >Lecture 3</a> */}
                                                <p>Lecture 3</p>

                                            </div>

                                        </ul>
                                        <ul>

                                            <div className="box">
                                                {/* <a className="button" >Lecture 3</a> */}
                                                <p>Lecture 4</p>

                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Artificial Intelligence</h3>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>AI</h3>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 5</p>
                                            </div>
                                        </ul>
                                        <ul>

                                            <div className="box">
                                                <p>Lecture 6</p>
                                            </div>

                                            </ul>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 7</p>
                                            </div>

                                            </ul>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 8</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Blockchain and Crypto</h3>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>Blockchain and Crypto</h3>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 9</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Environ&shy;mental Costs of Computing</h3>
                                            </div>
                                            <div className="flip-card-back">
                                                <h3>Environ&shy;mental Costs of Computing</h3>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 10</p>
                                            </div>
                                            </ul>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 11</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Accessible Design</h3>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>Accessible Design</h3>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 12</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Privacy and Govern&shy;mental Surveil&shy;lance</h3>
                                            </div>
                                            <div className="flip-card-back">
                                                <h3>Privacy and Govern&shy;mental Surveil&shy;lance</h3>
                                                <ul>
                                            <div className="box">
                                                <p>Lecture 13</p>
                                            </div>
                                            </ul>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 14</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Social Media</h3>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>Social Media</h3>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 15</p>
                                            </div>
                                            </ul>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 16</p>
                                            </div>
                                            </ul>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 17</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Future of Work and Education</h3>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>Future of Work and Education</h3>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 18</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>

                            <div className = "flip-card">
                                <div className = "flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3>Good Tech</h3>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>Good Tech</h3>
                                        <ul>
                                            <div className="box">
                                                <p>Lecture 19</p>
                                            </div>
                                        </ul>
                                    </div>

                                </div>  
                            </div>
                        </div>
                    </div>
                </div>

                
                <div id="bigtech1" className="overlay">
                    <div className="popup">
                        <h3>Big Tech Overview</h3>
                        <a className = "close" href="#src-topics"></a>
                    </div>
                </div>
                

                
            </div>
        );
    }
}