import { Refine } from "@refinedev/core";
import {
	useNotificationProvider,
	ThemedLayoutV2,
	ErrorComponent,
	RefineThemes,
} from "@refinedev/antd";
import { createClient } from "@sanity/client";
import dataProvider from "refine-sanity";
import routerProvider, {
	NavigateToResource,
	UnsavedChangesNotifier,
	DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

const client = createClient({
	token:
		"skSoXqZTXO5KvefZt7KpmaESwcAhORnGotGWbAxeK2ORvJOTwdRfd31pBmrKD4dN1BfcflB959WoHReBMjtZxm5vaUcx0It0CMBTYmpUCQ4PJ8REmN7EBY7PbgQrs2ohqvu4YD9okU7ACogjqNX0zHGpN4UucsDzdLSO9nRVF4tysMjIxjah",
	projectId: "ug1aphv4",
	dataset: "production",
	perspective: "published",
	useCdn: false,
	apiVersion: "2021-10-21",
});

const App: React.FC = () => {
	return (
		// <DevtoolsProvider>
		<BrowserRouter>
			<ConfigProvider theme={RefineThemes.Blue}>
				<AntdApp>
					<Refine
						routerProvider={routerProvider}
						dataProvider={dataProvider(client)}
						resources={[
							{
								name: "seaWorkers",
								list: "/seaWorkers",
								show: "/seaWorkers/show/:id",
								create: "/seaWorkers/create",
								edit: "/seaWorkers/edit/:id",
								meta: {
									canDelete: false,
									label: "Seafearers",
								},
							},
							// {
							// 	name: "category",
							// 	list: "/category",
							// 	create: "/category/create",
							// 	edit: "/category/edit/:id",
							// 	meta: {
							// 		canDelete: true,
							// 	},
							// },
						]}
						notificationProvider={useNotificationProvider}
						options={{
							title: {
								text: "Seafearers Union",
							},
							liveMode: "auto",
							syncWithLocation: true,
							warnWhenUnsavedChanges: true,
						}}
					>
						<Routes>
							<Route
								element={
									<ThemedLayoutV2>
										<Outlet />
									</ThemedLayoutV2>
								}
							>
								<Route index element={<NavigateToResource />} />

								<Route path="/seaWorkers">
									<Route index element={<PostList />} />
									<Route path="create" element={<PostCreate />} />
									<Route path="edit/:id" element={<PostEdit />} />
									<Route path="show/:id" element={<PostShow />} />
								</Route>

								<Route path="*" element={<ErrorComponent />} />
							</Route>
						</Routes>
						<UnsavedChangesNotifier />
						<DocumentTitleHandler />
					</Refine>
				</AntdApp>
			</ConfigProvider>
			{/* <DevtoolsPanel /> */}
		</BrowserRouter>
		// {/* </DevtoolsProvider> */}
	);
};

export default App;
