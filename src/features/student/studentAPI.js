import axios from "axios";

const getAllStudents = async () => {
  try {
    const url = "https://6181949532c9e2001780488b.mockapi.io/students"
    const studentsResponse = await axios.get(url)
    const students = studentsResponse.data
    return students
  } catch (error) {
    throw error
  }
}

export { getAllStudents }

