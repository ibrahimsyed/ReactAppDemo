import { useRef, useState } from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
    OverlayTrigger,
    Stack,
    Tooltip,
    Alert
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
    hideImage,
    selectShowImageInput,
    selectCustomer,
    setSearchImage
} from "./customerSlice"

import {
    useAddImagesMutation
} from "../../app/api"
import type { ImageModel } from "../../Types/Models"

function InputCustomer() {
    const [message, setMessage] = useState("")
    const dispatch = useAppDispatch()
    const show = useAppSelector(selectShowImageInput)
    const customer = useAppSelector(selectCustomer)
    const [images, setImages] = useState<ImageModel[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [addImages, { isLoading: isAddingImage }] = useAddImagesMutation()

    const _handleAddFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
            fileInputRef.current.click()
        }
    }

    const _handleRemoveImage = (indexToRemove: number) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove))
    }

    const _handleFileChange = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prev) => [
                    ...prev,
                    {
                        fileName: `${file.name}`,
                        base64: `${reader.result}`,
                    },
                ]);
            };
            reader.readAsDataURL(file)
        }
    }

    const _addImages = () => {
        setMessage("")
        addImages({ id: customer.id, body: images },)
            .unwrap()
            .then(payload => {
                if (payload.hasError) {
                    setMessage(payload.errorDetail.errors[0].messages[0])
                    return
                }
                setImages([])
                dispatch(setSearchImage(true))
                dispatch(hideImage())
            })
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={_handleFileChange}
            />

            <Modal show={show} onHide={() => dispatch(hideImage())} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Customer Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="horizontal" gap={2} className="mb-3">
                        <Button variant="primary" onClick={_handleAddFileClick}>
                            <i className="bi bi-plus-lg"></i> Add Image
                        </Button>
                        <span className="text-muted">Supported formats: JPG, PNG</span>
                    </Stack>

                    <hr />

                    {message !== "" ? (
                        <>
                            <Alert variant="danger" className="text-center">
                                {message}
                            </Alert>
                        </>
                    ) : <></>}

                    {images.length === 0 ? (
                        <div className="text-center text-muted py-4">
                            No images uploaded yet.
                        </div>
                    ) : (
                        <Row xs={2} md={3} lg={4}>
                            {images.map((img: ImageModel, index) => (
                                <Col key={index} className="mb-3">
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={img.base64}
                                            alt={img.fileName}
                                            className="img-thumbnail"
                                            style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                                        />
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Remove</Tooltip>}
                                        >
                                            <button
                                                type="button"
                                                aria-label="Remove image"
                                                onClick={() => _handleRemoveImage(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    background: '#fff',
                                                    color: '#dc3545',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '24px',
                                                    height: '24px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(hideImage())}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={_addImages}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default InputCustomer;