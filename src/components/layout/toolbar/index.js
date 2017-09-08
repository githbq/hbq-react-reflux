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

const ToolBar = React.createClass({
    render() {
        return (
            <div className="csc-home">
                <Row>
                    <Col span={2}><Icon type="bars" className="csc-icon"/></Col>
                    <Col span={4}>纷享客服</Col>
                    <Col span={12}>
                        <SearchInput placeholder="搜索会话、工单、客户" onSearch={value => console.log(value)} style={{
                            width: 200
                        }}/></Col>
                      <Col span={3}>
                        <Icon type="appstore" className="csc-icon"/>
                        <Icon type="frown" className="csc-icon csc-status-busy"/>
                        <Icon type="phone" className="csc-icon csc-status-idle"/>
                      </Col>
                      <Col>
                        <Dropdown overlay={UserMeun}>
                            <a className="ant-dropdown-link" href="#" className="csc-right-icon">
                                张三
                                <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        );
    }
});

export default ToolBar;