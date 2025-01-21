import React from 'react';
// import { createRoot } from 'react-dom/client';


interface StaffCardProps {
  name: string;
  cslogin?: string;
  pronouns: string;
  blurb: string;
  game: string;
  image: string;
  hometown: string;
  
}

export class StaffCard extends React.Component<StaffCardProps> {
  render() {
    return (
      <div className="card-staff">
        <img className="staff" src={this.props.image} alt={this.props.name} />
        <p className="staff-name">
          {this.props.name} {this.props.cslogin ? `(${this.props.cslogin})` : ''}
        </p>
        <p className="pronouns">{this.props.pronouns}</p>
        <p>{this.props.blurb}</p>
        <p>Hometown: {this.props.hometown}</p>
        <p>Favorite Childhood Game: {this.props.game}</p>
      </div>
    );
  }
}


