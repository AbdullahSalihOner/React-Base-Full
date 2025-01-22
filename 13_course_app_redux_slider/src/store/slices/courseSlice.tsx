import { createSlice, nanoid } from "@reduxjs/toolkit";

//nanoid --> unique id olusturma


const courseSlice = createSlice({
    name: 'course',
    initialState: {
      searchTerm: '',
      data: [],
    },
    reducers: {
        addCourse(state, action) {
            debugger;
            state.data.push({
              name: action.payload.name,
              description: action.payload.description,
              cost: action.payload.cost,
              id: nanoid(),
            });
          },
          changeSearchTerm(state, action) {
            debugger;
            state.searchTerm = action.payload;
          },
      
          removeCourse(state, action) {
            const updatedCourses = state.data.filter((course) => {
              return course.id !== action.payload;
            });
            state.data = updatedCourses;
          },
    },
  });
  

export const { 
    addCourse, 
    changeSearchTerm, 
    removeCourse } 
= courseSlice.actions;
export const courseReducer = courseSlice.reducer;