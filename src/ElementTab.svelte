<script>
	import { elements } from "./store.js";

	const setElementId = (type) => {
		latestTypeId =
			elements.findLastIndex(
				(element) => element.type === type && element.id
			) || 0;
		return latestTypeId + 1;
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
