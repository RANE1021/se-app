import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllStudents } from './studentAPI';

const initialState = {
  students : [],
  classes : [],
  filter : '',
  filtered : false,
  filteredStudents : [],
  searchResults : []
}

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async() => {
    const response = await getAllStudents()
    return response
  }
);

export const filterStudents = (students, filter) => {
  return dispatch => {
    const filteredByName = students.filter(student => student.classes.includes(filter))
    dispatch(setFilteredStudents(filteredByName))
  }
}

export function searchStudents(students, search) {
  return dispatch => {
    const searchedStudent = students.filter(student => (student.firstName.toLowerCase()).startsWith(search))
    dispatch(setSearchResults(searchedStudent));
  }
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
      state.filtered = true;
    },
    clearFilter: (state) => {
      state.filter = '';
      state.filtered = false;
    },
    setFilteredStudents: (state, { payload }) => {
      state.filteredStudents = payload
    },
    setSearchResults: (state, { payload }) => {
      state.searchResults = payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchStudents.fulfilled, (state, action) => {
      state.students = action.payload
      // eslint-disable-next-line
      action.payload.map(student => {
        // eslint-disable-next-line
        student.classes.map(element => {
          if(state.classes.includes(element)) {

          } else {
            state.classes.push(element)
          }
        });
      })
    })
  },
});

export const { setFilter, clearFilter, setFilteredStudents, setSearchResults } = studentSlice.actions;

export const selectAllStudents = (state) => state.student;

export default studentSlice.reducer;
