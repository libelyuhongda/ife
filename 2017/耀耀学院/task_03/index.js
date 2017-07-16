function $(selector) {
  return document.getElementById(selector)
}

const universities = [{
    city: '广州',
    colleges: ['广州大学', '广东工业大学', '华南理工大学', '中山大学']
  },
  {
    city: '北京',
    colleges: ['清华大学', '北京大学', '北京师范大学', '中国人民大学']
  }
]
const student = $('student')
const nonStudent = $('non-student')
const content = $('content')
const cities = $('cities')
const schools = $('schools')

cities.onchange = () => {
  schools.innerHTML = ''
  universities.forEach(university => {
    if (cities.value == university.city) {
      university.colleges.forEach(college => {
        schools.innerHTML += `<option value="${college}">${college}</option>`
      })
    }
  })
}

const input = document.createElement('div')
input.innerHTML = '<label>就业单位 <input type="text"></label>'

const selections = $('selections')

student.onchange = () => {
  input.replaceWith(selections)
}

nonStudent.onchange = () => {
  selections.replaceWith(input)
}
