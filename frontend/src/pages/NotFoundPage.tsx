/**
 * @file NotFoundPage.tsx
 * @brief This component serves as the page for handling 404 "Not Found" errors.
 * @details It renders a dedicated component (`Page404`) to provide a user-frienly interface for paths that do not match any defined routes.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025
 * @version 1.0.1
 * @license MIT
 */

import type { JSX } from "react";
import Page404 from "../components/Page404";

/**
 * @brief The page component displayed for 404 errors.
 * @details This component acts as wrapper for the `Page404` UI component, ensuring that application handles non-existent routes gracefully.
 * @returns {JSX.Element} The rendered 404 error page.
 */
const NotFoundPage = (): JSX.Element => {
	return <Page404 />;
};

export default NotFoundPage;