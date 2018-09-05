import React from 'react';

class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <div className="main__left">
                    <div className="main__description">
                        <div className="main__title">
                            Find out how to make good movies yours more quickly
                        </div>
                        <div className="main__blurb">
                            Availacinema notifies you when movies that measure up
                            to your standards are available to purchase.
                        </div>
                    </div>
                </div>
                <div className="main__right">
                    <div className="main__cta">
                        
                        <button className="main__start">
                            Find great movies!
                        </button>
                        <button className="main__login">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;