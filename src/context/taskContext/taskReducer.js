import { ADD_TASK, UPDATE_TASK, DELETE_TASK, GET_TASKS, FILTER_BY_PRIORITY, FILTER_BY_STATUS, REMOVE_FILTER, ADD_TECHNICIAN, UPDATE_TECHNICIAN, DELETE_TECHNICIAN, GET_TECHNICIANS, GET_APARTMENTS, ADD_APARTMENT, UPDATE_APARTMENT, DELETE_APARTMENT } from "../constansts"

const taskReducer = (state, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                duplicateTasks: action.payload

            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                duplicateTasks: [...state.tasks, action.payload]
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
                duplicateTasks: state.tasks
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                duplicateTasks: state.duplicateTasks.filter(task => task.id !== action.payload),
            }
        case FILTER_BY_STATUS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task?.status === action.payload)
            }
        case REMOVE_FILTER:
            return {
                ...state,
                tasks: state.duplicateTasks
            }
        case GET_TECHNICIANS:
            return {
                ...state,
                technicians: action.payload,
            }
        case ADD_TECHNICIAN:
            return {
                ...state,
                technicians: [...state.technicians, action.payload],
            }
        case UPDATE_TECHNICIAN:
            return {
                ...state,
                technicians: state.technicians.map((technician) =>
                    technician.id === action.payload.id ? action.payload : technician
                ),

            };
        case DELETE_TECHNICIAN:
            return {
                ...state,
                technicians: state.technicians.filter(technician => technician.id !== action.payload),

            }
        case GET_APARTMENTS:
            return {
                ...state,
               apartments: action.payload,
            }
        case ADD_APARTMENT:
            return {
                ...state,
                apartments: [...state.apartments, action.payload],
            }
        case UPDATE_APARTMENT:
            return {
                ...state,
                apartments: state.apartments.map((apartment) =>
                    apartment.id === action.payload.id ? action.payload : apartment
                ),

            };
        case DELETE_APARTMENT:
            return {
                ...state,
                apartments: state.apartments.filter(apartment => apartment.id !== action.payload),

            }
        default:
            return state;
    }

}

export default taskReducer;