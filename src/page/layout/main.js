import React from 'react';
import {ToolBar, SideBar} from 'components/layout';

require('./main.less');

const Main = (props) => {
    return (
        <div>
            <ToolBar></ToolBar>
            <div className="csc-content">
                <div className="csc-content-sidebar">
                    <SideBar></SideBar>
                </div>
                <div className="csc-content-body">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Main;
