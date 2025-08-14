/**
 * @file RateLimitedUI.tsx
 * @brief This component displays a user-friendly interface when the API rate limit is exceeded.
 * @details It informs the user about the situation and guides them on how to proceed, improving the user experience during a rate-limited event.
 * @author Sergio Jiménez de la Cruz
 * @date August 14, 2025
 * @version 1.0.1
 * @license MIT
 */

import type { JSX } from "react";
import type { RateLimitedUIProps } from "../types";
import { ZapIcon } from "lucide-react";

/**
 * @brief The component to be displayed when the rate limit is exceeded.
 * @details This component provides a clear visual and textual warning to the user.
 * The messages are customizable via props for greater flexibility.
 * @param {RateLimitedUIProps} props - The props object with customizable text content.
 * @returns {JSX.Element} The rendered UI component for rate-limiting.
 */
const RateLimitedUI = ({
	title = "Rate Limit Reached",
	message = "You've made too many requests in a short period. Please wait a moment.",
	callToAction = "Try again in a few seconds for the best experience.",
}: RateLimitedUIProps): JSX.Element => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<div className="bg-primary/10 border border-primary/30 rounded-lg shadow-sm">
				<div className="flex flex-col md:flex-row items-center p-6">
					<div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
						<ZapIcon className="size-10 text-primary" />
					</div>
					<div className="flex-1 text-center md:text-left">
						<h3 className="text-xl font-bold mb-2">{title}</h3>
						<p className="text-base-content mb-1">{message}</p>
						<p className="text-sm text-base-content">{callToAction}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RateLimitedUI;