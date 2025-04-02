import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
export default function AuthLayout({ children }: Readonly<Props>) {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			asdfasdfasdf
			<div className="w-full max-w-sm">{children}</div>
		</div>
	);
}
