import { useShow, useMany } from "@refinedev/core";
import { Show, NumberField, EmailField } from "@refinedev/antd";
// import {} from "@sanity/client"

import { Space, Tag, Typography, Modal, Button } from "antd";
import { ISeaWorkers } from "../../interfaces";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const { Title, Text } = Typography;

export const PostShow = () => {
	const { queryResult } = useShow<ISeaWorkers>({
		meta: {
			fields: ["...", `"certificates": certificates[].asset->url`],
		},
	});
	const { data, isLoading } = queryResult;
	const record = data?.data;
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [pdfOpen, setPdfOpen] = useState<boolean>(false);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}
	// const categoryIds = record?.categories?.map((category) => category._ref) || [];
	// const { data: dataCategories } = useMany<ICategory>({
	// 	resource: "category",
	// 	ids: categoryIds,
	// });

	return (
		<Show isLoading={isLoading}>
			<Title level={5}>Name</Title>
			<Text>{record?.fullName}</Text>

			<Title level={5}>Age</Title>
			<Text>{record?.age}</Text>

			<Title level={5}>Phone Number</Title>
			<Text>{record?.phoneNumber!} </Text>

			<Title level={5}>Status</Title>
			<Text>{record?.status}</Text>

			<Title level={5}>Department</Title>
			<Text>{record?.deparment!}</Text>
			{record?.certificates && (
				<>
					<Title level={5}>Certificates</Title>
					{record.certificates.map((cert, i) => {
						if (cert.includes("pdf")) {
							console.log(cert);
							return (
								<>
									<Button
										onClick={() => {
											setPdfOpen(true);
										}}
									>
										Show Pdf Certificate
									</Button>
									<Modal
										open={pdfOpen}
										width={"900px"}
										style={
											{
												// width: "800px",
											}
										}
										onOk={() => {
											setPdfOpen(false);
										}}
										cancelButtonProps={{ style: { display: "none" } }}
										styles={{
											body: {
												width: "600px",
												maxHeight: "800px",
											},
										}}
										onClose={() => {
											setPdfOpen(false);
										}}
										onCancel={() => {
											setPdfOpen(false);
										}}
									>
										<Document file={cert} onLoadSuccess={onDocumentLoadSuccess}>
											<Page height={450} scale={1.5} pageNumber={pageNumber} />
										</Document>
									</Modal>
								</>
							);
						}
						return <img src={cert} key={i} />;
					})}
				</>
			)}

			{/* <Title level={5}>Categories</Title> */}
			{/* <Space>
				{dataCategories?.data?.map((category) => (
					<Tag key={category._id}>{category.title}</Tag>
				))}
			</Space> */}
		</Show>
	);
};
