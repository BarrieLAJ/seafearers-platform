import { getDefaultFilter } from "@refinedev/core";

import {
	List,
	TextField,
	EditButton,
	ShowButton,
	FilterDropdown,
	useTable,
	DeleteButton,
	TagField,
	useSelect,
	getDefaultSortOrder,
	EmailField,
	NumberField,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ISeaWorkers } from "../../interfaces";

export const PostList = () => {
	const { tableProps, filters, sorters } = useTable<ISeaWorkers>({
		syncWithLocation: true,
		sorters: {
			initial: [
				{
					field: "_createdAt",
					order: "desc",
				},
			],
		},
		filters: {
			initial: [
				{
					field: "fullName",
					operator: "contains",
					value: null,
				},
			],
		},
	});

	return (
		<List canCreate={false}>
			<Table
				{...tableProps}
				loading={tableProps.loading}
				pagination={{
					defaultPageSize: 50,
				}}
				rowKey="_id"
			>
				<Table.Column
					dataIndex="fullName"
					title="Name"
					filterIcon={<SearchOutlined />}
					defaultFilteredValue={getDefaultFilter("fullName", filters, "contains")}
					filterDropdown={(props) => (
						<FilterDropdown {...props}>
							<Input placeholder="Search in title" />
						</FilterDropdown>
					)}
				/>
				<Table.Column
					dataIndex="phoneNumber"
					title="Phone Number"
					render={(value) => {
						return <TextField value={value} />;
					}}
				/>
				<Table.Column
					dataIndex="age"
					title="Age"
					render={(value) => {
						return <TextField value={value} />;
					}}
				/>
				<Table.Column
					dataIndex="deparment"
					title="Deparment"
					render={(value) => {
						return <TextField value={value} />;
					}}
				/>
				<Table.Column
					dataIndex="status"
					title="Status"
					render={(value) => {
						return <TextField value={value} />;
					}}
				/>
				<Table.Column
					dataIndex="_updatedAt"
					title="Updated At"
					render={(value: string) => {
						const date = new Date(value);
						return <TextField value={date.toLocaleString()} />;
					}}
					sorter
					defaultSortOrder={getDefaultSortOrder("_updatedAt", sorters)}
				/>
				<Table.Column
					title="Actions"
					dataIndex="_id"
					render={(value) => {
						return (
							<Space>
								<EditButton hideText size="small" recordItemId={value} />
								<ShowButton hideText size="small" recordItemId={value} />
								{/* <DeleteButton hideText size="small" recordItemId={value} /> */}
							</Space>
						);
					}}
				/>
			</Table>
		</List>
	);
};
