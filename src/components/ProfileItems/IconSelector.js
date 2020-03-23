import React from 'react';
import './ProfileItems.css';

const availableIcons = [
    "tag_faces", "accessibility", "adb", "airline_seat_recline_extra", "airport_shuttle", "album", "android", "announcement", "assistant", "attach_file", "audiotrack", "beach_access", "brightness_2", "brightness_low", "build", "bug_report", "cake", "casino", "child_care", "content_cut", "directions_bike", "directions_run", "face", "favorite_border", "grade", "hot_tub", "local_bar", "local_dining", "local_florist", "mood_bad", "rowing", "sentiment_neutral", "sentiment_very_dissatisfied", "smoking_rooms", "wc"
]

export default function IconSelector({selectedIcon, setIcon}){
    return(
        <div className="icon-selector">
            {
                availableIcons.map((icon, index)=>
                <i 
                    key={index}
                    className={`material-icons small ${selectedIcon===icon && 'selected-icon'}`}
                    onClick = {()=>{setIcon(icon)}}
                >
                    {icon}
                </i>
                )
            }
        </div>
    )
}