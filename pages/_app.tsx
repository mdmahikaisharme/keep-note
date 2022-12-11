import type { AppProps } from "next/app";
import { Router } from "next/router";
import nProgress from "nprogress";
import { AppContextProvider } from "@context/App";
import "@style/tailwind.css";
import "@style/app.scss";
import "@style/nprogress.css";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppContextProvider>
			<Component {...pageProps} />
		</AppContextProvider>
	);
}
