<script>
	import { writable } from "./store.js";
	/** @param id {number} 
			@returns {number}
	*/
	const setElementId = (id) => {
		return id + 1;
	};

	/** @param elementType {string} */
	const setDefaultProps = (elementType) => {
		return {
			type: elementType,
			id: "",
			content: "",
			parent: "body",
			props: {
				styles: {
					margin: "0",
				},
				children: [],
			},
		};
	};

	$: elementObjects = [
		{
			type: "div",
			id: "div#1",
			content: "",
			props: {
				class: "",
				styles: {
					margin: 0,
					background: "#fbfbfb",
				},
				children: [],
			},
		},
	];
</script>
