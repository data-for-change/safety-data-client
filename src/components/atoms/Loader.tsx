import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import '../../styles/loader.css'
const Loader: React.FC<any> = () => <div className="loader-con"> <Spinner animation="border" variant="info" /></div>

export default Loader
