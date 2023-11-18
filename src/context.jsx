import { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import cartItems from './data.jsx';
import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from './actions.js';
import { getTotals } from './utils.js';
const url = 'https://www.course-api.com/react-useReducer-cart-project';

export const AppContext = createContext();
export const useGlobalContext = () => useContext(AppContext);

const initialState = {
	loading: false,
	cart: new Map(),
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { totalAmount, totalCost } = getTotals(state.cart);

	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	const removeItem = id => {
		dispatch({ type: REMOVE, payload: { id } });
	};

	const increase = id => {
		dispatch({ type: INCREASE, payload: { id } });
	};

	const decrease = id => {
		dispatch({ type: DECREASE, payload: { id } });
	};

	const fetchData = async () => {
		try {
			dispatch({ type: LOADING });
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Something get wrong');
			}
			const cart = await response.json();
			dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<AppContext.Provider value={{ ...state, clearCart, removeItem, increase, decrease, totalAmount, totalCost }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
