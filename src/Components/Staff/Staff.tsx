import React from "react";
import { StaffCard } from "../StaffCard/StaffCard";

import An from "../../Photos/an.jpg"
import Berny from "../../Photos/berny.png"
import Christian from "../../Photos/Christian_Armstrong.jpg"
import Daniel from "../../Photos/daniel.jpg"
import Darren from "../../Photos/darren_wang.jpg"
import Elliot from "../../Photos/Elliot_Photo.jpg"
import Eric from "../../Photos/Eric.png"
import Grace from "../../Photos/grace_wang.png"
import Karina from "../../Photos/karina_liba.jpg"
import Leanne from "../../Photos/leanne_chia.jpg"
import Mindy from "../../Photos/mindy.jpg"
import Preetish from "../../Photos/preetish_juneja.jpg"
import Sarah from "../../Photos/sarah_liao.jpg"
import Shiv from "../../Photos/Shivshankar Prasad.jpg"
import Tiffney from "../../Photos/tiffney_aina.png"
import Torsten from "../../Photos/Torsten.jpg"


interface StaffProps{}

export class Staff extends React.Component<StaffProps> {
    render(){
        return (
            <div id="staff">
                
                <h2>Staff</h2>
                <h3>Professor and Head Teaching Assistants</h3>
                <div className="card-container-staff2">
                    <StaffCard name="Eric Ewing (Professor)" cslogin="" pronouns="he/him"
                    blurb="I have a dog" 
                    image={Eric} game = "Chess" hometown = "Syracuse, NY"></StaffCard>

                    <StaffCard name="Berny" cslogin="bli116" pronouns="he/him"
                    blurb="Hi everyone! I'm a junior from sunny Bay Area, CA. I love cycling, and in my free time you can catch me exploring new trails, jogging, or playing pickleball or basketball!" 
                    image={Berny} game = "Capture the Flag" hometown="San Ramon, CA"></StaffCard>

                    <StaffCard name="Daniel" cslogin="dzhu36" pronouns="he/him"
                    blurb="Hi! My name is Daniel. I'm a junior concentrating in computer science. I'm also pre-med. In my free time, I like to cook, hike, and read books/manga. Let me know if you ever want to have a chat :)" 
                    image={Daniel} game = "Pokemon" hometown = "San Ramon, CA"></StaffCard>

                    <StaffCard name="Mindy" cslogin="mkim314" pronouns="she/her"
                    blurb="Hi! My name is Mindy, and I am a junior studying cs + neuro interested in Neuro AI research. When I am not studying at cute coffee shops, I spend my free time going to the gym, updating my Beli with new restaurant reviews, and binge watching sitcoms. " 
                    image={Mindy} game = "Chaos Tag" hometown = "Folsom, CA"></StaffCard>

                </div>
                <h3>Joint SRC/UTAs</h3>
                <div className="card-container-staff2">
                    <StaffCard name="Christian" cslogin="carmstr8" pronouns="he/him"
                    blurb="I'm still trying to figure out who I am." 
                    image={Christian} game = "Bloons Tower Defense 5" hometown="I belong nowhere"></StaffCard>

                    <StaffCard name="Sarah" cslogin="sliao13" pronouns="she/her"
                    blurb="Hi! I'm Sarah, a sophomore studying computer science. I'm a part of Moli, Lion Dance, and AVGE. If you're interested in any of them or want to catch a performance lmk!" 
                    image={Sarah} game = "Hopscotch" hometown = "Solon, Ohio"></StaffCard>

                </div>
                <h3>Undergraduate Teaching Assistants</h3>
                <div className="card-container-staff2">
                    <StaffCard name="An" cslogin="atcao" pronouns="she/her"
                    blurb="Hi! I am An, a junior concentrating in Math and Computer Science - Economics. I love walking around taking pictures and going to cute cafes. I am also a huge coffee addict and you can likely catch me at Zinnekens' ☕️" 
                    image={An} game = "candy crush soda" hometown="Hanoi, Vietnam"></StaffCard>

                    <StaffCard name="Darren" cslogin="dwang157" pronouns="he/him"
                    blurb="Hi! My name is Darren and I'm a Sophomore concentrating in CS and Psychology. In my free time I enjoy trying new food and exploring new places." 
                    image={Darren} game = "Tag, maybe roblox" hometown="Queens, NY"></StaffCard>

                    <StaffCard name="Elliot" cslogin="esmith92" pronouns="he/him"
                    blurb="Hi! I'm a junior from New Jersey studying computer science and IAPA. I like running, reading, and exploring new coffee shops. Excited to meet everyone!" 
                    image={Elliot} game = "Monopoly" hometown = "Moorestown, NJ"></StaffCard>
                    
                    <StaffCard name="Grace" cslogin="gwang71" pronouns="she/her"
                    blurb="Hello! My name is Grace, and I'm a sophomore studying APMA-CS. In my free time, I enjoy crocheting, drawing, learning new languages, and re-watching Gravity Falls :)" 
                    image={Grace} game = "Chaos Tag" hometown="Bellevue, WA"></StaffCard>

                    <StaffCard name="Karina" cslogin="kliba" pronouns="she/her"
                    blurb="Hi! My name is Karina and I’m a sophomore from Cornwall NY concentrating in CS. In my free time I like to bake, play on my switch, and spend time outside, especially hiking. I’m so excited to TA this semester!" 
                    image={Karina} game = "mario kart!" hometown="Cornwall, NY"></StaffCard>

                    <StaffCard name="Leanne" cslogin="lchia1" pronouns="she/her"
                    blurb="Hi! I'm Leanne, and I'm a sophomore studying CS and APMA-Econ. I really enjoy exploring new cafes, collecting vinyls, listening to music, and doing ballroom dance! :)" 
                    image={Leanne} game = "Tetris!!!!!!" hometown = "Singapore"></StaffCard>

                    <StaffCard name="Preetish" cslogin="pjuneja3" pronouns="he/him"
                    blurb="I'm a junior studying cs and apma-econ. I enjoy being outdoors and playing soccer regardless of the weather. Hmu if you're down to play" 
                    image={Preetish} game = "civ6" hometown = "Singapore"></StaffCard>

                    <StaffCard name="Shiv" cslogin="sprasa28" pronouns="he/him"
                    blurb="Hi! My name is Shiv, and I'm a sophomore from the Chicago suburbs concentrating in APMA-CS. In my free time I like to play piano, work out, and read. Super hyped for this semester!" 
                    image={Shiv} game = "Foursquare" hometown = "Elk Grove Village, IL"></StaffCard>

                    <StaffCard name="Tiffney" cslogin="taina1" pronouns="she/her"
                    blurb="Hi! I'm Tiffney, a senior concentrating in Computer Science and Neuroscience. Outside of coding and debugging (and more debugging), I fence épée, dance hip-hop, write poetry, watch early 2000s comedies, and try to navigate life avoiding eggs (very allergic). Can't wait to meet you all!" 
                    image={Tiffney} game = "4 Square" hometown="Allen, TX"></StaffCard>
                
                    <StaffCard name="Torsten" cslogin="tullric1" pronouns="he/him"
                    blurb="Hi everyone! I am a senior concentrating in computational neuroscience. Please reach out if you are looking to study something similar and want to ask any questions. In my free time, I like to play various IM sports." 
                    image={Torsten} game = "Jackpot" hometown="Massachusetts"></StaffCard>

                </div>
            </div>
        );
    }
}