import { useEffect, useState, Suspense, lazy } from 'react';
import {
    Card,
    Row,
    Col,
    Stack,
    Button,
    OverlayTrigger,
    Tooltip,
    Container,
    Spinner
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
    showImage,
    showCustomerInput,
    setCustomer,
    selectSearchCustomer,
    setSearchCustomer,
    setSearchImage
} from "./customerSlice"

import InputImage from "./inputImage"
import InputCustomer from "./inputCustomer"
import ViewImage from "./viewImage"
import type { CustomerModel } from "../../Types/Models"

import {
    useLazyGetCustomersQuery,
    useDelCustomerMutation,
} from "../../app/api"

export const Customer = () => {
    const dispatch = useAppDispatch()
    const searchCustomer = useAppSelector(selectSearchCustomer)
    const [triggerCustomers, { data: customersData, isFetching: isFetchingCustomers, error: customersError }] = useLazyGetCustomersQuery();
    const [delCustomer, { isLoading: isDeleting }] = useDelCustomerMutation()
    useEffect(() => {
        triggerCustomers("", false)
    }, [])

    useEffect(() => {
        if (searchCustomer) {
            triggerCustomers("", false)
        }        
    }, [searchCustomer])

    const _delCustomer = (id:number) => {
        delCustomer(id)
            .unwrap()
            .then(payload => {
                if (payload.hasError) {
                    return
                }
                triggerCustomers("", false)
            })
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold">Customer Management</h3>
                <Button variant="primary" onClick={() => {
                    dispatch(setSearchCustomer(false))
                    dispatch(showCustomerInput())
                    dispatch(setCustomer({ id: 0, firstName: "", lastName: "" }))
                }}>
                    <i className="bi bi-plus-lg"></i> Add Customer
                </Button>
            </div>

            <hr />

            {isFetchingCustomers ? (
                <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row className="h-100">
                    {customersData?.value.length ? (
                            customersData.value.map((customer: CustomerModel, index: number) => (
                            <Col md={6} lg={4} key={index} className="mb-4">
                                <Card className="shadow-sm rounded h-100">
                                    <Card.Body>
                                        <Card.Title className="mb-2">
                                            {customer.firstName} {customer.lastName}
                                        </Card.Title>

                                        <Stack direction="horizontal" gap={2}>

                                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                                <Button variant="outline-secondary" size="sm" onClick={() => {
                                                    dispatch(setSearchCustomer(false))
                                                    dispatch(showCustomerInput())
                                                    dispatch(setCustomer({
                                                        id: customer.id,
                                                        firstName: customer.firstName,
                                                        lastName: customer.lastName
                                                    }))
                                                }}>
                                                    <i className="bi bi-pencil"></i>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                                <Button variant="outline-danger" size="sm" onClick={() => _delCustomer(customer.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="top" overlay={<Tooltip>Add images</Tooltip>}>
                                                <Button variant="outline-secondary" size="sm" onClick={() => {
                                                    dispatch(setCustomer({
                                                        id: customer.id,
                                                        firstName: customer.firstName,
                                                        lastName: customer.lastName
                                                    }))
                                                    dispatch(setSearchImage(false))
                                                    dispatch(showImage())
                                                }}>
                                                    <i className="bi bi-plus-lg"></i> Add Images
                                                </Button>
                                            </OverlayTrigger>
                                        </Stack>

                                        <hr />
                                        <ViewImage customer={customer} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <div className="text-muted text-center py-5">
                                <p>No customers found. Click "Add Customer" to get started!</p>
                            </div>
                        </Col>
                    )}
                </Row>
            )}
            <InputImage></InputImage>
            <InputCustomer></InputCustomer>
        </Container>
    )
}

export default Customer;