import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './main.css';

// TODO: Move redirection logic to main component container when created
function isRedirectionNecessary() {
    if(window && window.URLSearchParams) {
        const qs = new URLSearchParams(window.location.search);
        if(qs && qs.get('confirm') === 'true') {
            return "/verified";
        }
        if(qs && qs.get('notFound') === 'true') {
            return "/404";
        }
        if(qs && qs.get('unsubscribed') === 'true') {
            return "/unsubscribe";
        }
    }
    return undefined;
}
class Main extends React.Component {
    render() {
        let redirect = isRedirectionNecessary();
        return (
            <div className="main">
                {redirect && <Redirect to={redirect} />}
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
                        
                        <Link to={"/start"}>
                            <button className="main__start">
                                Find great movies!
                            </button>
                        </Link>
                        {/* <Link to={"/login"}>
                            <button className="main__login">
                                Login
                            </button>
                        </Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;