import React from 'react';
import {Row, Col} from 'global/layout';
import Icon from 'global/icon';
import Menu from 'global/menu';
import Dropdown from 'global/dropdown';
import Button from 'global/button';
import Input from 'global/input';
import classNames from 'classNames';

require('./index.less');

const InputGroup = Input.Group;

const SearchInput = React.createClass({
    getInitialState() {
        return {value: '', focus: false};
    },
    handleInputChange(e) {
        this.setState({value: e.target.value});
    },
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement
        });
    },
    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }
    },
    render() {
        const {style, size, placeholder} = this.props;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        });
        const searchCls = classNames({'ant-search-input': true, 'ant-search-input-focus': this.state.focus});
        return (
            <div className="ant-search-input-wrapper" style={style}>
                <div className="ant-input-group-wrap">
                    <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch}/>

                    <InputGroup className={searchCls}>
                        <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange} onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}/>
                    </InputGroup>
                </div>
            </div>
        );
    }
});

export default SearchInput;