import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";
import { ICategory, ISeaWorkers } from "../../interfaces";

export const PostEdit = () => {
	const { formProps, saveButtonProps, formLoading } = useForm<ISeaWorkers>();

	return (
		<Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
			<Form {...formProps} layout="vertical">
				<Form.Item
					label="Name"
					name="fullName"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Phone Number"
					name={"phoneNumber"}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Age"
					name={"age"}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Status"
					name={"status"}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Department"
					name={"deparment"}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Edit>
	);
};
