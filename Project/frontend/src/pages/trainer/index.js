import React from "react";

// Page components
import TrainerList from "./TrainerCard";
import AddTrainer from "./AddTrainer";
import ReactCard from "./ReactCard";

// SampleProvider
import { TrainerProvider } from "../../contexts/TrainerContext";

const Trainers = () => {
	return (
		<>
			<h1>Trainer Page</h1>
			<div
				style={{
					display: "table",
					borderCollapse: "separate",
					borderSpacing: "50px",
				}}
			>
				<TrainerProvider>
					{/* Trainer list */}
					<TrainerList />
					<br />
					{/* Add new Trainer */}
					<AddTrainer />
					<ReactCard />
				</TrainerProvider>
			</div>
		</>
	);
};

export default Trainers;
