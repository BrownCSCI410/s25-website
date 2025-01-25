import React from 'react'

export class Welcome extends React.Component{

    render(){
        return(
            <section id="home">

            <div className ="home-container">
                
                <div className="home-description-container">
                    <h1 className="mb-4">CS410/1411: <br></br> Foundations of AI</h1>
                    <p className="mb-5">Welcome to CS410/1411! This course offers broad coverage 
                    of core topics in artificial intelligence (AI) as a prelude to students 
                    taking more in-depth AI courses later on. Throughout the course, you will
                    delve into key AI models, both logical and probabilistic, 
                    as well as algorithms for solving these models, including those based on search, planning, 
                    reinforcement learning, and both supervised and unsupervised machine learning. 
                    You will have the opportunity to apply these ideas to develop basic 
                    natural language processing, computer vision, robotic, and multiagent systems, 
                    all with an eye towards building socially responsible AI. </p>
                    <p>Course: CSCI 0410/1411
                    <br></br>
                    Professor: Eric Ewing
                    <br></br>
                    Location: MacMillan 117
                    <br></br>
                    Time: MWF 1:00-1:50PM
                    </p>
                </div>
            </div>
        </section>
        )
    }

}


