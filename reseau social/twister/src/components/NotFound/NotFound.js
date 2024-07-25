import React from 'react';
import Header from '../Header'
import "./notfound.css"

function NotFound(props) {
    const user = props.user
    return (
        <div className='SectionMain' style={{ overflow: 'auto' }}>
            <section className='header'>
                <Header user={user} />
            </section>
            <section className='corpschild'>
                <div className="left-pane">
                </div>
                <div className="main-pane1">
                    <div className='not_found'>
                        <h1 className='h1sup'>Page Inexistante</h1>
                    </div>
                </div>
                <div className="right-pane">
                </div>
            </section >
        </div >
    )
}

export default NotFound;