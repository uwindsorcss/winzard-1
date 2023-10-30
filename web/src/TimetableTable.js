import React, { useEffect, useState } from 'react'

const TimetableTable = ({ schedule }) => {
    const scheduleDays = {}
    for(const course of schedule) {
        
        const lectureTimes = course.Times.Lecture.Hours
        const lectureDays = course.Times.Lecture.Days
        for(const day of lectureDays) {
            if(!scheduleDays[day]) {
                scheduleDays[day] = []
            }
            scheduleDays[day].push({
                code: course.Code,
                type: "lecture",
                times: lectureTimes
            })
        }
        if(course.Times.Lab == undefined) continue
        const labTimes = course.Times.Lab.Hours
        const labDays = course.Times.Lab.Days
        for(const day of labDays) {
            if(!scheduleDays[day]) {
                scheduleDays[day] = []
            }
            scheduleDays[day].push({
                code: course.Code,
                type: "lab",
                times: labTimes
            })
        }

    }

    const wholeDay = ["8:00", "22:00"]

    // day filtering logic is a little cleaner in the days themselves
    return <div className="days">
        <Column name="Monday" schedule={scheduleDays.Monday} wholeDay={wholeDay} />
        <Column name="Tuesday" schedule={scheduleDays.Tuesday} wholeDay={wholeDay} />
        <Column name="Wednesday" schedule={scheduleDays.Wednesday} wholeDay={wholeDay} />
        <Column name="Thursday" schedule={scheduleDays.Thursday} wholeDay={wholeDay} />
        <Column name="Friday" schedule={scheduleDays.Friday} wholeDay={wholeDay} />
    </div>
}

const Course = ({ text, top, height }) => {
    return <p className="course" style={{ top: top, height: height }}>
        { text.map(e => <span>{e}<br    /></span>) }
    </p>
}

const Column = ({ name, schedule, wholeDay }) => {
    if(schedule === undefined) {
        return <div className="column-day">
        <p className="column-day-name">{ name }</p>
        <div className="column-content">
            <div className="column-lines"> </div>
        </div>
    </div>
    }
    const minutes = (hhmm) => Number(hhmm.split(":")[0]) * 60 + Number(hhmm.split(":")[1])
    const scale = (t, min=8*60, max=22*60) => {
        return (t - min)/(max - min) 
    }
    const scaleTime = (time) => {
        return time.map(minutes).map(e => scale(e))
    }

    let courses = []
    for(const course of schedule) {
        const time = scaleTime(course.times)
        const totalHeight = 567
        const top = totalHeight * time[0]
        const height = totalHeight * time[1] - top
        courses.push(<Course text={[ course.code + ' ' + course.type, course.times.join(' - ')]} top={top} key={Math.random()} />)    
    }


    return <div className="column-day">
        <p className="column-day-name">{ name }</p>
        <div className="column-content">
            <div className="column-lines">
            </div>
            { courses }
        </div>
    </div>
}

export default TimetableTable