import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <ToastContainer />
        </>
    )
}