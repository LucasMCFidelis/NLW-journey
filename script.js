const formatter = (date) => {
    return {
        day: {
            numerical: dayjs(date).format('DD'),
            week: {
                short: dayjs(date).format('DD'), 
                long: dayjs(date).format('DD')
            }
        },
        month: dayjs(date).format('MM'), 
        hour: dayjs(date).format('HH:mm')
    }
}

let activities = [
    {
        name: "Almoço",
        date: new Date("2024-05-04 08:00"),
        finally: true
    },
    {
        name: "Lanche",
        date: new Date("2024-07-04 18:00"),
        finally: false
    },
    {
        name: "Academia",
        date: new Date("2024-07-06 15:00"),
        finally: true
    }
]

const createActivityItem = (activity) => {
    let input = '<input type="checkbox"'
    if (activity.finally){
        input += ' checked'
    }
    input += '>'
    const format = formatter(activity.date)
    return `
    <div>
        ${input}
        <span>${activity.name}</span>
        <time>
            ${format.day.week.long}, 
            dia ${format.day.numerical}
            de ${format.month} 
            às ${format.hour}h
        </time>
    </div>
    `
}

const updateListActivities = () => {
    const section = document.querySelector('section')

    if (activities.length == 0){
        section.innerHTML = `<p>Nenhuma atividade cadastrada</p>`
        return 
    }
    for(let activity of activities){
        section.innerHTML += createActivityItem(activity)
    }
}

updateListActivities()

const saveActivity = (event) => {
    event.preventDefault()
}