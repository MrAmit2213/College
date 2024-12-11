import React from 'react'
import { Button, Card } from 'react-bootstrap'
import '../css/landingPage.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='container landingPageBody'>
                <div className='adjustPage' >
                    <Card className='collegeCard' onClick={()=>{navigate('/kodemaHome')}}>
                        <h4 className='text-center border-primary border-bottom cardTitle'>Basukala Private Industrial Training Institute(ITI) - Koderma, Jharkhand</h4>
                        <Card.Body className='collegeDetails'>
                            <Card.Img className='imm h-6' variant="top" src="./images/logoKoderma.png" />
                            <Button variant='success' className='linkButton'>Visit Website</Button>
                        </Card.Body>
                    </Card>
                    <Card className='collegeCard' onClick={()=>{navigate('/khagaHome')}}>
                        <h4 className='text-center border-primary border-bottom cardTitle'>Basukala Private Industrial Training Institute(ITI) - Khaga, Fatehpur</h4>
                        <Card.Body className='collegeDetails'>
                            <Card.Img className='imm' variant="top" src="./images/logoKhagha.png" />
                            <Button variant='success' className='linkButton'>Visit Website</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default LandingPage
