import { useShow, useMany } from "@refinedev/core";
import { Show, NumberField, EmailField } from "@refinedev/antd";

import { Space, Tag, Typography } from "antd";
import { ISeaWorkers } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
	const { queryResult } = useShow<ISeaWorkers>();
	const { data, isLoading } = queryResult;
	const record = data?.data;

	// const categoryIds = record?.categories?.map((category) => category._ref) || [];
	// const { data: dataCategories } = useMany<ICategory>({
	// 	resource: "category",
	// 	ids: categoryIds,
	// });

	return (
		<Show isLoading={isLoading}>
			<Title level={5}>Id</Title>
			<Text>{record?._id}</Text>

			<Title level={5}>Title</Title>
			<Text>{record?.fullName}</Text>

			<Title level={5}>Age</Title>
			<Text>{record?.age}</Text>

			<Title level={5}>Phone Number</Title>
			<EmailField value={+record?.phoneNumber!} />

			{/* <Title level={5}>Categories</Title> */}
			{/* <Space>
				{dataCategories?.data?.map((category) => (
					<Tag key={category._id}>{category.title}</Tag>
				))}
			</Space> */}
		</Show>
	);
};
