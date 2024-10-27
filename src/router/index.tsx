import { lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../utils";

const HomePage: LazyExoticComponent<any> = lazy(
    () => import("../components/house/HomePage")
);
const Detail: LazyExoticComponent<any> = lazy(
    () => import("../components/detail/Detail")
);
const Create: LazyExoticComponent<any> = lazy(
    () => import("../components/create/Create")
);

const People: LazyExoticComponent<any> = lazy(
    () => import("../components/people/People")
);

const Profile: LazyExoticComponent<any> = lazy(
    () => import("../components/profile/Profile")
);

const Settings: LazyExoticComponent<any> = lazy(
    () => import("../components/settings/Settings")
);

const PageNot: LazyExoticComponent<any> = lazy(
    () => import("../components/pageNot/pageNot")
);

const Layout: LazyExoticComponent<any> = lazy(
    () => import("../pages/layout/Layout")
);

const Auth: LazyExoticComponent<any> = lazy(() => import("../pages/Auths"));

const Login: LazyExoticComponent<any> = lazy(
    () => import("../components/login/Auth")
);

const Home: LazyExoticComponent<any> = lazy(() => import("../pages/home/Home"));

const Routers = () => {
    return useRoutes([
        {
            path: "/",
            element: (
                <Suspense>
                    <Layout />
                </Suspense>
            ),
            children: [
                {
                    path: "/auth/login",
                    element: (
                        <Suspense>
                            <Login />
                        </Suspense>
                    ),
                },
                {
                    path: "/",
                    element: (
                        <Suspense>
                            <Auth />
                        </Suspense>
                    ),
                    children: [
                        {
                            path: "",
                            element: (
                                <Suspense>
                                    <Home />
                                </Suspense>
                            ),
                            children: [
                                {
                                    path: "",
                                    element: (
                                        <Suspense>
                                            <HomePage />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/people",
                                    element: (
                                        <Suspense>
                                            <People />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/create",
                                    element: (
                                        <Suspense>
                                            <Create />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/settings",
                                    element: (
                                        <Suspense>
                                            <Settings />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/pageNot",
                                    element: (
                                        <Suspense>
                                            <PageNot />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/people",
                                    element: (
                                        <Suspense>
                                            <People />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/profile",
                                    element: (
                                        <Suspense>
                                            <Profile />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/users/:username",
                                    element: (
                                        <Suspense>
                                            <Detail />
                                        </Suspense>
                                    ),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);
};

export default Routers;
