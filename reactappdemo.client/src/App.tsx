import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link, NavLink } from "react-router"
import {
    Container,
    Nav,
    NavItem,
    Collapse,
    Dropdown,
    Row,
    Col,
    Stack,
    Navbar
} from "react-bootstrap";
import './App.css';

const Login = lazy(() => import("./features/login"))
const Customer = lazy(() => import("./features/customer"))
const Dashboard = lazy(() => import("./features/dashboard"))

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<>...</>}>
                <Navbar fixed="top" expand="lg" className="bg-dark">
                    <Container fluid>
                        <Navbar.Brand href="#home" className="text-white">Demo</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container fluid>
                    <Row className="flex-nowrap main">
                        <Col className="col-auto px-0 bg-dark overflow-auto border-end">
                            <Stack className="align-items-start text-white">
                                <Nav className="flex-column mb-auto mb-0 align-items-start w-100">
                                    <Nav.Item className="w-100 nav-item">
                                        <Nav.Link
                                            as={NavLink}
                                            to="/"
                                            className="align-middle px-3 text-light" end
                                        >
                                            <i className="bi bi-house-door"></i>
                                            <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="w-100 nav-item">
                                        <Nav.Link
                                            as={NavLink}
                                            to="/customer"
                                            className="align-middle px-3 text-light"
                                        >
                                            <i className="bi bi-person-square"></i>
                                            <span className="ms-1 d-none d-sm-inline">Customer</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Stack>
                        </Col>
                        <Col className="col py-3 overflow-auto">
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </Suspense >
        ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "customer",
                element: <Customer />,
            },
        ],
        errorElement: <>OPPPP</>,
    },
    {
        path: "login",
        element: (
            <Suspense fallback={<>...</>}>
                <Login />
            </Suspense>
        ),
    },
])

const App = () => {
    return <RouterProvider router={router} />
}


export default App;