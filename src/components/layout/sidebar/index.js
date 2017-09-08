import React from 'react';
import {Row, Col} from 'global/layout';
import Icon from 'global/icon';
import Menu from 'global/menu';
import Dropdown from 'global/dropdown';
import Button from 'global/button';
import Input from 'global/input';
import classNames from 'classNames';
import SearchInput from 'components/searchinput';
import UserMeun from 'components/usermenu';

require('./index.less');

const Sidebar = (props) => {
    return (
        <div className="csc-home">
            <Row className="csc-center">
                <Col span={2} className="csc-sider-bar">
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    概览
                    <br/>
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    会话
                    <br/>
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    电话
                    <br/>
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    工单
                    <br/>
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    客户
                    <br/>
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    报表
                    <br/>
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    监控
                    <br/>
                    <Icon type="appstore" className="csc-icon"/>
                    <br/>
                    设置
                    <br/>
                </Col>
            </Row>
        </div>
    );
};

export default Sidebar;