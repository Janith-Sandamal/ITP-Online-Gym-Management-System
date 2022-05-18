import { createContext, useState, useEffect } from "react";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import EventAPI from "./api/EventAPI";
import axios from "axios";
// app.get("/events/:id",
// Mantine imports
import { Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/events`;
const EventContext = createContext();

export function EventProvider({ children }) {
	const [events, setEvents] = useState([]);
	const [reactStatus, setReactStatus] = useState(0);
	const [eventStatus, setEventStatus] = useState(0);

	// Get all events
	useEffect(() => {
		axios.get(baseURL).then((res) => {
			setEvents(res.data);
		});
	}, []);

	const schema = Joi.object({
		title: Joi.string().min(10).max(50).message("Title should be between 10 and 50 characters"),
		description: Joi.string().min(15).max(500).message("Description should be between 15 and 500 characters"),
		date: Joi.date().min("now").required(),
		time: Joi.date().required(),
		tags: Joi.string().min(3).max(50).message("Tags should be between 3 and 50 characters"),
		details: Joi.string().min(5).max(50).message("Details should be between 5 and 50 characters"),
		gender: Joi.string().required(),
	});

	// Form initial state
	const form = useForm({
		schema: joiResolver(schema),
		initialValues: {
			title: "Cat doing weights",
			tags: "cattower,lasers",
			description:
				"Cats love climbing and hiding, and can have hours of fun on a cat tree, a simple cardboard box, or a tunnel – not only does it encourage them to play, it also provides them with some space of their own!",
			details: "noon to midnight",
			gender: "Both",
			date: new Date(),
			time: new Date(),
		},
	});

	//Respond, If-You-Want
	const RSVW = (value, eid) => {
		let userid = "123456789812345678981238";
		//get specific react for current user.
		let event = events.filter((event) => event._id === eid);

		let reacts = event[0].users.filter((user) => user.uid == userid);
		let reactArr = [];
		//check if user is already RSVD
		if (reacts.length > 0) {
			reactArr = event[0].users.map((user) => {
				if (user.uid === userid) {
					user.status = value;
				}
				return user;
			});
		} else {
			reactArr.push(...event[0].users);
			reactArr.push({ uid: userid, status: value });
		}
		//update event with new RSVD status
		axios.put(`${baseURL}/${eid}`, { users: reactArr }).then((res) => {
			axios
				.get(baseURL)
				.then((res) => {
					setEvents(res.data);
				})
				.then(() => {
					setReactStatus(res.status);
				});
		});
	};

	// Add new event
	const addEvent = (values) => {
		let newDate = String(values.date).slice(0, 15) + String(values.time).slice(15);
		const newEvent = {
			title: values.title,
			description: values.description,
			details: values.details,
			gender: values.gender,
			date: newDate,
			tags: String(values.tags).split(","),
			trainer: "123456789812345678981234",
			users: [],
		};
		axios.post(baseURL, newEvent).then((res) => {
			setEventStatus(res.status);
			setEvents([...events, res.data]);
			form.reset();
		});
	};
	const updateEvent = (values) => {
		let newDate = String(values.date).slice(0, 15) + String(values.time).slice(15);
		let id = values.id;
		const newEvent = {
			title: values.title,
			description: values.description,
			details: values.details,
			gender: values.gender,
			date: newDate,
			tags: String(values.tags).split(","),
			trainer: "123456789812345678981234",
		};
		axios.put(`${baseURL}/${id}`, newEvent).then((res) => {
			axios
				.get(baseURL)
				.then((res) => {
					setEvents(res.data);
				})
				.then(() => {
					setEventStatus(res.status);
				});
		});
	};

	// Delete event and update UI
	const deleteEvent = (id) => {
		axios.delete(`${baseURL}/${id}/`).then((res) => {
			setEvents(events.filter((event) => event._id !== id));
			setEventStatus(res.status);
		});
	};

	// Delete confirmation modal
	const modals = useModals();
	const confirmDelete = (id) =>
		modals.openConfirmModal({
			title: "Delete Event",
			centered: true,
			children: (
				<Text size="sm">
					Are you sure you want to delete this event? This action is destructive and cannot be undone.
				</Text>
			),
			labels: { confirm: "Delete event", cancel: "No don't delete it" },
			confirmProps: { color: "red" },
			onCancel: () => {
				let x = 5;
			},
			// onCancel: () => console.log("Cancel"),
			onConfirm: () => deleteEvent(id),
		});

	return (
		<EventContext.Provider
			value={{
				eventStatus,
				setEventStatus,
				setReactStatus,
				reactStatus,
				setEvents,
				events,
				confirmDelete,
				updateEvent,
				addEvent,
				RSVW,
				form,
				schema,
			}}
		>
			{children}
		</EventContext.Provider>
	);
}

export default EventContext;
