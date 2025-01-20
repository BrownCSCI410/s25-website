import React from "react";

interface HoursProps {}

export class Hours extends React.Component<HoursProps> {
    render() {
        return (
            <section id="hours">

                <div className="content-container">

                <h2>Calendar</h2>

                <div className = 'iframe-container'>
                    <iframe src="https://calendar.google.com/calendar/embed?src=c_39df055f25779efdafd51cfb4d504c1f9e4eb8fb4377977bd32f3b6c6cf8c5a4%40group.calendar.google.com&ctz=America%2FNew_York"
                    title = "Calendar"
                    width="100%" 
                    height="700" 
                    scrolling="no">
                    </iframe>

                </div>
                

                
                </div>

            </section>
        );
    }
}
