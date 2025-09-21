import { useEffect } from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
    Container,
    Form,
    Stack,
    Spinner
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
    hideCustomerInput,
    selectShowCustomerInput,
    selectCustomer,
    setSearchCustomer
} from "./customerSlice"
import { useForm } from "react-hook-form"

import {
    useAddCustomerMutation,
    useUpdCustomerMutation,
} from "../../app/api"
import { showErrors } from "../../app/common"

function InputCustomer() {
    const dispatch = useAppDispatch()
    const show = useAppSelector(selectShowCustomerInput)
    const customer = useAppSelector(selectCustomer)

    const { register, getValues, setError, reset, setValue, clearErrors, formState: { errors } } = useForm()

    const [addCustomer, { isLoading: isAdding }] = useAddCustomerMutation()
    const [updCustomer, { isLoading: isUpdating }] = useUpdCustomerMutation()

    useEffect(() => {
        clearErrors()
        setValue('firstName', customer.firstName)
        setValue('lastName', customer.lastName)
    }, [customer])

    const _addCustomer = () => {
        addCustomer(getValues())
            .unwrap()
            .then(payload => {
                if (payload.hasError) {
                    showErrors(payload.errorDetail.errors, setError)
                    return
                }
                
                dispatch(setSearchCustomer(true))
                dispatch(hideCustomerInput())
            })
    }

    const _updCustomer = () => {
        updCustomer({ id: customer.id, body: getValues() },)
            .unwrap()
            .then(payload => {
                if (payload.hasError) {
                    showErrors(payload.errorDetail.errors, setError)
                    return
                }
                dispatch(setSearchCustomer(true))
                dispatch(hideCustomerInput())
            })
    }

  return (
      <>
          <Modal show={show} onHide={() => dispatch(hideCustomerInput())} centered>
              <Modal.Header closeButton>
                  <Modal.Title>{customer.id === 0 ? 'Add New Customer' : 'Edit Customer'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Container>
                      <Form.Group as={Row} className="mb-3" controlId="txtFirstName">
                          <Form.Label column sm={3}>First Name<span className="text-danger">*</span></Form.Label>
                          <Col sm={9}>
                              <Form.Control
                                  type="text"
                                  placeholder="Enter first name"
                                  {...register("firstName")}
                                  isInvalid={!!errors.firstName}
                                  autoFocus
                              />
                              <Form.Control.Feedback type="invalid">
                                  {`${errors.firstName?.message}`}
                              </Form.Control.Feedback>
                          </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3" controlId="txtLastName">
                          <Form.Label column sm={3}>Last Name<span className="text-danger">*</span></Form.Label>
                          <Col sm={9}>
                              <Form.Control
                                  type="text"
                                  placeholder="Enter last name"
                                  {...register("lastName")}
                                  isInvalid={!!errors.lastName}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {`${errors.lastName?.message}`}
                              </Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                  </Container>
              </Modal.Body>
              <Modal.Footer>
                  <Stack direction="horizontal" gap={2}>
                      <Button variant="secondary" onClick={() => dispatch(hideCustomerInput())}>
                          Close
                      </Button>
                      <Button
                          variant="primary"
                          onClick={customer.id === 0 ? _addCustomer : _updCustomer}
                          disabled={isAdding || isUpdating}
                      >
                          {(isAdding || isUpdating) ? (
                              <>
                                  <Spinner animation="border" size="sm" className="me-2" />
                                  Saving...
                              </>
                          ) : (
                              'Save'
                          )}
                      </Button>
                  </Stack>
              </Modal.Footer>
          </Modal>
      </>
  )
}

export default InputCustomer;