import React, { useContext } from "react";

import TrainerContext from "../../contexts/TrainerContext";

import { Card, Image, Text, Badge, Button, Group, useMantineTheme, ScrollArea, Select } from "@mantine/core";

const ReactCard = () => {
	const { trainers, confirmDelete } = useContext(TrainerContext);

	const theme = useMantineTheme();
	const secondaryColor = theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

	return (
		<>
			<h1>View evets by Members</h1>
			<div style={{ border: "2px solid #ccc", borderRadius: "20px", width: "100%", padding: "50px 0px 50px 0px" }}>
				<Group position="center" spacing={50}>
					{trainers.map((item) => (
						<div key={item._id}>
							<Card shadow="lg" radius="lg" p="md" withBorder style={{ width: "300px" }}>
								<Card.Section>
									<Image
										src="https://media.istockphoto.com/photos/cat-bodybuilder-with-dumbbells-picture-id1131760920?k=20&m=1131760920&s=612x612&w=0&h=5jEgzdmLx4HpFy_4Df_BBs0SsxXDdnby5NjsDpHxceY="
										height={160}
										alt="Norway"
									/>
								</Card.Section>

								<Group position="apart" style={{ marginTop: "4px" }}>
									<Text weight={500} style={{ fontSize: "18px" }}>
										{item.title}
									</Text>
									<Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
										{item.tags.map((tag) => (
											<Badge size="xs" key={tag} variant="outline" color="primary" mr={2}>
												{tag}
											</Badge>
										))}
									</Text>
								</Group>
								<Group position="left" style={{ marginTop: "9px" }}>
									<Text weight={400} style={{ fontSize: "15px", marginRight: "40px" }}>
										Date:
									</Text>
									<Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
										{new Date(item.date).toString().slice(0, 15)}
									</Text>
								</Group>
								<Group position="left" style={{ marginTop: "4px" }}>
									<Text weight={400} style={{ fontSize: "15px", marginRight: "40px" }}>
										Time:
									</Text>
									<Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
										{new Date(item.date).toString().slice(16, 21)}
									</Text>
								</Group>
								<Group position="left" style={{ marginTop: "4px" }}>
									<Text weight={400} style={{ fontSize: "15px", marginRight: "25px" }}>
										Details:
									</Text>
									<Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
										{item.details}
									</Text>
								</Group>
								<Group position="left" style={{ marginTop: "4px" }}>
									<Text weight={400} style={{ fontSize: "15px", marginRight: "15px" }}>
										Can Join:
									</Text>
									<Text align="center" size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
										{item.gender}
									</Text>
								</Group>

								<ScrollArea style={{ height: 100, marginTop: "10px" }} scrollbarSize={3} scrollHideDelay={100}>
									<Text size="sm" style={{ margin: "-50px -40px 0px -40px", color: secondaryColor, lineHeight: 1.5 }}>
										{item.description}
									</Text>
								</ScrollArea>
								<Group spacing={"10px"} position="center" style={{ marginTop: "20px" }}>
									<Select
										style={{ width: "140px", border: "2px solid #afa", borderRadius: "5px" }}
										// label="Your "
										placeholder="Pick one"
										data={[
											{ value: "react", label: "Yanawa" },
											{ value: "ng", label: "Yanne Na" },
											{ value: "svelte", label: "Yannath One" },
											{ value: "vue", label: "Wedak Na" },
										]}
									/>
									<Button
										style={{ marginTop: "0px" }}
										size="lg"
										onClick={() => confirmDelete(item._id)}
										compact
										variant="light"
										color="grape"
									>
										Update
									</Button>
								</Group>
							</Card>
						</div>
					))}
				</Group>
			</div>
		</>
	);
};

export default ReactCard;
