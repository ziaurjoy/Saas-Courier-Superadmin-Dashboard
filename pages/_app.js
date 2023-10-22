import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'antd/dist/reset.css';
import '../public/css/bundle.css';
import '../styles/style.scss';

import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider as ReduxProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { wrapper, store } from '../redux/store';
import DashboardLayout from '../components/common/layouts/DashboardLayout';
// import DashboardLayout from '../components/common/layouts/DashboardLayout';

Router.events.on('routeChangeStart', (url) => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
	const Layout = Component.Layout || DashboardLayout;
	const [queryClient] = React.useState(() => new QueryClient());
	return (
		<>
			<ReduxProvider store={store}>
				<CookiesProvider>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</Hydrate>

						<ReactQueryDevtools />
					</QueryClientProvider>
				</CookiesProvider>
			</ReduxProvider>
		</>
	);
};

export default wrapper.withRedux(MyApp);
