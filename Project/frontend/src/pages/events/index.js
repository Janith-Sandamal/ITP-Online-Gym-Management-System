import React from "react";

// Page components
import EventList from "./eventCard";
import AddEvent from "./AddEvent";

// SampleProvider
import { EventProvider } from "../../contexts/EventContext";

//{onClick={()=>clickHandler(data)} } //to call function from onclick with data

const Events = () => {
	return (
		<>
			<h1>Event Page</h1>
			<div
				style={{
					display: "table",
					borderCollapse: "separate",
					borderSpacing: "50px",
				}}
			>
				<EventProvider>
					{/* Event list */}
					<EventList />
					<br />
					{/* Add new Event */}
					<AddEvent />
				</EventProvider>
			</div>
		</>
	);
};

export default Events;
