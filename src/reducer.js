import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS, ERROR } from './actions.js';
import cartItems from './data.jsx';

const reducer = (state, action) => {
	if (action.type === CLEAR_CART) {
		return { ...state, cart: new Map() };
	}

	if (action.type === REMOVE) {
		const newCart = new Map(state.cart);
		newCart.delete(action.payload.id);
		return { ...state, cart: newCart };
	}

	if (action.type === INCREASE) {
		const newCart = new Map(state.cart);
		const itemId = action.payload.id;
		const item = newCart.get(itemId);
		const newItem = { ...item, amount: item.amount + 1 };
		newCart.set(itemId, newItem);
		return { ...state, cart: newCart };
	}

	if (action.type === DECREASE) {
		const newCart = new Map(state.cart);
		const itemId = action.payload.id;
		const item = newCart.get(itemId);
		if (item.amount === 1) {
			newCart.delete(itemId);
			return { ...state, cart: newCart };
		}
		const newItem = {
			...item,
			amount: item.amount - 1,
			cart: newCart,
		};
		newCart.set(itemId, newItem);
		return { ...state, cart: newCart };
	}

	if (action.type === LOADING) {
		return { ...state, loading: true };
	}

	if (action.type === DISPLAY_ITEMS) {
		// dane z Api które są w talblicy trzeba zamienić na new Map a potem zapętlić aby wyodrębnić klucz jako item.id a jako value resztę tablicy pod nazwą item
		const newCart = new Map(action.payload.cart.map(item => [item.id, item]));
		return { ...state, loading: false, cart: newCart };
	}

	if (action.type === ERROR) {
		return { ...state, loading: false, error: true };
	}

	throw new Error(`No matching ${action.type} - action type`);
};
export default reducer;
