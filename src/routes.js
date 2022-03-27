import { ToyApp } from "./pages/ToyApp.jsx"
import { About } from "./pages/About.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { LoginSignup } from "./pages/LoginSignup.jsx"

export default [
    {
        path: "/",
        component: ToyApp,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/:toyId",
        component: ToyDetails,
    },
    {
        path: "/edit",
        component: ToyEdit,
    },
    {
        path: "/login",
        component: LoginSignup
    }
]