import { useEffect } from 'react';
import {
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
    Alert,
    Spinner
} from "react-bootstrap";
import { useAppSelector } from "../../app/hooks"
import {
    selectSearchImage,
} from "./customerSlice"

import {
    useDelImageMutation,
    useLazyGetImagesQuery,
} from "../../app/api"
import type { CustomerModel, ImageModel } from "../../Types/Models"
function ViewImage({ customer }: { customer: CustomerModel }) {
    const searchImage = useAppSelector(selectSearchImage)
    const [delImage, { isLoading: isDeleting }] = useDelImageMutation()
    const [triggerImages, { data: imagesData, isFetching: isFetchingImages, error: imagesError }] = useLazyGetImagesQuery();

    useEffect(() => {
        triggerImages(customer.id)
    }, [])

    useEffect(() => {
        if (searchImage) {
            triggerImages(customer.id)
        }        
    }, [searchImage])

    const _delImage = (imageId:number) => {
        delImage({ id: customer.id, imageId })
            .unwrap()
            .then(payload => {
                if (payload.hasError) {
                    return
                }
                triggerImages(customer.id)
            })
    }

    return (
        <>
            {isFetchingImages ? (
                <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : imagesData?.value?.length === 0 ? (
                <Alert variant="light" className="text-center">
                    No images uploaded yet.
                </Alert>
            ) : (
                <Row xs={2} md={3} lg={4}>
                    {imagesData?.value.map((img: ImageModel, index: number) => (
                        <Col key={index} className="mb-4">
                            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 6px rgba(0,0,0,0.1)' }}>
                                <img
                                    src={img.base64}
                                    alt={img.fileName}
                                    className="img-fluid"
                                    style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                                />
                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                    <button
                                        type="button"
                                        onClick={() => _delImage(img.id)}
                                        disabled={isDeleting}
                                        style={{
                                            position: 'absolute',
                                            top: '6px',
                                            right: '6px',
                                            background: '#fff',
                                            color: '#dc3545',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '28px',
                                            height: '28px',
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
        </>
    )
}

export default ViewImage;