const formatter = (date) => {
    return {
        day: {
            numerical: dayjs(date).format('DD'),
            week: {
                short: dayjs(date).format('ddd'), 
                long: dayjs(date).format('dddd')
            }
        },
        month: dayjs(date).format('MMMM'), 
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
    let input = `
    <input 
    onchange = "completeActivity(event)"
    value="${activity.date}"
    type="checkbox"
    `
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
    section.innerHTML = ''

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

    const dataForm = new FormData(event.target)

    const name = dataForm.get('activity')
    const day = dataForm.get('day')
    const hour = dataForm.get('hour')
    const date = `${day} ${hour}`

    const newActivity = {
        name,
        date,
        finally: true
    }

    const activityExists = activities.find((activity) => {
        return activity.date == newActivity.date
    })

    if (activityExists) {
        return alert('Dia/Hora não disponível')
    }

    activities = [newActivity, ...activities]
    updateListActivities()
}

const createDaySelection = () => {
    const days = [
        "2024-05-20",
        "2024-09-10",
        "2024-09-30",
        "2024-03-20",
        "2024-03-09",
        "2024-05-22"
    ]

    let daysSelection = ''
    for(let day of days) {
        const format = formatter(day)
        const dayFormatted = `
        ${format.day.numerical} de
        ${format.month}
        `
        daysSelection += `<option value="${day}">${dayFormatted}</option>`
    }

    document.querySelector('select[name="day"]').innerHTML += daysSelection
}
createDaySelection()

const createHoursSelection = () => {
    let avaliableHours = ''

    for (let i = 6; i < 23; i++){
        const hour = String(i).padStart(2, '0')
        avaliableHours += `<option value="${hour}:00">${hour}:00</option>` 
        avaliableHours += `<option value="${hour}:30">${hour}:30</option>` 
    }

    document.querySelector('select[name="hour"]').innerHTML = avaliableHours
}
createHoursSelection()

const completeActivity = (event) => {
    const input = event.target
    const dateThisInput = input.value

    const activity = activities.find((activity) => {
        return activity.date == dateThisInput
    })

    if(!activity) {
        return
    }

    activity.finally = !activity.finally
}